import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WysiwygMultiupload from './components/wysiwyg_multiupload';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WysiwygMultiupload} />
      </Switch>
    </Router>
  );
}

export default App;