# Git the Gists

This is an outlook add-in which helps user to insert code snippets from a github user's public gists into their componse email. This is based on the [Tutorial: Build a message compose Outlook add-in](https://learn.microsoft.com/en-us/office/dev/add-ins/tutorials/outlook-tutorial) from Microsoft Learn. In the original article, the app was implemented in Vanilla JS, but this repository implements the add-in in Angular.

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/en) which includes [Node Package Manager](https://docs.npmjs.com/getting-started)

### Install dependencies

- Run the following command in the root directory.

  ```
  npm install
  ```

### Test the add-in

- Run the following command in the root directory. When you run this command, the local web server starts.

  ```
  npm run start:ssl
  ```

- Install `git-the-gist-manifest.xml` into _My Add-ins > Custom Add-ins_ in Outlook.

- Click on the New Mail in Outlook and locate _Git the Gists (Local)_ in the Add-ins tab. Click on it and select _Insert gist_. Configure the GitHub username and default gist from the '⚙️' icon. Note that the GitHub username you select must have some public [gits](https://gist.github.com/). For testing, you can add my GitHub username, `MzMahmud`, which has some public gists.
