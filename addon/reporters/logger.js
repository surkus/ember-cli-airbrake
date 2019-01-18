import { Logger } from '@ember';

function formatError(error) {
  return `[ember-cli-airbrake] reported error: "${error.message}"`;
}

export default function reportNotice(notice) {
  notice.errors.forEach(error => Logger.error(formatError(error)));
}
