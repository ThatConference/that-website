# THAT Contributor
Your detailed guide to contributing the THAT Website. 🌲🌲

## Getting Started

## Submitting Pull Requests

## Markdown

We are using markdown to render basic interior pages that have little unique design, no forms or data interaction or need to render a React component. 

### Adding Markdown Pages

We are using dynamic routing to render markdown files. Within `/pages/wi` you will see a file `[markdown].js`. Within Next, it will first try to find a matching page file for the path being rendered. If no page file found it will render `[markdown].js`. 

Within `[markdown].js`, the `getInitialProps` method catches if no markdown file exists to be rendered. If no file, then the error component will render. If there is a markdown file that exists it will be rendered. 

### Front Matter

The front matter for the markdown is the attributes that define, or we need to render the page. Within `copyright.md` you will see we include `title` and `description`. Currently we are only using `title` to set the title of the page, and shoudl be included in all markdown files added. 

This area can be extended to add other front matter attributes we want to track for the page. Possibly a date, variables, if published, etc. We have yet to extend into those uses, but the base is built to support that as we grow out this functionality. 

### Using Variables Within Markdown

Some pages rendered using markdown will require dynamic data. `[markdown].js` is configured to pull some sample data from graph to create an object to variables data that can be added to the markdown file. For example, we query for event name within `[markdown].js`. To use the event name within a markdown file you simply need to use `event_name` within the text, then during the render that will be replaced with the actual value. 

It is built in such a way that we can expand the query to return more values. We can also extend the logic to add custom variables, or maybe even add the ability to set within the front matter attirubutes. 