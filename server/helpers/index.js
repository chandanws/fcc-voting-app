exports.decodeJWT = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("-", "/");
  return JSON.parse(window.atob(base64));
};
