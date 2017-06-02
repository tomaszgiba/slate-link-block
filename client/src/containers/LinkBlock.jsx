import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer class LinkBlock extends Component {

  componentWillMount() {
    this.props.store.discoverLink(this.props.url);
  }

  render() {
    const store = this.props.store;
    const dl = store.getLink(this.props.url);

    return (
      dl.meta ?
        <div>
          <img src={dl.meta.data.ogImage.url} width="50" />
          <b>{dl.meta.data.ogTitle}</b><br/>
          <i>{dl.meta.data.ogDescription}</i>
        </div> : <a href={this.props.url}>{this.props.url}</a>);
  }
}

export default LinkBlock;