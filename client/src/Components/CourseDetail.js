import React from 'react';

const CourseDetail = props => {
  const course = props.course;
  console.log('Course from props: ' + course);

  return (
    <div className="bounds course--detail">
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          {/* <h3 className="course--title">{course.title}</h3> */}
        </div>
      </div>
    </div>
  )
}

export default CourseDetail;