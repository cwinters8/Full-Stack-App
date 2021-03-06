import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {Redirect} from 'react-router-dom';
import SimpleCrypto from 'simple-crypto-js';

class CourseDetail extends Component {
  state = {
    id: this.props.courseId,
    title: '',
    description: '',
    userId: '',
    userName: '',
    estimatedTime: '',
    materialsNeeded: '',
    failed: false
  }

  componentDidMount() {
    this.props.runFetch(`courses/${this.state.id}`, (data, statusCode) => {
      if (statusCode === 200) {
        this.setState({
          title: data.title,
          description: data.description,
          userId: data.user._id,
          userName: `${data.user.firstName} ${data.user.lastName}`,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded
        });
      } else {
        this.setState({
          failed: true
        });
      }
    });
  }

  // render update/delete buttons only if the authenticated user owns the course
  renderUpdateDelete = () => {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user._id === this.state.userId) {
        return (
          <span>
            <a className="button" href={`/courses/${this.state.id}/update`}>Update Course</a>
            <a onClick={this.deleteCourse} className="button" href="/">Delete Course</a>
          </span>
        )
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  deleteCourse = async event => {
    event.preventDefault();
    // build authorization header
    const crypto = new SimpleCrypto(process.env.REACT_APP_SECRET_KEY);
    const header = this.props.authHeader(
      JSON.parse(localStorage.getItem('user')).emailAddress, 
      crypto.decrypt(localStorage.getItem('password'))
    );

    // execute delete
    this.props.runFetch(`courses/${this.state.id}`, data => {
      console.log(data);
      window.location.href = '/';
    }, "DELETE", header);
  }

  render() {
    if (!this.state.failed) {
      return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {this.renderUpdateDelete()}
                <a className="button button-secondary" href="/">Return to List</a>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.title}</h3>
                <p>By {this.state.userName}</p>
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
    } else {
      return <Redirect to="/notfound" />
    }
  }
}

export default CourseDetail;