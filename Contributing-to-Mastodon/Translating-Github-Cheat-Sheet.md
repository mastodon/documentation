Translating GitHub Cheat Sheet
===========

## Install Git
1. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) based on what operating system you have
2. [Add your identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) to your git environment. (If you use an email associated with your GitHub account your profile will show a heat map of your commit activity).
```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
**NOTE: Use quotations around your name because of the space.**

## Fork The Repository
1. Navigate to [Mastodon's GitHub Page](https://github.com/tootsuite/mastodon)
2. Click `Fork` in the top right.
3. There will now be a copy of the repository on your account.

## Clone The Repository
1. Open Terminal on your computer and navigate to a place where you want to store the project using `cd` (ex. `cd ~/Documents`)
2. Download a copy of the project using
```
git clone https://github.com/YOURUSERNAME/mastodon
```
3. Add the original mastodon repository as `upstream`
```
git remote add upstream https://github.com/tootsuite/mastodon.git
```
4. Branch out to translate. It is recommended to replace `locale` with RFC5646 language tag of you language:
```
git checkout -b locale
```
5. Write your awesome translations following the [translating guide](./Translating.md#translating-1)

## Push To Your Repository
1. Open Terminal and navigate to where you stored mastodon (ex. `cd ~/Documents/mastodon`)
2. Type `git status` to see files you have modified or added.
3. We need to add those to the commit we're about to make and we can add them all at once with
```bash
git add .
```
4. We can commit everything to our local copy with
```
git commit -m "YOUR MESSAGE HERE"
```
You'll want to make your commit message something short, but meaningful as it's visible to everyone. A good example would be, "Added French localization".
5. Now you can push your changes to your remote copy of mastodon using
```
git push
```

## Pull Request
1. [Click this](https://github.com/tootsuite/mastodon/compare) to start a new pull request, or navigate to [Mastodon's GitHub Page](https://github.com/tootsuite/mastodon), click `Pull requests`, and `New pull request`
2. On the Compare Changes page you will want to click `compare across forks`
3. The base fork should be `tootsuite/mastodon:master` and the head fork should be `YOURUSERNAME/mastodon:YOURBRANCH`. This will show you a summary of changed files.
4. Click `Create pull request` and explain your changes.

## Finished
Congratulations! Your pull request will be reviewed for merging into the repository.

If you had any questions or confusions during this process please submit a [documentation issue](https://github.com/tootsuite/documentation/issues) or [pull request](https://github.com/tootsuite/documentation/pulls) clarifying confusing areas.

If things get overwhelming, copy out your translation work, delete the project locally, remove the fork from your account, and start the process over again.

If you would prefer to not work in a Terminal, there are [GUI clients](https://git-scm.com/downloads/guis) available for git.
