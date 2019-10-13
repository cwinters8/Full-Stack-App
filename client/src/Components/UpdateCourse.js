import React, {Component} from 'react';
import SimpleCrypto from 'simple-crypto-js';

class UpdateCourse extends Component {
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
        estimatedTime: data.estimatedTime || '',
        materialsNeeded: data.materialsNeeded || ''
      });
    });
  }

  // go back to the course page
  goBack = (event, preventDefault=true) => {
    if (preventDefault) {
      event.preventDefault();
    }
    window.location.href = `/courses/${this.state.id}`;
  }

  // necessary for textarea fields. handles state changes as the user updates the field
  handleFormChange = (stateKey, event) => {
    const stateObj = {};
    stateObj[stateKey] = event.target.value;
    this.setState(stateObj);
  }

  updateCourse = event => {
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
    }
    // execute update
    this.props.runFetch(`courses/${this.state.id}`, (data, statusCode) => {
      console.log(`status code: ${statusCode}`);
      console.log(data);
      if (statusCode === 200) {
        this.goBack(event, false);
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
    }, 'PUT', header, body);
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
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
              <button className="button" type="submit" onClick={this.updateCourse}>Update Course</button>
              <button className="button button-secondary" onClick={this.goBack}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdateCourse;