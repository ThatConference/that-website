export const RegularExpressions = {
  phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  urlRegExp: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
};

export const IsValidUrl = url => {
  const regEx = new RegExp(RegularExpressions.urlRegExp);
  return regEx.test(url);
};

export default { RegularExpressions, IsValidUrl };
