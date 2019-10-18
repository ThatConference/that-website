export const GA_TRACKING_ID = 'UA-106588977-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

/*
  If we wanted to submit an event we could just...

  gtag.event({
    action: 'submit_form',
    category: 'Contact',
    label: this.state.message
  })
*/
