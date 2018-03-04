# Enabling LDAP login

Follow this guide to use LDAP for external authentication of users. When a user logs in to the Mastodon instance, their username and password will be verified by authenticating (binding) to an LDAP server. If a user exists in the LDAP directory and logs in to the Mastodon instance for the first time, a user account will be auto-created on the Mastodon instance for them.

## Installing LDAP support

First, install the gem(s) required for LDAP support, by running `bundle install` with the `LDAP_ENABLED` environment variable set to `true`:

```bash
LDAP_ENABLED=true bundle install
```

## Configuring LDAP settings

Then, edit your `.env.production` file to contain the following settings. Example values are given here, but you'll need to fill in values appropriate for your site.

* `LDAP_ENABLED=true`
  * This enables LDAP authentication. Note that you'll also need to set this environment variable when running Mastodon and when running `bundle install`, e.g. during upgrades, so that the gem(s) required for LDAP support are installed.
* `LDAP_METHOD=start_tls`
  * This sets the method to use for TLS encryption of the communications between Mastodon and the LDAP server. The possible values are:
    * `start_tls` - Connect to the LDAP server, send an LDAP request to perform a Start TLS operation, wait for a successful LDAP response, then start the TLS handshake. Normally uses port 389.
    * `simple_tls` - Immediately start the TLS handshake after connecting to the LDAP server, before sending any LDAP traffic. Normally uses port 636.
* `LDAP_HOST=your.ldap.server`
* `LDAP_PORT=389`
  * Set these to the hostname and port to connect to of your LDAP server. The standard port for LDAP is 389, but if you are using `LDAP_METHOD=simple_tls` you will need to specify the port that your LDAP server is expecting TLS connections on - this is normally port 636.
* `LDAP_BASE=dc=your,dc=domain`
  * Mastodon will search for user accounts in the subtree rooted at this base. Set this to the base DN (Distinguished Name) of your directory tree in the LDAP server.
* `LDAP_BIND_DN=uid=mastodon,ou=example,dc=your,dc=domain`
* `LDAP_PASSWORD=somepassword`
  * When Mastodon needs to search for a user account in your LDAP server, it will first authenticate (bind) to the server using these credentials to do the search. It's recommended to create a service account for Mastodon in your LDAP directory, and give it a strong password. Then use the DN (Distinguished Name) and password of the service account for these settings.
* `LDAP_UID=uid`
  * Set this to the LDAP attribute name that you want to use for the username part of Mastodon account names, when users log in using LDAP authentication. For example, if your Mastodon instance name is **social.your.domain**, and your LDAP user accounts have **uid** attributes with values like **alice** and **bob**, you can use `LDAP_UID=uid` here, and their corresponding Mastodon account names will be **\@alice\@social.your.domain** and **\@bob\@social.your.domain**

## Setting LDAP_ENABLED in process environment

The environment variable `LDAP_ENABLED` must be set to `true` in the environment of the processes that run Mastodon, outside of the `.env.production` file, because it's needed in the Gemfile. The method of doing this will depend on how you're running Mastodon, but for example if you've followed the Production Guide, you have probably created three systemd service files to run Mastodon processes - you can edit these to set the environment variable. In the `mastodon-web.service` and `mastodon-sidekiq.service` files, after the `Environment="RAILS_ENV=production"` line, add this line: `Environment=LDAP_ENABLED=true`, then run `systemctl daemon-reload` to reload changes to the service files.

## Troubleshooting

* If you see an error `RuntimeError (Invalid strategy ldap_authenticatable)` logged, and an error page in the browser, this is probably caused by the `LDAP_ENABLED` environment variable not being set to `true` for the processes that run Mastodon - see the above section.
* If you see an error like `Net::LDAP::Error (SSL_connect returned=1 errno=0 state=error: certificate verify failed)` logged when a user attempts to log in, this is probably because your LDAP server's TLS certificate is not trusted by default by OpenSSL. You need to add the LDAP server's CA certificate to the default OpenSSL trusted certificate store on the machine Mastodon runs on. For example, on Debian or Ubuntu you should add the LDAP server's CA certificate to `/usr/local/share/ca-certificates/` and then run `update-ca-certificates` as root.
* If you see an error like this logged when a user attempts to log in:
    ```
    NoMethodError (undefined method `split' for nil:NilClass):
    app/models/email_domain_block.rb:18:in `block?'
    app/validators/blacklisted_email_validator.rb:15:in `on_blacklist?'
    app/validators/blacklisted_email_validator.rb:11:in `blocked_email?'
    app/validators/blacklisted_email_validator.rb:5:in `validate'
    app/models/user.rb:122:in `ldap_setup'
    app/models/user.rb:293:in `ldap_get_user'
    lib/devise/ldap_authenticatable.rb:29:in `authenticate!'
    app/controllers/concerns/localized.rb:14:in `set_locale'
    ```
  This is probably because the user has an invalid or missing `mail` attribute in their LDAP entry. Check the user's `mail` attribute in the LDAP directory.
