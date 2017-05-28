Beginner's Guide to Contributing Documentation to Mastodon
============================================

Before you start, you should have Git installed on your computer. Personally, I use Git through the Windows Subsystem for Linux, but this is not for everyone. Read through the [first chapter of the official Git documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) to get up to speed. It's reasonably clear.

## Cloning the documentation repository to your own system.

First, make a fork of the [Mastodon documentation](https://github.com/tootsuite/documentation) on your own GitHub profile. Follow [GitHub's forking documentation](https://guides.github.com/activities/forking/) if you aren't sure how. Eventually, you should go through and read all of the official documentation for both Git and GitHub, but what I've linked so far will get you started. **Warning**: the GitHub documentation recommends Github Desktop, but more experienced developers have warned me against using it until I'm more experienced with Git. For now, stop once you finish the part that tells you how you fork on GitHub. I'll show you all the commands to use and tell you what they do.

1. Run `mkdir mastodocs` in the folder you use for development.

1. Then `cd mastodocs` do get to the subfolder you just made.

2. And `git clone https://github.com/YourGitHubUserName/documentation.git`, replacing **YourGitHubUserName** with your GitHub user name, to clone your personal fork to your computer.

3. Finally, run `cd documentation` to move to the folder Git made for you.

Now let's try a command to see if everything got set up right.

`git branch -vv`

I get the following:
```
* master e26bb97 [origin/master] Add README-science.md to personal fork for science!
```

This reflects a file I added to a local repo I created fresh so I could write this article. I'll show you how to create that file, stage it, and commit it later. You can use `git brand -v` instead of `git branch -vv` for a less verbose output, but I like having all the sources listed. Try both and see what you prefer.

## Your first addition!

1. `cp README.md README-science.md`

2. `git status`

3. `git add README-science.md`

4. `git commit -m "Add README-science.md to personal fork for science!"`

5. `git push`

And that's it!

You can send a pull request upstream to ask people in charge of the main project to consider merging it. I don't actually know how to do this through the command line, but [GitHub's own pull request interface](https://help.github.com/articles/about-pull-requests/) is very good. Please do review existing documentation to get a sense for the appropriate style, at least until someone writes a style guide.

## Updating

Eventually, your personal fork will be out of date with the main thing. Names will vary by project, but this works for your fork of Mastodon's documentation. Resolving conflicts is something the documentation will cover, but this should work unless you've changed pre-existing files without having them merged upstream.

1. `git fetch tootsuite`

2. `git merge remotes/tootsuite/master`

3. `git push`