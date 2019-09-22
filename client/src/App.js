import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Base64} from 'js-base64';

// style
import './App.css';
import './global.css';
import './custom.css';

// components
import Nav from './Components/Nav';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/SignIn';

const api = 'http://localhost:5000/api';

class App extends Component {
  state = {
    courses: [],
    email: '',
    password: ''
  }

  // helper function for retrieving data
  runFetch = (path, callback, method="GET", headers={}) => {
    fetch(`${api}/${path}`, {method: method, headers: new Headers(headers)}).then(response => {
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

  // return an authorization header
  authHeader = (email, password) => {
    const authString = Base64.encode(`${email}:${password}`);
    return {
      "Authorization": `Basic ${authString}`
    }
  }

  // sign in a user
  signIn = (email, password) => {
    this.runFetch('users', data => {
      this.setState({
        email: email,
        password: data.password
      });
    }, "GET", this.authHeader(email, password));
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
              {/* Sign In */}
              <Route path="/sign-in" render={() => <UserSignIn signIn={this.signIn} />} />
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
