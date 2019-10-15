import React, {Component} from 'react';

// import helper component
import CourseForm from './CourseForm';

class UpdateCourse extends Component {
  render() {
    return <CourseForm runFetch={this.props.runFetch} authHeader={this.props.authHeader} courseId={this.props.courseId} />
  }
}

export default UpdateCourse;