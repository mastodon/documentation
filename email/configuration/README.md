Configuration
=====

By default, mastodon use the SMTP protocol to send emails.
In most cases, you will configure an SMTP endpoint that will receive emails from mastodon and deliver them to user's email provider on your behalf.
Instance admin can avoid using emails altogether too.


This document highlight the different configuration options available to mastodon instance administrator:
- [Using Mastodon without email](README.md#without-emails)
- [Understanding SMTP parameters:](README.md#smtp-parameters)
- [Configure an SMTP provider: mailgun example](README.md#mailgun-example)
- [SMTP best practice](README.md#smtp-best-practice)
- [Configure a sendmail compatible relay](README.md#sendmail-example)
- [Best practice for email](README.md#email-best-practice)

### Without email
An administrator can bypasss the email confirmation via a rake task:
`RAILS_ENV=production bundle exec rails mastodon:confirm_email USER_EMAIL=user@example.com` 
Also an adminsitrator can wipe users that never confirmed e-mail and never signed in.
`RAILS_ENV=production bundle exec rails mastodon:clear`

### SMTP parameters
The parameters are configurable in the `.env.production` file.
The variable are used by ActionMailer in `config/environments/production.rb`

#### Configure a local SMTP server without authentication
If you have a local SMTP server that doesn't require authentication, you only need to  change `SMTP_SERVER`, `SMTP_PORT` and `SMTP_FROM_ADDRESS`

#### Mailgun example


### SMTP best practice
To initiate a secure converation with the SMTP service, it is best practice to use smartls by setting `SMTP_ENABLE_STARTTLS_AUTO=true`.
To authenticate the host you are conversing with, you need to tell action mailer to tell openssl to verify the host.
You can discard any failure with `SMTP_OPENSSL_VERIFY_MODE=none`.
You can choose to enforce the validity of the SSL/TLS certificate of server with `SMTP_OPENSSL_VERIFY_MODE=peer`
To verify the authenticity of the certificate, openssl will need to have a certificate authority file itslef. Make sure to set `SMTP_CA_FILE=/etc/ssl/certs/ca-certificates.crt` in your `.env.production` file.
Change your `config/environments/production.rb` to have a `:ca_file              => ENV['SMTP_CA_FILE'],` in the `config.action_mailer.smtp_settings` section.


### Sendmail example
To use sendmail you need to set `SMTP_DELIVERY_METHOD=sendmail`
 

### Email best practice
On the receiving end, providers might expect you to follow certain method to validate the email sender and authenticate your domain.

#### SPF
#### DKIM
#### DMARC

