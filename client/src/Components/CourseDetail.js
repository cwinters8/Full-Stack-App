import React, {Component} from 'react';

class CourseDetail extends Component {
  state = {
    courseId: this.props.courseId,
    courseData: {}
  }

  componentDidMount() {
    this.props.runFetch(`courses/${this.state.courseId}`, data => {
      this.setState({courseData: data});
    });
  }

  render() {
    return (
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{this.state.courseData.title}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;