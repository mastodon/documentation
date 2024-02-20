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

Mastodon uses the S3 API (`S3_REGION`, `S3_ENDPOINT`, `S3_BUCKET`,
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_SIGNATURE_VERSION`,
`S3_OVERRIDE_PATH_STYLE`) for all write, delete, and
permissions-modification operations. This includes media uploads (from
the web interface, from Mastodon API clients, and from ActivityPub
servers), media deletion (when a post is edited or deleted), and
blocking access to media (when an account is suspended).

Mastodon sends URLs to the web interface, Mastodon API clients, and
ActivityPub servers for all 'read' operations. As a result those
operations are anonymous (no authentication or authorization needed)
and use plain HTTP GET methods, which means they can be routed through
reverse proxies and CDNs, and can be cached. It also means that those
URLs can contain host/domain names which are entirely different from
those used by the S3 storage provider itself, if desired. See the
detailed documentation below which describes how those URLs are
constructed and which environment variables are involved.

To enable S3 storage, set the `S3_ENABLED` environment variable to `true`.

### Environment variables for S3 API access

- `S3_REGION` (defaults to 'us-east-1', required if using AWS S3, may
  not be required with other storage providers)
- `S3_ENDPOINT` (defaults to 's3.<S3_REGION>.amazonaws.com', required
  if not using AWS S3)
- `S3_BUCKET=mastodata` (replacing `mastodata` with the name of your
  bucket)
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` need to be set to
  your credentials
- `S3_SIGNATURE_VERSION` (defaults to 'v4', should be compatible with
  most storage providers)
- `S3_OVERRIDE_PATH_STYLE` (only used if `S3_ENDPOINT` is configured,
  set this to `true` if the storage provider requires API operations
  to be sent to '<S3_BUCKET>.<S3_ENDPOINT>` (domain-style))

### Environment variables for client access to media objects

- `S3_PROTOCOL` (defaults to `https`)
- `S3_HOSTNAME` (defaults to 's3-<S3_REGION>.amazonaws.com', required
  if not using AWS S3 and `S3_ALIAS_HOST` is not set)
- `S3_ALIAS_HOST` (can be used instead of `S3_HOSTNAME` if you do not
  want `S3_BUCKET` to be included in the media URLs, and requires that
  you have provisioned a reverse proxy or CDN in front of the storage
  provider)

As noted above, Mastodon will send URLs to clients when they need to
access media objects from the storage provider. The URLs are
constructed as follows:

- If `S3_ALIAS_HOST` is not set, then the URL will be
  '<S3_PROTOCOL>://<S3_HOSTNAME>/<S3_BUCKET>/\<object path\>'

- If `S3_ALIAS_HOST` is set, then the URL will be
  '<S3_PROTOCOL>://<S3_ALIAS_HOST>/\<object path\>'

It is important to note that when `S3_ALIAS_HOST` is set, the bucket
name is **not** included in the generated URL; this means the bucket
name must be included in `S3_ALIAS_HOST` (referred to as
'domain-style' object access), or that `S3_ALIAS_HOST` must point to a
reverse proxy or CDN which can include the bucket name in the URL it
uses to send the request onward to the storage provider. This type of
configuration allows you to 'hide' the usage of the storage provider
from the instance's clients, which means you can change storage
providers without changing the resulting URLs.

In addition to hiding the usage of the storage provider, this can also
allow you to cache the media after retrieval from the storage
provider, reducing egress bandwidth costs from the storage
provider. This can be done in your own reverse proxy, or by using a
CDN.

{{< page-ref page="admin/optional/object-storage-proxy.md" >}}

{{< hint style="info" >}}
You must serve the files with CORS headers, otherwise some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

### Optional environment variables

#### `S3_OPEN_TIMEOUT`

Default: 5 (seconds)

The number of seconds before the HTTP handler should timeout while trying to open a new HTTP session.

#### `S3_READ_TIMEOUT`

Default: 5 (seconds)

The number of seconds before the HTTP handler should timeout while waiting for an HTTP response.

#### `S3_FORCE_SINGLE_REQUEST`

Default: false

Set this to `true` if you run into trouble processing large files.

#### `S3_ENABLE_CHECKSUM_MODE`

Default: false

Enables verification of object checksums when Mastodon is retrieving
an object from the storage provider. This feature is available in AWS
S3 but may not be available in other S3-compatible implementations.

#### `S3_STORAGE_CLASS`

Default: none

When using AWS S3, this variable can be set to one of the [storage
class](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
options which influence the storage selected for uploaded objects (and
thus their access times and costs). If no storage class is specified
then AWS S3 will use the `STANDARD` class, but options include
`REDUCED_REDUNDANCY`, `GLACIER`, and others.

#### `S3_MULTIPART_THRESHOLD`

Default: 15 (megabytes)

Objects of this size and smaller will be uploaded in a single
operation, but larger objects will be uploaded using the multipart
chunking mechanism, which can improve transfer speeds and reliability.

#### `S3_PERMISSION`

Default: `public-read`

Defines the S3 object ACL when uploading new files. Use caution when
using [S3 Block Public
Access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)
and turning on the `BlockPublicAcls` option, as uploading objects with
ACL `public-read` will fail (403). In that case, set `S3_PERMISSION`
to `private`.

{{< hint style="danger" >}}
Regardless of the ACL configuration, your
S3 bucket must be set up to ensure that all objects are publicly
readable but not writable or listable. At the same time, Mastodon
itself should have write access to the bucket. This configuration is
generally consistent across all S3 providers, and common ones are
highlighted below.
{{</ hint >}}

#### `S3_BATCH_DELETE_LIMIT`

Default: `1000`

The official [Amazon S3
API](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html)
can handle deleting 1,000 objects in one batch job, but some providers
may have issues handling this many in one request, or offer lower
limits.

#### `S3_BATCH_DELETE_RETRY`

Default: 3

During batch delete operations, S3 providers may perodically fail or
timeout while processing deletion requests. Mastodon will back off and
retry the request up to this maximum number of times.

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
