![Mastodon](https://i.imgur.com/NhZc40l.png)
===

# Doc site

This is the documentation site for the federated social network Mastodon.
View the live version at <https://docs.joinmastodon.org>.
The doc site, docs.joinmastodon.org, is made using the static-site generator Hugo.
Clone tootsuite/documentation and install Hugo to begin contributing.

# Getting started

Install [Hugo](https://gohugo.io/) and clone the repository to get started.

## Install Hugo

### Linux

For Debian based distributions, such as Ubuntu, use apt to install Hugo:

```bash
sudo apt-get install hugo
```

### MacOS

Use Homebrew to install Hugo:

```bash
brew install hugo
```
### Windows

Windows users may choose from [Chocolatey](https://chocolatey.org/):

```
choco install hugo -confirm
```

``` 
scoop install hugo
```

## Run Hugo server 

The easiest way to view the final product as you document is to run:

```bash
hugo server
```

This will launch a Hugo server that will dynamically rebuild based on [published pages](#publish-pages).
Use the ``-D`` flag to view drafts and unpublished changes as we write and design. 

```bash
hugo server -D
```

**Note:**

Some changes may take longer or require you to enable Slow Render Mode:

```bash
hugo server --disableFastRender
```

## Content

All content is written in GitHub flavored Markdown. 
See https://github.github.com/gfm/ for more information.
Every page begins with a TOML header that is generated through Hugo.
*Using Hugo to generate a new page is strongly recommend to ensure that the TOML header includes required information.*

### Directory structure

All content rendered by Hugo is stored under the content/ folder.
*For English*, all content is stored under content/en/.
For details on content organization, see [Content Organization](https://gohugo.io/content-management/organization/) on the https://gohugo.io  site.

### Add a page

Do not simply add a file, instead generate a file to edit using Hugo:

In the site's root directory run 

```bash
hugo new [Path and filename].md
```

This will create a new file and folder (if no folder was present).

**Example:**

```bash
$ hugo new posts/test.md
content/en/posts/test.md created
```

Once the page is created, you can begin to write by opening the newly created file in your favorite text editor.

### Editing a page

Editing is much more simple, simply find the existing file and make changes in your text editor.
To review your changes, ensure that you have the [Hugo server running](#run-hugo-server).

### Publish pages

Hugo determines draft state in its meta header.

```
---
title: "Test"
date: YYYY-MM-DD 
draft: true
---

```
The ``draft`` boolean determines  draft state.
If ``draft`` is ``true`` then the page will not display be default with the standard ``hugo server`` command.
Drafts may be viewed by running ``hugo server -D``.
To publish a draft, set ``draft`` to ``false``.


