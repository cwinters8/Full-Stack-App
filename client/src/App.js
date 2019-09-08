import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// style
import './App.css';
import './global.css';

// components
import Nav from './Components/Nav';
import Courses from './Components/Courses';

const api = 'http://localhost:5000/api';

class App extends Component {
  runFetch = (query) => {
    fetch(`${api}/${query}`)
      .then(response => {
        response.json().then(data => {
          return data;
        });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Nav />
            <hr />
            <Switch>
              {/* Default Route */}
              <Route exact path="/" render={() => <Courses runFetch={this.runFetch}/>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
