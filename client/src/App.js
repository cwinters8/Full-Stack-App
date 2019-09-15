import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// style
import './App.css';
import './global.css';

// components
import Nav from './Components/Nav';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

const api = 'http://localhost:5000/api';

class App extends Component {
  state = {
    courses: []
  }

  componentDidMount() {
    // get courses and put them into state
    fetch(`${api}/courses`)
      .then(response => {
        response.json().then(data => {
          this.setState({courses: data})
        });
      });
  }

  findCourse = courseId => {
    this.state.courses.forEach(course => {
      if (course._id === courseId) {
        console.log(course);
        return course;
      } else {
        return 'Course not found';
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div id="root">
          <div>
            <Nav />
            <hr />
            <Switch>
              {/* Default Route */}
              <Route exact path="/" render={() => <Courses courses={this.state.courses}/>} />
              <Route path="/course/:id" render={(props) => <CourseDetail findCourse={this.findCourse} {...props} />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
