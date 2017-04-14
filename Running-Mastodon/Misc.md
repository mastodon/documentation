Miscellaneous
=============

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
