import { observable } from 'mobx';

class DiscoveredLink {
  @observable url = '';
  @observable meta;

  constructor (val) {
    this.url = val;

    this.discover();
  }

  discover() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `/api/discover_link?link=${this.url}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.meta = xhr.response;
      }
    });
    xhr.send();
  }
}

class SlateStore {
  @observable links = [];

  getLink(link) {
    return this.links.filter(l => l.url === link)[0]
  }

  discoverLink(link) {
    if(link === undefined) throw Error('Undefined link');
    if(this.getLink(link)) return;
    this.links.push(new DiscoveredLink(link));
  }
}

let store = window.store = new SlateStore;

export default store;
