export const RegularExpressions = {
  phoneRegExp: /^\+[1-9]\d{1,14}$/,
  // prettier-ignore
  urlRegExp: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
};

export const IsValidUrl = url => {
  const regEx = new RegExp(RegularExpressions.urlRegExp);
  return regEx.test(url);
};

export default { RegularExpressions, IsValidUrl };
