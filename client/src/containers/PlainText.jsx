import { Editor, Raw } from 'slate'
import React from 'react'
import { observer } from 'mobx-react'
import LinkBlockDecorator from '../decorators/LinkBlockDecorator.jsx'
import store from '../stores/LinkBlockStore.jsx';
import initialState from '../state.json';
import isUrl from 'is-url-superb';

const schema = {
  nodes: {
    paragraph: props => <p>{props.children}</p>,
    link: (props) => {
      const { data } = props.node;
      const href = data.get('href');

      store.discoverLink(href);

      return new LinkBlockDecorator(href, props, store).decorate();
    },
  }
};

@observer
export default class PlainText extends React.Component {

  constructor() {
    super();

    this.state = {
      state: Raw.deserialize(initialState, { terse: true })
    };

    this.onChange = this.onChange.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  onChange(state) {
    this.setState({ state });
  };

  onPaste(e, data, state) {
    if(!isUrl(data.text)) return;

    return state
        .transform()
        .insertBlock({
          type: 'link',
          data: { href: data.text },
          nodes: [
            {
              type: 'inline',
              kind: 'text',
              ranges: [
                {
                  text: data.text
                }
              ]
            }
          ]
        }).apply();
  };

  render() {
    return (
      <div>
        <Editor
            schema={schema}
            placeholder={'Enter some plain text...'}
            state={this.state.state}
            onChange={this.onChange}
            onPaste={this.onPaste}
        />
      </div>
    )
  };
}
