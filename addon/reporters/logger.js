function formatError(error) {
  return `[ember-cli-airbrake] reported error: "${error.message}"`;
}

export const logNotice =  function(notice) {
  notice.errors.forEach(error => window.console.error(formatError(error)));
}
