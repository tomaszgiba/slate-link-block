import React, { Component } from 'react';

class LinkBlock extends Component {

  render() {
    const link = this.props.link;

    return (
      <a href={this.props.href}>
        <img src={link.meta.data.ogImage.url} width="30" />
        <b>{link.meta.data.ogTitle}</b><br/>
        {/*<i>{link.meta.data.ogDescription}</i>*/}
        {/*<a href={this.props.href}></a>*/}
      </a>
    );
  }
}

export default LinkBlock;