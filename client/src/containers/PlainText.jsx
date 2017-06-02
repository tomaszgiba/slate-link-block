import { Editor, Raw } from 'slate'
import React from 'react'
import { observer } from 'mobx-react'
import LinkBlockDecorator from '../decorators/LinkBlockDecorator.jsx'
import store from '../stores/LinkBlockStore.jsx';
import initialState from '../state.json';
import isUrl from 'is-url-superb';

function render(props) {
  let text = props.node.text;
  let href = text;

  store.discoverLink(href);

  return new LinkBlockDecorator(href, props, store).decorate();
}

const schema = {
  nodes: {
    paragraph: props => <p>{props.children}</p>,
    link: (props) => {
      const { data } = props.node;
      const href = data.get('href');

      store.discoverLink(href);

      return new LinkBlockDecorator(href, props, store).decorate();
    },
  },
  rules: [{
    match: (object) => { return isUrl(object.text); },
    render
  }]
};

@observer
export default class PlainText extends React.Component {

  constructor() {
    super();

    this.state = {
      state: Raw.deserialize(initialState, { terse: true })
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState({ state });
  };

  render() {
    return (
      <div>
        <Editor
            schema={schema}
            placeholder={'Enter some plain text...'}
            state={this.state.state}
            onChange={this.onChange}
        />
      </div>
    )
  };
}
