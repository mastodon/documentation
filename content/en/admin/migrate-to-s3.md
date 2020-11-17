---
title: Migrate assets to S3
description: Instructional guide on migrating assets and images to Amazon S3 during production.
menu:
  docs:
    weight: 130
    parent: admin
---

## Migrating locally-hosted files to Amazon S3 {#migrate-local-to-s3}

The most expensive part of hosting Mastodon is storing assets and images on the same production server the main Mastodon process is running on. You may have set up the Mastodon server with the assets being hosted locally, but you now want to migrate to [Amazon S3](https://aws.amazon.com/) for flexible storage pricing.

### Pre-requisites {#pre-requisites}

You will need:

#### s3cmd {#s3cmd}

```bash
sudo apt-get install s3cmd
```

#### AWS Access keys {#access-keys}

Check your admin console for these.

### Configuring s3cmd {#configure-s3cmd}

To configure s3cmd, run the following as the `mastodon` user:

```bash
s3cmd --configure
```

You can test if the configuration works with the following (replace `$S3_BUCKET` with your bucket name):

```bash
echo "test" > tmp.txt
s3cmd --acl-public put tmp.txt s3://$S3_BUCKET/tmp.txt
```

### Update the configuration {#update-config}

To edit the configuration, change to the `mastodon` user, change to the directory, open `.env.production` with your favorite text editor, and paste the following inside:

```env
S3_ENABLED=true
S3_BUCKET=YOUR_BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS
S3_REGION=YOUR_BUCKET_REGION
S3_PROTOCOL=https
S3_HOSTNAME=s3-YOUR_BUCKET_REGION.amazonaws.com
# optionally for custom hostname, otherwise remove this
S3_ALIAS_HOST=YOUR_CUSTOM_DOMAIN
```

### Restart the server {#restart-server}

As root, restart the services with:

```bash
systemctl restart mastodon-*.service
```

### Uploading the media files {#upload-to-s3}

Run the following (replacing `$S3_BUCKET` with your bucket name):

```bash
s3cmd --acl-public sync --add-header="Cache-Control:public, max-age=315576000, immutable" public/system/ s3://$S3_BUCKET
```

This may take a while.

{{< hint style="success" >}}
**Hurray! This is it. You now have all of your files stored in S3 now!**
{{< /hint >}}
