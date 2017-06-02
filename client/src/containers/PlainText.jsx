import { Editor, Plain, Html, Raw } from 'slate'
import React from 'react'
import { observer } from 'mobx-react'
import LinkBlock from './LinkBlock.jsx'
const linkExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
import store from '../stores/LinkBlockStore.jsx';
import initialState from '../state.json';

const RULES = [];

@observer
export default class PlainText extends React.Component {

  constructor() {
    super();

    this.serializer = new Html({ rules: RULES });

    this.state = {
      state: Raw.deserialize(initialState, { terse: true })
    };

    this.onChange = this.onChange.bind(this);
  }

  onPaste(e, data, state) {

  };

  onChange(state) {
    this.setState({ state });
  };

  render() {

    return (
      <div>
        <LinkBlock store={store} url="www.github.com"/>
        <LinkBlock store={store} url="www.wp.pl"/>
        <LinkBlock store={store} url="www.youtube.com"/>
        <Editor
            placeholder={'Enter some plain text...'}
            state={this.state.state}
            onChange={this.onChange}
            // onPaste={this.onPaste}
        />
      </div>
    )
  };
}
