import React from 'react';

const Header = props => {
  let nav;
  if (props.user) {
    nav = <nav><span>Welcome {props.user.firstName} {props.user.lastName}!</span><a className="signout" href="/sign-out">Sign Out</a></nav>
  } else {
    nav = <nav><a className="signup" href="/sign-up">Sign Up</a><a className="signin" href="/sign-in">Sign In</a></nav>
  }
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {nav}
      </div>
    </div>
  );
}

export default Header;