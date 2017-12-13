![Mastodon](https://i.imgur.com/NhZc40l.png)
====

Mastodon is a free, open-source social network server based on open web protocols like ActivityPub and OStatus. The social focus of the project is a viable decentralized alternative to commercial social media silos that returns the control of the content distribution channels to the people.

## Documentation
### [Using Mastodon](Using-Mastodon)

- [Frequently Asked Questions](Using-Mastodon/FAQ.md)
- [List of Mastodon instances](https://joinmastodon.org) ([Alternative list](https://instances.social))
- [List of apps for Mastodon](Using-Mastodon/Apps.md) (or just search for Mastodon in your app store of choice)
- [User guide](Using-Mastodon/User-guide.md)

### [Using the API](Using-the-API)

- [API documentation](Using-the-API/API.md)
- [Streaming API documentation](Using-the-API/Streaming-API.md)
- [Testing the API with cURL](Using-the-API/Testing-with-cURL.md)
- [OAuth details](Using-the-API/OAuth-details.md)
- [Tips for app developers](Using-the-API/Tips-for-app-developers.md)
- [Push notifications](Using-the-API/Push-notifications.md)
- [Libraries](Using-the-API/Libraries.md)

### [Running Mastodon](Running-Mastodon)
#### In production

>**Please note**: It is highly recommended to run a [tagged release](https://github.com/tootsuite/mastodon/releases) of Mastodon and **not** run off the current `master` branch.

- Before you start: [Examples of resource usage from other live instances](Running-Mastodon/Resources-needed.md)
- If you want to use Docker: [Installation using Docker](Running-Mastodon/Docker-Guide.md)
- If you want to run it standalone: [Standalone installation](Running-Mastodon/Production-guide.md)
- There are other options:
  - [Mastodon on Heroku](Running-Mastodon/Heroku-guide.md)
  - [Mastodon on Scalingo](Running-Mastodon/Scalingo-guide.md)
  - [Mastodon on Nanobox](Running-Mastodon/Nanobox-Guide.md)
- After installation:
  - [Administrating a Mastodon instance](Running-Mastodon/Administration-guide.md)
  - [Tuning Mastodon performance](Running-Mastodon/Tuning.md)
  - [List of terminal commands](Running-Mastodon/List-of-Rake-tasks.md)
  - [Customizing the look](Running-Mastodon/Customizing.md)
- Advanced:
  - [Serving Mastodon from a subdomain](Running-Mastodon/Serving_a_different_domain.md)
  - [Scaling up with PgBouncer](Running-Mastodon/PgBouncer-guide.md)

The aforementioned guides presume using certain software, like Nginx. But using alternatives is possible: [Alternative system configurations](Running-Mastodon/Alternatives.md)

#### In development

- [Setting up a development environment](Running-Mastodon/Development-guide.md)
- There are other options:
  - [Using Vagrant](Running-Mastodon/Vagrant-guide.md)
  - [Using Nanobox](Running-Mastodon/Nanobox-Guide.md)

### [Contributing to Mastodon](Contributing-to-Mastodon)
- 🎉 [List of Sponsors](https://joinmastodon.org/sponsors) - thank you to these people! 🎉
- [Translate Mastodon to your language](Contributing-to-Mastodon/Translating.md)
- [Report bugs and submit ideas](https://github.com/tootsuite/mastodon/issues)

### Protocols

- [List of used specs and RFCs for the federation](Specs-and-RFCs-used.md)
- [Extensions of the above protocols](Extensions.md)
