import * as Yup from 'yup';
import { RegularExpressions } from './validation';

export const placeHolderImageUrl =
  'https://images.that.tech/members/person-placeholder.jpg';

// eslint-disable-next-line import/prefer-default-export
export const sessionConstants = {
  SessionFors: [
    { value: 'PROFESSIONAL', label: 'Professionals' },
    { value: 'FAMILY', label: 'Family' },
  ],

  SessionTypes: [
    { value: 'REGULAR', label: 'Regular session (60 minute talk)' },
    { value: 'KEYNOTE', label: 'Keynote (90 minute talk)' },
    { value: 'HALF_DAY_WORKSHOP', label: 'Half-day Workshop (pre-conference)' },
    { value: 'FULL_DAY_WORKSHOP', label: 'Full-day Workshop (pre-conference)' },
    { value: 'WORKSHOP', label: 'Workshop (pre-conference)' },
    { value: 'OPEN_SPACE', label: 'Open Space session' },
    { value: 'PANEL', label: 'Panel session' },
  ],

  SessionCategories: [
    { value: 'ACCESSIBILITY', label: 'Accessibility' },
    { value: 'ARCHITECTURE', label: 'Architecture' },
    { value: 'AR_VR', label: 'AR/VR' },
    { value: 'CLOUD_COMPUTING', label: 'Cloud' },
    { value: 'DATABASE_STORAGE', label: 'Database/Storage' },
    { value: 'DESIGN_UX', label: 'Design/UX' },
    { value: 'DEV_OPS', label: 'DevOps' },
    { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
    { value: 'IOT_MAKER', label: 'IoT/Maker' },
    { value: 'LANGUAGES', label: 'Languages' },
    { value: 'MACHINE_LEARNING', label: 'Machine Learning' },
    { value: 'MOBILE', label: 'Mobile' },
    { value: 'PRODUCT_MANAGEMENT', label: 'Product Management' },
    { value: 'SOFT_SKILLS', label: 'Soft Skills' },
    { value: 'SECURITY', label: 'Security' },
    { value: 'TESTING', label: 'Testing' },
    { value: 'TOOLING', label: 'Tooling' },
    { value: 'USER_INTERFACES', label: 'UI' },
    { value: 'WEB', label: 'Web' },
    { value: 'OTHER', label: "You Can't Put a Label on Me" },
  ],

  SessionAudiences: [
    { value: 'ANYBODY', label: 'Anybody' },
    { value: 'DEVELOPERS', label: 'Developers' },
    { value: 'MANAGERS', label: 'Managers' },
  ],

  SessionMentorshipLevels: [
    { value: 'NO', label: "None, I've got this" },
    { value: 'SOME', label: 'Some would be good' },
    { value: 'YES', label: 'All I can get' },
  ],

  SessionStatuses: [
    { value: 'DRAFT', label: 'Draft' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'NOT_ACCEPTED', label: 'Not Accepted' },
    { value: 'WITHDREW', label: 'Withdrew' },
    { value: 'WAIT_LIST', label: 'Wait List' },
    { value: 'CANCELLED', label: 'Canceled' },
    { value: 'SCHEDULED', label: 'Scheduled' },
    { value: 'ARCHIVED', label: 'Archived' },
  ],

  sessionValidations: {
    intro: {
      title: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      audience: Yup.string().required('Selection required'),
      sessionType: Yup.string().required('Selection required'),
    },
    details: {
      shortDescription: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      longDescription: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      primaryCategory: Yup.string().required('Required'),
      secondaryCategories: Yup.array().nullable(),
      targetAudiences: Yup.array()
        .required('At least one is required')
        .nullable(),
      supportingArtifacts: Yup.array(),
    },
    additionalInfo: {
      takeaways: Yup.array().min(1, 'At least 1 is required'),
    },
    lastly: {
      agreeToBeingRecorded: Yup.bool(),
      mentorshipLevel: Yup.string().required('Required'),
      whyAreYouBestPerson: Yup.string().required('Required'),
      whatElseShouldWeKnow: Yup.string(),
    },
  },
};

export const memberConstants = {
  // commented out some links until we get icons
  linkTypes: {
    // devTo: "DEV_TO",
    // dribbble: "DRIBBBLE",
    facebook: 'FACEBOOK',
    github: 'GITHUB',
    instagram: 'INSTAGRAM',
    linkedin: 'LINKEDIN',
    medium: 'MEDIUM',
    // stackOverflow: "STACK_OVERFLOW",
    // tictok: "TICTOK",
    // twitch: "TWITCH",
    twitter: 'TWITTER',
    website: 'WEBSITE',
    youtube: 'YOUTUBE',
  },

  validationRules: {
    createOnly: {
      acceptedCodeOfConduct: Yup.bool().oneOf(
        [true],
        'Must agree to the Code of Conduct',
      ),
      acceptedTermsOfService: Yup.bool().oneOf(
        [true],
        'Must agree to the Terms of Use',
      ),
      isOver13: Yup.bool().oneOf([true], 'Must be over 13'),
    },
    contactInfo: {
      city: Yup.string().nullable(),
      company: Yup.string().nullable(),
      firstName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string().nullable(),
      jobTitle: Yup.string().nullable(),
      lastName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
      mobilePhone: Yup.string()
        .matches(RegularExpressions.phoneRegExp, 'Phone number is not valid')
        .nullable(),
      profileSlug: Yup.string().required('Required'),
      state: Yup.string().nullable(),
    },
    onlinePresence: {
      facebook: Yup.string().url('Invalid URL'),
      github: Yup.string().url('Invalid URL'),
      instagram: Yup.string().url('Invalid URL'),
      linkedin: Yup.string().url('Invalid URL'),
      thatSlackUsername: Yup.string().nullable(),
      twitter: Yup.string().url('Invalid URL'),
      website: Yup.string().url('Invalid URL'),
    },
    image: {
      profileImage: Yup.mixed().when('canFeature', {
        is: true,
        then: Yup.mixed().required(),
      }),
    },
    bio: {
      bio: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .when('canFeature', {
          is: true,
          then: Yup.string().required(),
        }),
    },
  },
};

export const socialConstants = {
  thatSocialLinks: Object.freeze({
    facebook: {
      url: 'https://www.facebook.com/THATconference/',
      description: 'Latest news, announcements and happenings',
    },
    instagram: {
      url: 'https://www.instagram.com/THATconference/',
      description: "Who doesn't love seeing pics of all THAT goodness!",
    },
    twitter: {
      url: 'https://twitter.com/THATconference',
      description: 'Latest news, announcements and happenings',
    },
    medium: {
      url: 'https://medium.com/THAT-conference',
      description: 'Amazing articles written by members of THAT Community',
    },
    youtube: {
      url: 'https://www.youtube.com/THATconference/',
      description:
        'All of our past recordings, live broadcasts and THAT Conference keynotes',
    },
    flickr: {
      url: 'https://www.flickr.com/photos/THATconference/',
      description: 'Pics of all past THAT Conferences. We mean, all.the.pics.',
    },
    linkedin: {
      url: 'https://www.linkedin.com/company/THAT-conference',
      description: 'Where we connect to all our community and partners',
    },
    github: {
      url: 'https://github.com/THATconference',
      description: 'Our platform is open source and we love contributors!',
    },
    twitch: {
      url: 'https://that.live',
      description: 'Watch us LIVE every Mon + Wed @ 12pm Central',
    },
  }),

  socialIcons: {
    facebook: {
      icon: {
        name: 'facebook',
        width: 12,
        height: 24,
      },
      className: 'is-bigger',
    },
    flickr: {
      icon: {
        name: 'flickr',
        width: 35,
        height: 17,
      },
    },
    github: {
      icon: {
        name: 'github',
        width: 24,
        height: 24,
      },
      className: 'is-round',
    },
    instagram: {
      icon: {
        name: 'instagram',
        width: 24,
        height: 24,
      },
      className: 'is-bigger',
    },
    linkedin: {
      icon: {
        name: 'linkedin',
        width: 24,
        height: 24,
      },
    },
    medium: {
      icon: {
        name: 'medium',
        width: 24,
        height: 19,
      },
    },
    twitch: {
      icon: {
        name: 'twitch',
        width: 52,
        height: 52,
      },
      className: 'is-bigger',
    },
    twitter: {
      icon: {
        name: 'twitter',
        width: 32,
        height: 26,
      },
    },
    youtube: {
      icon: {
        name: 'youtube',
        width: 90,
        height: 63,
      },
    },
  },
};

export default { sessionConstants, memberConstants, socialConstants };
