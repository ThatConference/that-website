import { useRouter } from 'next/router';

/* eslint-disable no-bitwise */
export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSlug = () => {
  const router = useRouter();
  // Note: this assumes all events share the same pattern for slugs
  return router.pathname.match(/\/(.*\/.{4})\//)[1];
};

export default { generateUuid };
