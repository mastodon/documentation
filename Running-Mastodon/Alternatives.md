Alternative Server Components
=============================

This file provides some configurations for systems that will not be using
the "stock" server components.

## Supervisord

An alternative to using systemd for controlling your mastodon processes is
[Supervisord](http://supervisord.org/). The following file can be placed in
`/etc/supervisor/conf.d/mastodon.conf`.

```
[group:mastodon]
programs=web,sidekiq,streaming

[program:web]
command=/home/mastodon/live/ruby_wrapper bundle exec puma -C config/puma.rb
user=mastodon
directory=/home/mastodon/live
stdout_logfile=/home/mastodon/live/log/puma.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
redirect_stderr=true
environment=PORT=3000
stopasgroup=true

[program:sidekiq]
command=/home/mastodon/live/ruby_wrapper bundle exec sidekiq -c 5 -q default -q mailers -q pull -q push
user=mastodon
directory=/home/mastodon/live
stdout_logfile=/home/mastodon/live/log/sidekiq.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
redirect_stderr=true
environment=DB_POOL=5
stopasgroup=true

[program:streaming]
command=/home/mastodon/live/ruby_wrapper /usr/bin/npm run start
user=mastodon
directory=/home/mastodon/live
stdout_logfile=/home/mastodon/live/log/streaming.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
redirect_stderr=true
environment=PORT=4000
stopasgroup=true
```

This configuration makes use of a wrapper script to ensure the correct
environment.

```shell
#!/usr/bin/env bash

cd /home/mastodon/live
export RBENV_ROOT=/home/mastodon/.rbenv
export PATH=/home/mastodon/.rbenv/bin:/home/mastodon/.rbenv/shims:$PATH
export $(cat ".env.production" | xargs)

$@
```

## Running with init scripts

Example init script for the web workers, to be placed in `/etc/init.d/mastodon-web`:

```
#!/sbin/openrc-run

name="Mastodon Web Service"
root="/home/mastodon/live"
pidfile="${root}/web.pid"

depend() {
    use net
}

start() {
    ebegin "Starting Mastodon web workers"

    cd $root

    start-stop-daemon --start \
        --chdir "${root}" \
        --user="mastodon" \
        --pidfile="${pidfile}" \
        --exec /usr/bin/env -- RAILS_ENV=production PORT=3000 bundle exec puma -C config/puma.rb -d --pidfile ${pidfile}

    eend $?
}

stop() {
    ebegin "Stopping Mastodon web workers"
    start-stop-daemon --stop \
        --pidfile=${pidfile} \
    eend $?
}

```

Example init script for the background workers, to be placed in `/etc/init.d/mastodon-sidekiq`:

```

#!/sbin/openrc-run

name="Mastodon background workers Service"
root="/home/mastodon/live"
pidfile="${root}/worker.pid"
logfile="${root}/sidekiq.conf"

depend() {
    use net
    need redis
}

start() {
    ebegin "Starting Mastodon background workers"

    cd $root

    start-stop-daemon --start \
        --chdir "${root}" \
        --user="mastodon" \
        --pidfile="${pidfile}" \
        --exec /usr/bin/env -- RAILS_ENV=production DB_POOL=5 bundle exec sidekiq -d -P ${pidfile} -L ${logfile} -c 5 -q default -q mailers -q pull -q push
    eend $?
}

stop() {
    ebegin "Stopping Mastodon background workers"
    start-stop-daemon --stop \
        --pidfile=${pidfile} \
    eend $?
}

```

Example init script file for the streaming API, to be placed in `/etc/init.d/mastodon-streaming`:

```
#!/sbin/openrc-run

name="Mastodon streaming API service"
root="/home/mastodon/live"

depend() {
    use net
}

start() {
    ebegin "Starting Mastodon streaming API"

    cd $root

    start-stop-daemon --start \
        --background --quiet \
        --chdir "${root}" \
        --user="mastodon" \
        --make-pidfile --pidfile=${root}/streaming.pid \
        --exec /usr/bin/env -- NODE_ENV=production PORT=4000 /usr/bin/npm run start
    eend $?
}

stop() {
    ebegin "Stopping Mastodon streaming API"
    start-stop-daemon --stop \
        --pidfile=${root}/streaming.pid \
    eend $?
}
```

This allows you to `rc-update add mastodon-web && rc-update add mastodon-sidekiq && rc-update add mastodon-streaming` and `service mastodon-web start && service mastodon-sidekiq start && service mastodon-streaming start` to get things going.

## Apache

Setting up Mastodon behind Apache is possible as well, although you will need to enable [mod_proxy_wstunnel](https://httpd.apache.org/docs/trunk/mod/mod_proxy_wstunnel.html) beforehand. The configuration is then pretty straightforward.

```
<VirtualHost *:80>
   ServerAdmin contact@example.com
   ServerName example.com
   Redirect Permanent / https://example.com/
</VirtualHost>

<VirtualHost *:443>
   ServerAdmin contact@example.com
   ServerName example.com

   DocumentRoot /home/mastodon/live/public/

   Header always set Referrer-Policy "strict-origin-when-cross-origin"
   Header always set Strict-Transport-Security "max-age=31536000"
   SetEnvIf Request_URI "/pghero*" pghero
   Header set Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' wss://example.com; img-src 'self' data:; script-src 'self'; frame-src 'self' https:"
   Header set Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' wss://example.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'; frame-src 'self' https:" env=pghero

   SSLEngine on
   SSLProtocol -all +TLSv1.2
   SSLHonorCipherOrder on
   SSLCipherSuite EECDH+AESGCM:AES256+EECDH:AES128+EECDH
   SSLCompression off
   SSLSessionTickets off
   SSLStaplingResponderTimeout 5
   SSLStaplingReturnResponderErrors off
   SSLUseStapling on

   SSLCertificateFile example.pem
   SSLCertificateKeyFile example.key
   
   <LocationMatch "^/(assets|avatars|emoji|headers|packs|sounds|system)>
      Header always set Cache-Control "public, max-age=31536000, immutable"
   </LocationMatch>

   ProxyPreserveHost On
   RequestHeader set X-Forwarded-Proto "https"
   
   ProxyPass /500.html !
   ProxyPass /sw.js !
   ProxyPass /robots.txt !
   ProxyPass /manifest.json !
   ProxyPass /browserconfig.xml !
   ProxyPass /mask-icon.svg !
   ProxyPassMatch ^(/.*\.(png|ico)$) !
   ProxyPassMatch ^/(assets|avatars|emoji|headers|packs|sounds|system|.well-known/acme-challenge) !
   
   ProxyPass /api/v1/streaming/ ws://localhost:4000/
   ProxyPassReverse /api/v1/streaming/ ws://localhost:4000/
   ProxyPass / http://localhost:3000/
   ProxyPassReverse / http://localhost:3000/

   ErrorDocument 500 /500.html
   ErrorDocument 501 /500.html
   ErrorDocument 502 /500.html
   ErrorDocument 503 /500.html
   ErrorDocument 504 /500.html
</VirtualHost>
```
