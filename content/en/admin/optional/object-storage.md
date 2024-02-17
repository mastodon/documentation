---
title: Object storage
description: Serving user-uploaded files in Mastodon using external object storage
menu:
  docs:
    weight: 15
    parent: admin-optional
---

User-uploaded files can be stored on the main server's file system, or using an external object storage server, which can be required for scaling.

## Using the filesystem {#FS}

The simplest way to store user uploads is by using the server's file system. This is how it works by default and is suitable for small servers.

By default, Mastodon will store file uploads under `public/system` in its installation directory, but that can be overridden using the `PAPERCLIP_ROOT_PATH` environment variable.

By default, the files are served at `https://your-domain/system`, which can be overridden using `PAPERCLIP_ROOT_URL` and `CDN_HOST`.

{{< hint style="info" >}}
While using the server's file system is perfectly serviceable for small servers, using external object storage is more scalable.
{{</ hint >}}

{{< hint style="danger" >}}
The web server must be configured to serve those files but not allow listing them (that is, `https://your-domain/system/` should not return a file list). This should be the case if you use the configuration files distributed with Mastodon, but it is worth double-checking.
{{</ hint >}}

## S3-compatible object storage backends {#S3}

Mastodon can use S3-compatible object storage backends. ACL support is recommended as it allows Mastodon to quickly make the content of temporarily suspended users unavailable, or marginally improve the security of private data.

On Mastodon's end, you need to configure the following environment variables:
- `S3_ENABLED=true`
- `S3_BUCKET=mastodata` (replacing `mastodata` with the name of your bucket)
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` need to be set to your credentials
- `S3_ALIAS_HOST` is optional but highly recommended in order to set up a caching proxy and not lock you to a specific provider
- `S3_REGION`
- `S3_HOSTNAME` (optional if you use Amazon AWS)
- `S3_PERMISSION` (optional, if you use a provider that does not support ACLs or want to use custom ACLs)
- `S3_FORCE_SINGLE_REQUEST=true` (optional, if you run into trouble processing large files)

{{< page-ref page="admin/optional/object-storage-proxy.md" >}}

{{< hint style="info" >}}
You must serve the files with CORS headers, otherwise some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

{{< hint style="danger" >}}
Regardless of the ACL configuration, your S3 bucket must be set up to ensure that all objects are publicly readable but not writable or listable. At the same time, Mastodon itself should have write access to the bucket. This configuration is generally consistent across all S3 providers, and common ones are highlighted below.
{{</ hint >}}

### MinIO

MinIO is an open-source implementation of an S3 object provider. This section does not cover how to install it, but how to configure a bucket for use in Mastodon.

You need to set a policy for anonymous access that allows read-only access to objects contained by the bucket without allowing listing them.

To do this, you need to set a custom policy (replace `mastodata` with the actual name of your S3 bucket):
```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": {
           "AWS": "*"
         },
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::mastodata/*"
      }
   ]
}
```

Mastodon itself needs to be able to write to the bucket, so either use your admin MinIO account (discouraged) or an account specific to Mastodon (recommended) with the following policy attached (replace `mastodata` with the actual name of your S3 bucket):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::mastodata/*"
        }
    ]
}
```

You can set those policies from the MinIO Console (web-based user interface) or the command-line client (`mcli` / `mc`).

#### Using the MinIO Console

Connect to the MinIO Console web interface and create a new bucket (or navigate to your existing bucket):
![](/assets/object-storage/minio-bucket.png)

Then, configure the “Access Policy” to a custom one that allows read access (`s3:GetObject`) without write access or the ability to list objects (see above):
![](/assets/object-storage/minio-access-policy.png)

{{< hint style="info" >}}
If the MinIO Console does not allow you to set a “Custom” policy, you will likely need to update MinIO. If you are using MinIO in *standalone* or *filesystem* mode, [`RELEASE.2022-10-24T18-35-07Z`](https://github.com/minio/minio/releases/tag/RELEASE.2022-10-24T18-35-07Z) should be a safe version to update to that does not require [an involved migration procedure](https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#migrate-from-gateway-or-filesystem-mode).
{{< /hint >}}

Create a new `mastodon-readwrite` policy (see above):
![](/assets/object-storage/minio-mastodon-readwrite.png)

Finally, create a new `mastodon` user with the `mastodon-readwrite` policy:
![](/assets/object-storage/minio-mastodon-user.png)

#### Using the command-line utility

The same can be achieved using the [MinIO Client](https://min.io/docs/minio/linux/reference/minio-mc.html) command-line utility (which can be called `mc` or `mcli` depending on where it is installed from).

Create a new bucket:
`mc mb myminio/mastodata`

Save the anonymous access policy from above as `anonymous-readonly-policy.json` and the Mastodon user access policy as `mastodon-readwrite.json` (make sure to replace `mastodata` with the name of your newly-created bucket).

Set the anonymous access policy for your bucket:
`mc anonymous set-json anonymous-readonly-policy.json myminio/mastodata`

Add a `mastodon-readwrite` policy:
`mc admin policy add myminio mastodon-readwrite mastodon-readwrite.json`

Add the `mastodon` user (replace the password):
`mc admin user add myminio mastodon SECRET_PASSWORD`

Apply the `mastodon-readwrite` policy to the `mastodon` user:
`mc admin policy set myminio mastodon-readwrite user=mastodon`

### Wasabi Object Storage

Create a new bucket and define its policy to allow objects to be anonymously readable but not listable:
```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": {
           "AWS": "*"
         },
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::mastodata/*"
      }
   ]
}
```

![](/assets/object-storage/wasabi-access-policy.png)

{{< hint style="info" >}}
If you are using an old bucket, ensure you are not giving “Everyone” read access to objects through Wasabi's legacy Access Control settings, as that allows listing objects and take precedence over the IAM policy defined above.

![](/assets/object-storage/wasabi-access-control.png)
{{< /hint >}}

Then, create a `mastodon-readwrite` policy to grant read and write access to your bucket:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::mastodata/*"
        }
    ]
}
```

![](/assets/object-storage/wasabi-mastodon-readwrite.png)

Finally, create a new `mastodon` user and don't forget to enable the `mastodon-readwrite` policy:
![](/assets/object-storage/wasabi-mastodon-user.png)

On Mastodon's side, you need to set `S3_FORCE_SINGLE_REQUEST=true` to properly handle large uploads.

### DigitalOcean Spaces

In your DigitalOcean Spaces Bucket, make sure that “File Listing” is “Restricted” to users with access keys.

![](/assets/object-storage/do-spaces.png)

### Scaleway

If you want to use Scaleway Object Storage, we strongly recommend you create a Scaleway project dedicated to your Mastodon instance assets and use a custom IAM policy.

First, create a new Scaleway project, in which you create your object storage bucket. You need to set your bucket visibility to "Private" to not allow objects to be listed.

![](/assets/object-storage/scaleway-bucket.png)

Now that your bucket is created, you need to create API keys to be used in your Mastodon instance configuration.

Head to the IAM settings (in your organization menu, top right of the screen), and create a new IAM policy (eg `mastodon-media-access`)

![](/assets/object-storage/scaleway-policy.jpg)

This policy needs to have one rule, allowing it to read, write and delete objects in the Scaleway project you created above (the scope).

![](/assets/object-storage/scaleway-policy-rules.jpg)

Then head to the IAM Applications page, and create a new one (eg `my-mastodon-instance`) and select the policy you created above.

Finally, click on the application you just created, then "API Keys", and create a new API key to use in your instance configuration. You should use the "Yes, set up preferred Project" option and select the project you created above as the default project for this key.

![](/assets/object-storage/scaleway-api-key.png)

Copy the Access Key ID and Secret, and use them for your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` Mastodon config variables.

### Exoscale

In Exoscale, your bucket should not have any read ACLs (Mastodon will set the ACLs on the object themselves as appropriate).

You need to create an API Key for the Mastodon app, restricted to the Object Storage (`sos`) service, restricted to your bucket, and with unrestricted operations.

![](/assets/object-storage/exoscale.png)

On Mastodon's side, you need to set `S3_FORCE_SINGLE_REQUEST=true` to properly handle large uploads.

### Cloudflare R2

Cloudflare R2 does not support ACLs, so Mastodon needs to be instructed not to try setting them. To do that, set the `S3_PERMISSION` environment variable to an empty string.

{{< hint style="warning" >}}
Without support for ACLs, media files from temporarily-suspended users will remain accessible.
{{< /hint >}}

To get credentials for use in Mastodon, select “Manage R2 API Tokens” and create a new API token with “Edit” permissions.

{{< hint style="warning" >}}
This section is currently under construction.
{{< /hint >}}
