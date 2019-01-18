function formatError(error) {
  return `[ember-cli-airbrake] reported error: "${error.message}"`;
}

export default function reportNotice(notice) {
  notice.errors.forEach(error => window.console.error(formatError(error)));
}
