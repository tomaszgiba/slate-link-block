import LinkBlock from '../containers/LinkBlock.jsx'
import React from 'react'

/*
 * We have to serialize React Component to be able to inject it into Slate's state
 * */
export default class LinkBlockDecorator {

  constructor(url, props, store) {
    this.url = url;
    this.store = store;
    this.props = props;
  }

  decorate() {
    this.store.discoverLink(this.url);

    const link = this.store.getLink(this.url);

    if(link && link.meta) {
      return <LinkBlock {...this.props.attributes} href={this.url} link={link}>{this.props.children}</LinkBlock>
    } else {
      return <a {...this.props.attributes} href={this.url}>{this.props.children}</a>
    }
  }
}