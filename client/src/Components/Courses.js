import React from 'react';

const Courses = props => {
  return (
    <div className="bounds">
      {props.courses.map(course => {
        return <div key={course._id} className="grid-33">
          <a className="course--module course--link" href="course-detail.html">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </a>
        </div>
      })}
    </div>
  );
}

export default Courses;