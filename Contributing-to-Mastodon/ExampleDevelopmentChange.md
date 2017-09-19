Hat tip to Old Man Pan @agoni@mastodon.social who described this solution.

Issue - how to make quick simple change to code base - so you know your system can be changed, like "Hello world", 
So change "Toot!" button in mastodon to "Awooga!" or anything you want!

Solution: On Ubuntu ;)

0) Stop service (if running): as root
systemctl stop mastodon-web.service mastodon-sidekiq.service mastodon-streaming.service 

1) Edit the "Toot" in file - as mastodon user
edit: ~/mastodon/live/app/javascript/mastodon/locales/en.json
change: 
"compose_form.publish": "Toot"
to
"compose_form.publish": "Awooga"
save - and overwrite.

2) Recompile - as mastodon user
go back to ~/mastodon/live and run
RAILS_ENV=production bundle exec rails assets:precompile


3) Start service: as root 
systemctl start mastodon-web.service mastodon-sidekiq.service mastodon-streaming.service 

ta da! - "Toot!" button in your mastodon says "Awooga!" or what you put there 

Awooga to all - you now a mastodon developer - the world your oyster!

@agoni rocks
@gargon rocks and toots
@awooga is me, and #Awooga the hashtag

Awooga to all!
