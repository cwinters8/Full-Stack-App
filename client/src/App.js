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
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';

const api = 'http://localhost:5000/api';

class App extends Component {
  state = {
    courses: [],
    user: {}
  }

  // helper function for retrieving data
  runFetch = (path, callback, method="GET", headers={}) => {
    fetch(`${api}/${path}`, {method: method, headers: new Headers(headers)}).then(response => {
      response.json().then(data => {
        callback(data, response.status);
      });
    });
  }

  componentDidMount() {
    // get courses and put them into state
    this.runFetch('courses', data => {
      this.setState({courses: data});
    });
    // get user data from localStorage and put it in state
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({user: user});
  }

  // return an authorization header
  authHeader = (email, password) => {
    const authString = Base64.encode(`${email}:${password}`);
    return {
      "Authorization": `Basic ${authString}`
    }
  }

  // sign in a user
  signIn = (email, password, callback) => {
    this.runFetch('users', (data, status) => {
      if (status === 200) {
        this.setState({
          user: data
        });
        // persist user data
        localStorage.setItem('user', JSON.stringify(data));
      }
      if (callback) {
        callback(status);
      }
    }, "GET", this.authHeader(email, password));
  }

  // sign out
  signOut = () => {
    this.setState({
      user: {}
    });
    localStorage.removeItem('user');
  }

  render() {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Nav user={this.state.user} />
            <hr />
            <Switch>
              {/* Default Route */}
              <Route exact path="/" render={() => <Courses courses={this.state.courses}/>} />
              {/* Sign In */}
              <Route path="/sign-in" render={() => <UserSignIn signIn={this.signIn}/>} />
              {/* Sign Out */}
              <Route path="/sign-out" render={() => <UserSignOut signOut={this.signOut} />} />
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
