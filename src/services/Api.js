import host from './host';

export default class Api {
  static makeCall(options, cb) {
    const {
      method, path, qs, body,
    } = options;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const responseType = xhr.getResponseHeader('content-type');
        if (responseType && responseType.includes('application/json')) {
          cb(JSON.parse(xhr.responseText));
        } else {
          cb(xhr.responseText);
        }
      }
    });

    const url = `${host}/${path}${qs ? `?${qs}` : ''}`;

    xhr.open(method, url);
    if (method !== 'GET') {
      if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    } else {
      xhr.send();
    }
  }

  static listNotes(cb) {
    this.makeCall({ method: 'GET', path: 'notes' }, cb);
  }

  static addNote(content, cb) {
    this.makeCall({ method: 'POST', path: 'notes', body: { content } }, cb);
  }

  static deleteNote(id, cb) {
    this.makeCall({ method: 'DELETE', path: `notes/${id}` }, cb);
  }
}
