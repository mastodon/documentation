---
title: Object storage
description: Serving user-uploaded files in Mastodon using external object storage
menu:
  docs:
    weight: 15
    parent: admin-optional
---

User-uploaded files can be stored on the main server's file system, or using an external object storage server.

By default, Mastodon will store user uploaded and federated media files on the server's file system, under `public/system` in its installation directory and the files are served at `https://example.com/system`.

{{< hint style="info" >}}
While using the server's file system is perfectly serviceable for small servers with a handful of users, using external object storage is more scalable.
{{</ hint >}}

## Configuration Options

### Backend Variables

The variables define how Mastodon communicates with your backend S3 storage provider.
It is important to note that even though are many references to AWS as the default provider, many different storage providers are able to be consumed by Mastodon including AWS S3, DigitalOcean Spaces, Cloudflare R2, Wasabi, MinIO, Exoscale, Scaleway, OVH, or any other other S3-compatible provider.

Please refer to your provider's documentation for assistance in identifying the proper settings for many of these options.

#### `S3_ENABLED`

Must be set to `true` to enable S3 storage.

Default: `false`

#### `S3_BUCKET`

Must be set to the name of the bucket hosted by your S3 provider.

Default: _None_

#### `S3_REGION`

The S3 region where your bucket was created.
May not be required by all providers.

Default: `us-east-1`

#### `S3_ENDPOINT`

The specific S3 target where Mastodon connects to perform API operations.

Default: `s3.<S3_REGION>.amazonaws.com`

#### `AWS_ACCESS_KEY_ID`

_No default value, must be setup on your S3 provider._

#### `AWS_SECRET_ACCESS_KEY`

_No default value, must be setup on your S3 provider._

### Client Access Variables

Once S3 file storage is enabled, Mastodon will provide new URLs from the web interface, Mastodon API clients, and to other ActivityPub servers for all media 'read' operations.
Accessing these URLs does not require authentication, using plain HTTP GET methods, which means they can be routed and/or cached through reverse proxies and CDNs.

In addition to hiding the usage of the storage provider, with proper configuration you can reduce egress bandwidth costs from the storage provider.
It also means that those URLs can contain host/domain names which are entirely different from those used by the S3 storage provider itself, if desired.

{{< hint style="info" >}}
Remember you must serve the files with proper CORS headers, otherwise media may not be visible in the user's browser and some functions of Mastodon's web UI will not work. For example, `Access-Control-Allow-Origin: *`
{{</ hint >}}

It is highly reccomended that you consider using a domain (or subdomain) you control, for delivery of S3 stored media.
Instead of delivering media from an address like `https://s3-us-east-1.amazonaws.com/example-mastodon-bucket/image.jpg` with the proper configuration it can come from something like `https://files.example.com/image.jpg`.

This allows flexibility should you decide to change S3 providers at a later date, especially where the address for your file storage has already federated to other servers for older posts, which may lead to those files being no longer accessible if you need to change this address.

{{< page-ref page="admin/optional/object-storage-proxy.md" >}}

#### `S3_ALIAS_HOST`

- If `S3_ALIAS_HOST` is not set, then the media access URL will be `<S3_PROTOCOL>://<S3_HOSTNAME>/<S3_BUCKET>/<object path>`.
- If `S3_ALIAS_HOST` is set, then the media access URL will be `<S3_PROTOCOL>://<S3_ALIAS_HOST>/<object path>`.

Default: _None_

#### `S3_PROTOCOL`

Generally should not be changed from the default of HTTPS.

Default: `https`

#### `S3_HOSTNAME`

Required if not using AWS S3 and `S3_ALIAS_HOST` is not set.

Default: `s3-<S3_REGION>.amazonaws.com`

### Additional Variables

Due to the large number of S3 provider options, but inconsistencies in how they implement the S3 API, there may be some tuning required specific to your implemention.

#### `S3_SIGNATURE_VERSION`

The signature version used to authenticate and authorize requests to the S3 provider.

Default: `v4`

#### `S3_OVERRIDE_PATH_STYLE`

Set this to `true` if the storage provider requires API operations to be sent to `<S3_BUCKET>.<S3_ENDPOINT>` (domain-style).
Only used if `S3_ENDPOINT` is also configured.

Default: `false`

#### `S3_OPEN_TIMEOUT`

The number of seconds before the HTTP handler should timeout while trying to open a new HTTP session.

Default: `5`

#### `S3_READ_TIMEOUT`

The number of seconds before the HTTP handler should timeout while waiting for an HTTP response.

Default: `5`

#### `S3_FORCE_SINGLE_REQUEST`

Set this to `true` if you run into trouble processing large files.

Default: `false`

#### `S3_ENABLE_CHECKSUM_MODE`

Enables verification of object checksums when Mastodon is retrieving an object from the storage provider. This feature is available in AWS S3 but may not be available in other S3-compatible implementations.

Default: `false`

#### `S3_STORAGE_CLASS`

