

# Nginx
Reverse proxy the Relay via Nginx with a Let's Encrypt TLS Cert.

```
server {

        listen 80;
        server_name neighbours.aus.social;
        root /home/mastodon/mastodon/public;
        location /.well-known/acme-challenge/ {
                allow all;
        }
        location / {

                return 301 https://$host$request_uri;
        }
}

server {
        listen 443 ssl http2;
        #listen [::]:443 ssl http2;

        server_name neighbours.aus.social;
        root /home/mastodon/mastodon/public;

        # SSL
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:MEDIUM:!LOW:!aNULL:!NULL:!SHA;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;

        ssl_certificate /etc/letsencrypt/live/neighbours.aus.social/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/neighbours.aus.social/privkey.pem;

        location /.well-known/acme-challenge/ {
                allow all;
        }
        location / {

                proxy_pass http://localhost:8085;
                proxy_pass_request_headers on;  # Relay might not work without this.
                proxy_set_header Host $http_host;  # Relay WILL not work without this.
        }

}
```
