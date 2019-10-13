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

  goBack = (event, preventDefault=true) => {
    if (preventDefault) {
      event.preventDefault();
    }
    window.location.href = `/courses/${this.state.id}`;
  }

  handleFormChange = (stateKey, event) => {
    const stateObj = {};
    stateObj[stateKey] = event.target.value;
    this.setState(stateObj);
  }

  updateCourse = event => {
    event.preventDefault();
    const crypto = new SimpleCrypto(process.env.REACT_APP_SECRET_KEY);
    const header = this.props.authHeader(
      JSON.parse(localStorage.getItem('user')).emailAddress, 
      crypto.decrypt(localStorage.getItem('password'))
    );
    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      estimatedTime: document.getElementById('estimatedTime').value,
      materialsNeeded: document.getElementById('materialsNeeded').value
    }
    this.props.runFetch(`courses/${this.state.id}`, data => {
      console.log(data);
      this.goBack(event, false);
    }, 'PUT', header, body);
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
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