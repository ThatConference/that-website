# THATConference.com

## Contributing

[![GitHub issues open](https://img.shields.io/github/issues/thatconference/that-website.svg)](https://github.com/thatconference/that-website/issues) [![release](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/thatconference/that.us/issues)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

### Table of Contents

1. Types of contributions we are looking for
2. Ground rules and expectations
3. How to contribute
4. Style guide
5. Setting up your environment  
   5b. Vercel/Zeit linked project setup
6. Community

#### 1. Types of contributions we are looking for

There are many ways you can contribute, here are just some of the broader items we love to have help from the community on:

- Find a bug, report a bug...
  - if/when you find something please let us know! We count on your eyes to spot things we miss. Open an [issue](https://github.com/ThatConference/that-website/issues) and will will follow up and prioritize.
- Grab an [issue](https://github.com/ThatConference/that-website/issues) to fix.
  - See an open issue you would like to tackle? Go for it! Assign yourself the issue and get started.
- Review open [pull](https://github.com/ThatConference/that-website/pulls) requests.
  - If there an an open PR of changes, review it! Eyes and feedback on incoming work is appreciated by all!

#### 2. Ground rules and expectations

Before we get started, here are a few things we expect from you (and that you should expect from others):

- Be kind and thoughtful in your conversations around this project. We all come from different backgrounds and projects, which means we likely have different perspectives on "how open source is done." Try to listen to others rather than convince them that your way is correct.
- THAT Conference has a released [Code of Conduct](https://www.thatconference.com/code-of-conduct). By participating in this project, you agree to abide by its terms.
- If you open a pull request, please ensure that your contribution passes all tests. If there are test failures, you will need to address them before we can merge your contribution.

#### 3. How to contribute

The best place to start is the open [issues](https://github.com/ThatConference/that-website/issues). Any ones we feel are a great first step into the code base we have labeled as `good first issue`. But don't feel limited to just those issues. Any open issue is up for grabs to be worked on.

Find one you would be interested working on, assign yourself and get started! Once complete open a pull request and label as `ready for review`. Want to pull more community in? Yeah you do! Mention in THAT Slack or on the socials that you have a PR that needs to be reviewed. We love having community involvement across the entire flow.

Once your PR is reviewed and the specs pass, THAT Crew will give me one last run through and merge.

#### 4. Style Guide

_Coming soon_

#### 5. Setting up your environment

THAT website is server-side rendered React via [Nextjs](https://nextjs.org/). To get started, clone the repo and run `npm install` to get all the dependencies in place. Also run `npm i -g now@16.7.3` to install [Zeit Now](https://zeit.co/docs) globally on your machine.
Note: The 17.\*+ version of Zeit Now introduced project linking and is currently problematic. A possible work-around has been added in section **5b** if you would like to try that with the latest version of Zeit now/Vercel.

If you are experiencing http **404 errors** on dynamic pages, e.g. blog posts, user profiles, etc. this is probably do to an issue with Zeit Now cli. the command `now dev` isn't redering dynamic pages correctly on version 16.7 any longer. As a work-around use `npm run dev`, which uses next to run your the site locally on the same port, `3000`. Be aware that while running the site using `npm run dev` local api function calls do not work at this time (e.g. /api/me).

If you are on a mac, it is helpful to make sure Xcode and Xcode command line tools are up to date.

Run `cp .env.sample .env && cp .env.build.sample .env.build` to get basic configuration in place.

If you have previously setup your environment, make sure that all keys from `.env.sample` and `.env.build.sample` are present in your `.env` and `.env.build` files. New entries may have been added and need to be present for this to run for you.

Edit the .env.build file:

- `DEBUG=that:*`
- `SESSION_COOKIE_SECRET` requires at least a 32 character value.
- `API_GATEWAY` should be `https://api.that.tech`

Edit the .env file, adding

- `DEBUG=that:*`
- `SESSION_COOKIE_SECRET` requires at least a 32 character value.
- `API_GATEWAY=https://api.that.tech`

After you edit those files, run `now dev` to startup `localhost`.

#### 5b. Vercel/Zeit linked project setup

As mentioned in section 5 the Zeit/Vercel cli from version 17 and above requires project linking to work correctly. The instructions in this section walk through one way you can configure this locally so you may use newer versions. These instructions were tested with Vercel/Now cli version 19.0.1. In April 2020 Zeit changed it's name to Vercel, so the term `vercel` will be used going forward. Read [here](https://vercel.com/blog/zeit-is-now-vercel) for more information about this change.

**Assumptions:** These instructions assume that you currently don't have a Vercel account or project to point to for that-website. You will not need to deploy any code to Vercel, the account is only needed for project linking, a confusing feature/requirement of the Vercel cli.

1. [Create](https://vercel.com/signup) a Vercel account
1. [Install](https://vercel.com/download) the Vercel CLI
1. Clone [that-website](https://github.com/ThatConference/that-website) to your local computer

At this point ensure you're in the cloned that-website directory

1. Login to Vercel cli: `$ vercel login`
1. Setup vercel project for linking by running: `$ vercel`
   - Setup and deploy 'your current directory', **Y**
   - Select scope (if you have more than one vercel account/team)
   - Link to existing project? **N**
   - What is your project's name? (type some name to use, e.g. that-conference-com)
   - Which directory is code located? **./**
   - Overwrite build settings? **N**
1. At this point the deploy will fail (due to missing secrets), but we have the pieces we need to finish the link. So we go through this again:
1. Again run, `$ vercel`
   - Set up and deploy 'current directory' **Y**
   - Select scope, if needed
   - Link to existing project? **Y** (THIS IS IMPORTANT!)
   - What is the name of existing project? (Using the name created above, e.g. that-conference-com)
   - **Link is created by cli at this point**
   - Overwrite build settings? **N**
1. Again at this point the deployment will fail due to missing set secrets.

Yes this is ugly, but we are now ready to develop locally. Vercel cli has the project link it needs to run the code locally. To develop locally run:

`$ vercel dev`  
or  
`$ vc dev`

**So what was created?** The cli added a new folder, `.vercel` to the that-website project directory. The name `.vercel` is in `.gitignore` and should NOT be committed to the repository. It is unique to your local environment. This should be all that is needed to get working locally again. If you run into any troubles, please open an [issue](https://github.com/ThatConference/that-website/issues).

#### 6. Community

THAT is all about community. It was bringing the community together that inspired the creation of THAT Conference. Participating in the development of our website is a way for us to extend our community.

Assume good intentions. Keep discussions within issues and pull requests so all can participate.

## File Organization

The `pages` directory contains a file for each page of the site.

`components` directory is where you will find all components used across all pages. `shared` contains components used across multiple pages.

Any components specific to a page are grouped together in the same folder.

If a component has sub-components it concludes (i.e. footer) all of those components will be within the same folder.

## Styles

THAT Website utilizes `styled-components`. `1rem` = `10px`

## Tests

We utilize Jest + Enzyme to unit test each component. Each component should be covered with a spec to ensure it renders without error as well any additional functions that component relies on to render correctly.

## Feature/Page Development

In order to iterate collectivlely when developing a new page we have a higher order component you can wrap your page component around so that it is only rendered for a matching query param.

Here is how it works, in your `.env` file give `FEATURE_KEYWORD` some value. Then wrap your page componet (_NOTE: currently only works for pages_) in `togglePage`. This adds the logic that will allow this page to render **only when** a query param is present and matches the value set in `FEATURE_KEYWORD`.

Example - Check out `samples/toggle-page.js`. Here is a sample page wrapped in `togglePage`. Now, set FEATURE_KEYWORD in your `.env` to a value, let's go with `baconisgreat`, then fire up the local environment.

Go to: [http://localhost:3000/samples/toggle-page?feature=baconisgreat](http://localhost:3000/samples/toggle-page?feature=baconisgreat) and page will load.  
Go to: [http://localhost:3000/samples/toggle-page?feature=baconisgood](http://localhost:3000/samples/toggle-page?feature=baconisgood), page not found  
Go to: [http://localhost:3000/samples/toggle-page](http://localhost:3000/samples/toggle-page), page not found

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/saragibby"><img src="https://avatars1.githubusercontent.com/u/82035?v=4" width="100px;" alt=""/><br /><sub><b>Sara Gibbons</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=saragibby" title="Code">💻</a> <a href="#content-saragibby" title="Content">🖋</a> <a href="https://github.com/ThatConference/that-website/commits?author=saragibby" title="Documentation">📖</a> <a href="https://github.com/ThatConference/that-website/pulls?q=is%3Apr+reviewed-by%3Asaragibby" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://unspecified.io/"><img src="https://avatars1.githubusercontent.com/u/772569?v=4" width="100px;" alt=""/><br /><sub><b>Clark Sell</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=csell5" title="Code">💻</a> <a href="#maintenance-csell5" title="Maintenance">🚧</a> <a href="#content-csell5" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.dotnetdevdude.com/"><img src="https://avatars1.githubusercontent.com/u/590291?v=4" width="100px;" alt=""/><br /><sub><b>Keith Burnell</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=kburnell" title="Code">💻</a></td>
    <td align="center"><a href="http://blog.brettski.com/"><img src="https://avatars3.githubusercontent.com/u/473633?v=4" width="100px;" alt=""/><br /><sub><b>Brett Slaski</b></sub></a><br /><a href="#infra-brettski" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/ThatConference/that-website/commits?author=brettski" title="Code">💻</a> <a href="https://github.com/ThatConference/that-website/commits?author=brettski" title="Tests">⚠️</a> <a href="https://github.com/ThatConference/that-website/pulls?q=is%3Apr+reviewed-by%3Abrettski" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/zaudtke"><img src="https://avatars1.githubusercontent.com/u/1631560?v=4" width="100px;" alt=""/><br /><sub><b>Al</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/issues?q=author%3Azaudtke" title="Bug reports">🐛</a> <a href="https://github.com/ThatConference/that-website/commits?author=zaudtke" title="Tests">⚠️</a> <a href="https://github.com/ThatConference/that-website/commits?author=zaudtke" title="Code">💻</a></td>
    <td align="center"><a href="https://aaron.blog/"><img src="https://avatars1.githubusercontent.com/u/373903?v=4" width="100px;" alt=""/><br /><sub><b>Aaron Douglas</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=astralbodies" title="Tests">⚠️</a> <a href="https://github.com/ThatConference/that-website/issues?q=author%3Aastralbodies" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.jeana.dev/"><img src="https://avatars2.githubusercontent.com/u/194128?v=4" width="100px;" alt=""/><br /><sub><b>Jeana</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=tsidel" title="Tests">⚠️</a> <a href="https://github.com/ThatConference/that-website/commits?author=tsidel" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://leanpub.com/os-support"><img src="https://avatars3.githubusercontent.com/u/240650?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Hooker</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/issues?q=author%3AGeekOnCoffee" title="Bug reports">🐛</a> <a href="https://github.com/ThatConference/that-website/commits?author=GeekOnCoffee" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mcookWI"><img src="https://avatars0.githubusercontent.com/u/5367626?v=4" width="100px;" alt=""/><br /><sub><b>Mike</b></sub></a><br /><a href="https://github.com/ThatConference/that-website/commits?author=mcookWI" title="Tests">⚠️</a> <a href="https://github.com/ThatConference/that-website/issues?q=author%3AmcookWI" title="Bug reports">🐛</a> <a href="#content-mcookWI" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.brandonmartinez.com/"><img src="https://avatars3.githubusercontent.com/u/32435?v=4" width="100px;" alt=""/><br /><sub><b>Brandon Martinez</b></sub></a><br /><a href="#design-brandonmartinez" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
