import React, {Component} from 'react';

class UserSignIn extends Component {
  cancel = event => {
    event.preventDefault();
    window.location.href = '/';
  }

  signIn = event => {
    event.preventDefault();
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    this.props.signIn(email, password);
  }

  render() {
    return <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form>
            <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" autoComplete="username"/></div>
            <div><input id="password" name="password" type="password" placeholder="Password" autoComplete="password"/></div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit" onClick={this.signIn}>Sign In</button>
              <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
      </div>
    </div>
  }
}

export default UserSignIn;