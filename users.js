function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/) && username.length <= 20;
  return isValid;
}

module.exports = {
  isValidUsername
};