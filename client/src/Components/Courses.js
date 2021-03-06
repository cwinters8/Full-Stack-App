import React, {Component} from 'react';

class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    // get courses and put them into state
    this.props.runFetch('courses', data => {
      this.setState({courses: data});
    });
  }

  render() {
    return (
      <div className="bounds">
        {this.state.courses.map(course => {
          const id = course._id;
          const link = `/courses/${id}`;
          return <div key={id} className="grid-33">
            <a className="course--module course--link" href={link}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </a>
          </div>
        })}
        <div className="grid-33">
          <a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </a>
        </div>
      </div>
    );
  }
}

export default Courses;