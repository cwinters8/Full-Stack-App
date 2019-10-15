import React, {Component} from 'react';
import SimpleCrypto from 'simple-crypto-js';

class CourseForm extends Component {
  
  state = {
    id: this.props.courseId || '',
    title: '',
    description: '',
    user: `${localStorage.getItem('user').firstName} ${localStorage.getItem('user').lastName}`,
    estimatedTime: '',
    materialsNeeded: ''
  }

  componentDidMount() {
    if (this.getAction() === 'update') {
      this.props.runFetch(`courses/${this.state.id}`, data => {
        this.setState({
          title: data.title,
          description: data.description,
          user: `${data.user.firstName} ${data.user.lastName}`,
          estimatedTime: data.estimatedTime || '',
          materialsNeeded: data.materialsNeeded || ''
        });
      });
    }
  }

  // identify if we are updating or creating a course
  getAction = (capitalize=false) => {
    // parse URL path to determine if we are updating or creating a course
    const path = window.location.pathname.split('/');
    let action = path[path.length - 1];
    console.log(`Create or update? ${action}`);
    if (capitalize) {
      action = action.charAt(0).toUpperCase() + action.slice(1);
    }
    return action;
  }

  // necessary for textarea fields. handles state changes as the user updates the field
  handleFormChange = (stateKey, event) => {
    const stateObj = {};
    stateObj[stateKey] = event.target.value;
    this.setState(stateObj);
  }

  // go to the course detail page
  goToCourse = (event, preventDefault=true) => {
    if (preventDefault) {
      event.preventDefault();
    }
    window.location.href = `/courses/${this.state.id}`;
  }

  updateOrCreateCourse = event => {
    event.preventDefault();
    // build authorization header
    const crypto = new SimpleCrypto(process.env.REACT_APP_SECRET_KEY);
    const header = this.props.authHeader(
      JSON.parse(localStorage.getItem('user')).emailAddress, 
      crypto.decrypt(localStorage.getItem('password'))
    );

    // build body
    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      estimatedTime: document.getElementById('estimatedTime').value,
      materialsNeeded: document.getElementById('materialsNeeded').value
    };

    // define method for fetch
    const action = this.getAction();
    let method;
    if (action === 'update') {
      method = 'PUT';
    } else if (action === 'create') {
      method = 'POST';
    }

    // execute update/create
    this.props.runFetch(`courses/${this.state.id}`, (data, statusCode) => {
      console.log(`status code: ${statusCode}`);
      console.log(data);
      // if course ID is returned in data, put it into state
      if (statusCode === 200) {
        this.goToCourse(event, false);
      } else {
        // handle invalid inputs
        const messages = data.error.message;
        const errorContainerId = 'error-container';
        let errorDiv = document.getElementById(errorContainerId);
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.id = errorContainerId;
          errorDiv.innerHTML = '<h2 class="validation--errors--label">Validation errors</h2><div class="validation-errors"><ul></ul></div>';
          const container = document.getElementById('container');
          container.insertBefore(errorDiv, document.getElementsByTagName('form')[0]);
        }
        const ul = document.getElementsByClassName('validation-errors')[0].firstChild;
        ul.innerHTML = '';
        messages.forEach(msg => {
          const badParam = msg.param;
          const capitalizedBadParam = badParam.charAt(0).toUpperCase() + badParam.slice(1);
          const errorHtml = document.createElement('li');
          errorHtml.innerText = `Please provide a value for "${capitalizedBadParam}"`;
          ul.append(errorHtml);
        });
      }
    }, method, header, body);
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>{this.getAction(true)} Course</h1>
        <div id="container">
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={this.state.title} />
                </div>
                <p>By {this.state.user}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" placeholder="Course description..." value={this.state.description} onChange={event => this.handleFormChange('description', event)} />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={this.state.estimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={event => this.handleFormChange('materialsNeeded', event)} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit" onClick={this.updateCourse}>{this.getAction(true)} Course</button>
              <button className="button button-secondary" onClick={this.goToCourse}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CourseForm;