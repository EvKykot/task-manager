import {browserHistory} from 'react-router';

/**
 *
 */
export function openAuthPage() {
  browserHistory.push('/auth');
}

/**
 *
 */
export function reloadLocation(path) {
  browserHistory.push('/');
  browserHistory.push(path);
}

/**
 *
 */
export function openPath(path) {
  browserHistory.push(path);
}
