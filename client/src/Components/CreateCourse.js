import React, {Component} from 'react';

// import helper component
import CourseForm from './CourseForm';

class CreateCourse extends Component {
  render() {
    return <CourseForm runFetch={this.props.runFetch} authHeader={this.props.authHeader} />
  }
}

export default CreateCourse;