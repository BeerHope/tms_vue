export const getLanguage = function() {
  const language = navigator.language || navigator.userLanguage;
  return language.substr(0, 2);
};
