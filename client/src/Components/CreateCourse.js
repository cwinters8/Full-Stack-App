import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

// import helper component
import CourseForm from './CourseForm';

class CreateCourse extends Component {
  render() {
    // redirect to sign in if user isn't signed in
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.setItem('continue', '/courses/create');
      return <Redirect to='/sign-in' />
    } else {
      return <CourseForm runFetch={this.props.runFetch} authHeader={this.props.authHeader} />
    }
  }
}

export default CreateCourse;