import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// style
import './App.css';
import './global.css';

// components
import Nav from './Components/Nav';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

const api = 'http://localhost:5000/api';

class App extends Component {
  state = {
    courses: []
  }

  // helper function for retrieving data
  runFetch = (path, callback, method="GET") => {
    fetch(`${api}/${path}`, {method: method}).then(response => {
      response.json().then(data => {
        callback(data);
      });
    });
  }

  componentDidMount() {
    // get courses and put them into state
    this.runFetch('courses', data => {
      this.setState({courses: data});
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
              <Route exact path="/" render={() => <Courses courses={this.state.courses}/>} />
              {/* View Course Detail */}
              <Route path="/courses/:id" render={({match}) => <CourseDetail courseId={match.params.id} runFetch={this.runFetch} />} />
              {/* Update Course */}
              {/* Create Course */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
