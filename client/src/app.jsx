import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PlainText from './containers/PlainText.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const ReactApp = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <BrowserRouter>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <PlainText />
              </div>
            </div>
            <br/>
          </div>

        </div>

      </BrowserRouter>
    </MuiThemeProvider>
);

ReactDom.render(<ReactApp />, document.getElementById('react-app'));
