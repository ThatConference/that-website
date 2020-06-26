# THAT Contributor

Your detailed guide to contributing the THAT Website. 🌲🌲

## Getting Started

## Building components

### Storybook

To help wrangle the growing list of shared components we are using [Storybook](https://storybook.js.org/) to build out the visual library we can use to not only validate our components but to remember what we built.

We currently do not have a deployed version of Storybook but you can check it out all day long locally. From within the project at a terminal prompt run: `npm run storybook` This will launch THAT Storybook on [http://localhost:6006/](http://localhost:6006/) where you explore all the shared components.

**_NOTE_**: This library is a current on-going effort to build out. We'd love for you to jump in and help! Check out our [THAT Storybook project](https://github.com/ThatConference/that-website/projects/2) with more detail steps on getting involved.

### Testing

We have [Jest](https://jestjs.io/) baked in as our testing framework.

**_NOTE_**: We are working to fill in specs for our components as part of our [THAT Storybook project](https://github.com/ThatConference/that-website/projects/2). See something missing or want to join in the fun? Yeah you do, follow the notes in the project to get started!

## Submitting Pull Requests

## Markdown

We are using markdown to render blog posts as well as basic interior pages that have little unique design, no forms or data interaction or need to render a React component.

### Adding A Blog Post

All blog posts are rendered markdown content. Each blog post has it's own file in `/markdown/blog` with some front matter we use to help build the blog index page and help build some SEO goodness into it.

To add a blog post all you need to do is create a new markdown file in `/markdown/blog` with a unique name, set the front matter items for:

All fields are required in a blog post's front matter

- **title** The title of the blog post
- **description** A short descriptiong describing the blog post
- **leadImage** Hero image to show with blog, image name only. Store image at `/public/images/blog`
- **publishedDate** Displayed publish date of blog poost
- **author** Who wrote the blog post, e.g. THAT Crew, You!
- **excerpt** A short excerpt from the blog's body. Keep to less than 400 characters

You will then need to add your page to the blog index at `/pages/blog.js` but simply adding a call to render a new instance of `BlogListItem` with the slug (**file name**) of your post. Example: `<BlogListItem slug="my-new-super-awesome-post" />` for a blog post with the filename of `/markdown/blog/my-new-super-awesome-post.md`.

The root page `/` has a blog reference section for the latest post. Update this section with the `slug` of the new blog post.

### Adding Markdown Pages

We are using dynamic routing to render markdown files. Within `/pages/wi` you will see a file `[markdown].js`. Within Next, it will first try to find a matching page file for the path being rendered. If no page file found it will render `[markdown].js`.

Within `[markdown].js`, the `getInitialProps` method catches if no markdown file exists to be rendered. If no file, then the error component will render. If there is a markdown file that exists it will be rendered.

#### Front Matter

The front matter for the markdown is the attributes that define, or we need to render the page. Within `copyright.md` you will see we include `title` and `description`. Currently we are only using `title` to set the title of the page, and should be included in all markdown files added.

This area can be extended to add other front matter attributes we want to track for the page. Possibly a date, variables, if published, etc. We have yet to extend into those uses, but the base is built to support that as we grow out this functionality.

#### Using Variables Within Markdown

Some pages rendered using markdown will require dynamic data. `[markdown].js` is configured to pull some sample data from graph to create an object to variables data that can be added to the markdown file. For example, we query for event name within `[markdown].js`. To use the event name within a markdown file you simply need to use `event_name` within the text, then during the render that will be replaced with the actual value.

It is built in such a way that we can expand the query to return more values. We can also extend the logic to add custom variables, or maybe even add the ability to set within the front matter attirubutes.
