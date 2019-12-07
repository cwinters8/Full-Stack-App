import React, {Component} from 'react';

const errorId = 'error';
const formId = 'signUpForm';
const buttonsId = 'buttons';

class UserSignUp extends Component {
  signUp = event => {
    event.preventDefault();
    // remove any errors present
    const errors = document.querySelectorAll(`[id="${errorId}"]`);
    errors.forEach(err => {
      err.parentNode.removeChild(err);
    });
    // get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // check if password values are equivalent
    if (password !== confirmPassword) {
      this.props.appendMessage('Password and Confirm Password values must match', errorId, formId, buttonsId);
      return 'passwords did not match';
    }

    // build request body
    const body = {
      firstName, lastName, emailAddress, password
    };

    // attempt sign up
    this.props.runFetch('users', (data, statusCode) => {
      // if successful, sign the user in
      if (statusCode === 200) {
        this.props.signIn(emailAddress, password, status => {
          if (status === 200) {
            this.props.redirect(true);
          } else {
            // append an error
            this.props.appendMessage(`Failed to sign in. Status code ${status}`, errorId, formId, buttonsId);
            console.log(data);
          }
        });
      } else {
        // append an error
        this.props.appendMessage(`Failed to create user. Status code ${statusCode}`, errorId, formId, buttonsId);
        // append errors returned from the API
        const messages = data.error.message;
        messages.forEach(msg => {
          this.props.appendMessage(`${msg.msg} for ${msg.param}`, errorId, formId, buttonsId);
        });
        console.log(data);
      }
    }, 'POST', {}, body);
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signup">
          <h1>Sign Up</h1>
          <div>
            <form id={formId}>
              <div><input id="firstName" name="firstName" type="text" placeholder="First Name"/></div>
              <div><input id="lastName" name="lastName" type="text" placeholder="Last Name"/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"/></div>
              <div><input id="password" name="password" type="password" autoComplete="newpassword" placeholder="Password"/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="newpassword" placeholder="Confirm Password"/></div>
              <div id={buttonsId} className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={this.signUp}>Sign Up</button>
                <button className="button button-secondary" onClick={this.props.cancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>Already have a user account? <a href="/sign-in">Click here</a> to sign in!</p>
        </div>
      </div>
    )
  }
}

export default UserSignUp;