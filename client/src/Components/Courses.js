import React from 'react';

const Courses = props => {
  return (
    <div className="bounds">
      {props.courses.map(course => {
        const id = course._id;
        const link = `/course/${id}`;
        return <div key={id} className="grid-33">
          <a className="course--module course--link" href={link}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </a>
        </div>
      })}
    </div>
  );
}

export default Courses;