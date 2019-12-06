import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Base64} from 'js-base64';
import SimpleCrypto from 'simple-crypto-js';

// style
import './App.css';
import './global.css';
import './custom.css';

// components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UpdateCourse from './Components/UpdateCourse';
import CreateCourse from './Components/CreateCourse';
import UserSignUp from './Components/UserSignUp';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError';

const api = 'http://localhost:5000/api';

class App extends Component {
  state = {
    user: {},
    password: ''
  }

  // helper function for retrieving data
  runFetch = (path, callback, method="GET", headers={}, body) => {
    // set Content-Type header if a body is being passed in
    if (body) {
      headers['Content-Type'] = 'application/json';
    }
    fetch(`${api}/${path}`, {
        method: method, 
        headers: new Headers(headers), 
        body: JSON.stringify(body)
      }).then(response => {
        if (response.status === 500) {
          window.location.href = '/error';
        }
        response.json().then(data => {
          callback(data, response.status);
        });
    });
  }

  componentDidMount() {
    // get user data from localStorage and put it in state
    const user = JSON.parse(localStorage.getItem('user'));
    const encryptedPassword = localStorage.getItem('password');
    this.setState({
      user: user,
      password: encryptedPassword
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
  signIn = (email, password, callback) => {
    this.runFetch('users', (data, status) => {
      if (status === 200) {
        const crypto = new SimpleCrypto(process.env.REACT_APP_SECRET_KEY);
        const encryptedPassword = crypto.encrypt(password);
        this.setState({
          user: data,
          password: encryptedPassword
        });
        // persist user data
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('password', encryptedPassword);
      }
      if (callback) {
        callback(status);
      }
    }, "GET", this.authHeader(email, password));
  }

  // sign out
  signOut = () => {
    this.setState({
      user: {},
      password: ''
    });
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  }

  cancel = event => {
    event.preventDefault();
    window.location.href = '/';
  }

  removeElementById = (id, parentId) => {
    const parent = document.getElementById(parentId);
    const elem = document.getElementById(id);
    if (elem) {
      parent.removeChild(elem);
    }
  }

  appendMessage = (msg, msgId, parentId, insertBeforeId) => {
    const p = document.createElement('p');
    p.id = msgId;
    p.textContent = msg;
    const parent = document.getElementById(parentId);
    const elemToInsertBefore = document.getElementById(insertBeforeId);
    parent.insertBefore(p, elemToInsertBefore);
  }

  // check for a 'continue' item in local storage that specifies where to redirect to after sign in/up
  redirect = (goHome=false) => {
    const continuePath = localStorage.getItem('continue');
    if (continuePath) {
      localStorage.removeItem('continue');
      window.location.href = continuePath;
    } else {
      // if no 'continue' item is found, go back a page or home if specified
      if (goHome) {
        window.location.href = '/';
      } else {
        window.history.back();
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Header user={this.state.user} />
            <hr />
            <Switch>
              {/* Default Route */}
              <Route exact path="/" render={() => <Courses runFetch={this.runFetch} authHeader={this.authHeader} />} />
              {/* Sign Up */}
              <Route path="/sign-up" render={() => <UserSignUp signIn={this.signIn} runFetch={this.runFetch} cancel={this.cancel} removeElementById={this.removeElementById} appendMessage={this.appendMessage} redirect={this.redirect} />} />
              {/* Sign In */}
              <Route path="/sign-in" render={() => <UserSignIn signIn={this.signIn} cancel={this.cancel} removeElementById={this.removeElementById} appendMessage={this.appendMessage} redirect={this.redirect} />} />
              {/* Sign Out */}
              <Route path="/sign-out" render={() => <UserSignOut signOut={this.signOut} />} />
              {/* Create Course */}
              <Route exact path="/courses/create" render={() => <CreateCourse runFetch={this.runFetch} authHeader={this.authHeader} />} />
              {/* View Course Detail */}
              <Route exact path="/courses/:id" render={({match}) => <CourseDetail courseId={match.params.id} runFetch={this.runFetch} authHeader={this.authHeader} />} />
              {/* Update Course */}
              <Route path="/courses/:id/update" render={({match}) => <UpdateCourse courseId={match.params.id} runFetch={this.runFetch} authHeader={this.authHeader} />} />
              {/* Not Found */}
              <Route path="/notfound" render={() => <NotFound />} />
              {/* Forbidden */}
              <Route path="/forbidden" render={() => <Forbidden />} />
              {/* Error */}
              <Route path="/error" render={() => <UnhandledError />} />
              {/* Render the NotFound component if no other route matches */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
