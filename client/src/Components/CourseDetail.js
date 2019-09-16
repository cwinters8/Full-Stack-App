import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  state = {
    id: this.props.courseId,
    title: '',
    description: '',
    user: '',
    estimatedTime: '',
    materialsNeeded: ''
  }

  componentDidMount() {
    this.props.runFetch(`courses/${this.state.id}`, data => {
      this.setState({
        title: data.title,
        description: data.description,
        user: `${data.user.firstName} ${data.user.lastName}`,
        estimatedTime: data.estimatedTime,
        materialsNeeded: data.materialsNeeded
      });
    });
  }

  render() {
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <a className="button" href={`/courses/${this.state.id}/update`}>Update Course</a>
                <a className="button" href="#">Delete Course</a>
              </span>
              <a className="button button-secondary" href="/">Return to List</a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.title}</h3>
              <p>By {this.state.user}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={this.state.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;