When using AWS S3, this variable can be set to one of the [storage class](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html) options which influence the storage selected for uploaded objects (and thus their access times and costs).
If no storage class is specified then AWS S3 will use the `STANDARD` class, but options include `REDUCED_REDUNDANCY`, `GLACIER`, and others.

Default: `STANDARD`

#### `S3_MULTIPART_THRESHOLD`

The maximum size (in megabytes) of objects that will be uploaded in a single operation.
Objects above this threshold will be uploaded using the multipart chunking mechanism, which can improve transfer speeds and reliability.

Default: `15`

#### `S3_PERMISSION`

Defines the S3 object ACL when uploading new files.
When using an S3-compatible object storage backend, it is recommended to use a backend with ACL support, as it allows Mastodon to quickly improve the security of private data.

Default: `public-read`

{{< hint style="danger" >}}
Use caution when using [S3 Block Public Access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) and turning on the `BlockPublicAcls` option, as uploading objects with ACL `public-read` will fail (403).
In that configuration you should set `S3_PERMISSION` to `private`.
{{</ hint >}}

{{< hint style="info" >}}
Regardless of the ACL configuration, your S3 bucket must be set up to ensure that all objects are publicly readable but not writable or listable.
At the same time, Mastodon itself should have write access to the bucket.
This configuration is generally consistent across all S3 providers.
{{</ hint >}}

#### `S3_BATCH_DELETE_LIMIT`

The official [Amazon S3 API](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) can handle deleting 1,000 objects in one batch job, but some providers may have issues handling this many in one request, or offer lower limits.

Default: `1000`

#### `S3_BATCH_DELETE_RETRY`

During batch delete operations, S3 providers may perodically fail or timeout while processing deletion requests.
Mastodon will back off and retry the request up to this maximum number of times.

Default: `3`

## Provider Specific Configurations

### MinIO

MinIO is an open-source implementation of an S3 object provider.

{{< hint style="info" >}}
Installing MinIO is outide the scope of this documentation, but this should show how to configure a bucket for use in Mastodon.
{{</ hint >}}

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

You can set these policies from the MinIO Console (web-based user interface) or the command-line client (`mcli` / `mc`).

#### Using the MinIO Console

Connect to the MinIO Console web interface and create a new bucket (or navigate to your existing bucket):
![](/assets/object-storage/minio-bucket.png)

Then, configure the “Access Policy” to a custom one that allows read access (`s3:GetObject`) without write access or the ability to list objects (see above):
![](/assets/object-storage/minio-access-policy.png)

{{< hint style="info" >}}
If the MinIO Console does not allow you to set a “Custom” policy, you will likely need to update MinIO.
If you are using MinIO in _standalone_ or _filesystem_ mode, [`RELEASE.2022-10-24T18-35-07Z`](https://github.com/minio/minio/releases/tag/RELEASE.2022-10-24T18-35-07Z) should be a safe version to update to that does not require [an involved migration procedure](https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#migrate-from-gateway-or-filesystem-mode).
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

First, create a new Scaleway project, in which you create your object storage bucket.
You need to set your bucket visibility to "Private" to not allow objects to be listed.

![](/assets/object-storage/scaleway-bucket.png)

Now that your bucket is created, you need to create API keys to be used in your Mastodon instance configuration.

Head to the IAM settings (in your organization menu, top right of the screen), and create a new IAM policy (eg `mastodon-media-access`)

![](/assets/object-storage/scaleway-policy.jpg)

This policy needs to have one rule, allowing it to read, write and delete objects in the Scaleway project you created above (the scope).

![](/assets/object-storage/scaleway-policy-rules.jpg)

Then head to the IAM Applications page, and create a new one (eg `my-mastodon-instance`) and select the policy you created above.

Finally, click on the application you just created, then "API Keys", and create a new API key to use in your instance configuration.
You should use the "Yes, set up preferred Project" option and select the project you created above as the default project for this key.

![](/assets/object-storage/scaleway-api-key.png)

Copy the Access Key ID and Secret, and use them for your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` Mastodon config variables.

### Exoscale

In Exoscale, your bucket should not have any read ACLs (Mastodon will set the ACLs on the object themselves as appropriate).

You need to create an API Key for the Mastodon app, restricted to the Object Storage (`sos`) service, restricted to your bucket, and with unrestricted operations.

![](/assets/object-storage/exoscale.png)

On Mastodon's side, you need to set `S3_FORCE_SINGLE_REQUEST=true` to properly handle large uploads.

### Cloudflare R2

Cloudflare R2 does not support ACLs, so Mastodon needs to be instructed not to try setting them.
To do that, set the `S3_PERMISSION` environment variable to an empty string.

{{< hint style="warning" >}}
Without support for ACLs, media files from temporarily-suspended users will remain accessible.
{{< /hint >}}

To get credentials for use in Mastodon, select “Manage R2 API Tokens” and create a new API token with “Edit” permissions.

{{< hint style="warning" >}}
This section is currently under construction.
{{< /hint >}}
