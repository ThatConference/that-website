// eslint-disable-next-line import/prefer-default-export
export const sessionConstants = {
  SessionFor: {
    PROFESSIONAL: 'Professionals',
    FAMILY: 'Family',
  },

  SessionType: {
    REGULAR: 'Regular session (60 minute talk)',
    KEYNOTE: 'Keynote (90 minute talk)',
    HALF_DAY_WORKSHOP: 'Half-day Workshop (pre-conference)',
    FULL_DAY_WORKSHOP: 'Full-day Workshop (pre-conference)',
  },

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
    { value: 'TOOLING', label: 'Tooliing' },
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
};
