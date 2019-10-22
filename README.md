# THATConference.com

## File Organization
The `pages` directory contains a file for each page of the site. 

`components` directory is where you will find all compoenents used across all pages. `shared` contains components used across multiple pages. 

Any components specific to a page are grouped together in the same folder. 

If a component has sub-components it conludes (i.e. footer) all of those components will be within the same folder. 


## Tests
We utilize Jest + Enzyme to unit test each component. Each component should be covered with a spec to ensure it renders without error as well any additional functions that component relies on to render correctly. 
