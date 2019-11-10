# THATConference.com

## Contributing

### Table of Contents

1. Types of contributions we are looking for
2. Ground rules and expectations
3. How to contribute
4. Style guide
5. Setting up your environment
6. Community

#### 1. Types of contributions we are looking for

There are many ways you can contibute, here are just some of the broader items we love to have help from the community on:

- Find a bug, report a bug... if/when you find something please let us know! We cound om your eyes to spot things we miss. Open an issue and will will follow up and prioritize.
- Grab an issue to fix. See an open issue you would like to tackle? Go for it! Assign yourself the issue and get started.
- Review open pull requests. If there an an open PR of changes, review it! Eyes anbd feedback on incoming work is appreciated by all!

#### 2. Ground rules and expectations

Before we get started, here are a few things we expect from you (and that you should expect from others):

- Be kind and thoughtful in your conversations around this project. We all come from different backgrounds and projects, which means we likely have different perspectives on "how open source is done." Try to listen to others rather than convince them that your way is correct.
- THAT Conference has a released Code of Conduct. By participating in this project, you agree to abide by its terms.
- If you open a pull request, please ensure that your contribution passes all tests. If there are test failures, you will need to address them before we can merge your contribution.

#### 3. How to contribute

The best place to start is the open issues. Any ones we feel are a greate first step into the code base we have labeled as `good first issue`. But don't feel limited to just those issues. Any open issue is up for grabs to be worked on.

Find one you would be interested working on, assign yourself and get started! Once complete open a pull request and label as `ready for review`. Want to pull more communtoy in? Yeah you do! Mention in THAT Slack or on the socials that you have a PR that neesds to be reviewed. We love havimg community involvement across the entire flow.

Once your PR is reviewed and the specs pass, THAT Crew will give me one last run through and merge.

#### 4. Style Guide

_Coming soon_

#### 5. Setting up your environment

THAT website is server-side rendered React via Next. To get started, clone the repo and run `npm install` to get all the dependencies in place. Run `cp .env.sample .env` to get basic configuraiton in place, and then `now dev` to startup `localhost`.

#### 6. Community

THAT is all about community. It was bringing the community together that inspired the creation of THAT Conference. Participating in the development of our website is a way for us to extend our community.

Assume good intentions. Keep discussions within issues and pull requrests so all can particiapte.

## File Organization

The `pages` directory contains a file for each page of the site.

`components` directory is where you will find all compoenents used across all pages. `shared` contains components used across multiple pages.

Any components specific to a page are grouped together in the same folder.

If a component has sub-components it conludes (i.e. footer) all of those components will be within the same folder.

## Styles

THAT Website utilizes `styled-components`. `1rem` = `10px`

## Tests

We utilize Jest + Enzyme to unit test each component. Each component should be covered with a spec to ensure it renders without error as well any additional functions that component relies on to render correctly.
