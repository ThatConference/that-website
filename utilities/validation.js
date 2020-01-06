export const RegularExpressions = {
  phoneRegExp: /^\+[1-9]\d{1,14}$/,
  urlRegExp: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
};

export const IsValidUrl = url => {
  const regEx = new RegExp(RegularExpressions.urlRegExp);
  return regEx.test(url);
};

export default { RegularExpressions, IsValidUrl };
