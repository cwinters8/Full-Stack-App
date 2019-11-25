import React, {Component} from 'react';

const errorId = 'error';
const formId = 'signInForm';
const buttonsId = 'buttons';

class UserSignIn extends Component {
  signIn = event => {
    event.preventDefault();
    // if error element exists, remove it
    this.props.removeElementById(errorId, formId);

    // get login credentials
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    // attempt sign in
    this.props.signIn(email, password, status => {
      if (status === 200) {
        // route to home if sign in is successful
        window.location.href = '/';
      } else {
        // create error object and append to the DOM
        this.props.appendMessage('Invalid credentials. Please check your email and password then try again.', errorId, formId, buttonsId);
      }
    });
  }

  render() {
    return <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form id={formId}>
            <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" autoComplete="username"/></div>
            <div><input id="password" name="password" type="password" placeholder="Password" autoComplete="password"/></div>
            <div id={buttonsId} className="grid-100 pad-bottom">
              <button className="button" type="submit" onClick={this.signIn}>Sign In</button>
              <button className="button button-secondary" onClick={this.props.cancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>Don't have a user account? <a href="/sign-up">Click here</a> to sign up!</p>
      </div>
    </div>
  }
}

export default UserSignIn;