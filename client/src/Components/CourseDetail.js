import React from 'react';

const CourseDetail = props => {
  const id = props.match.params.id;
  const course = props.findCourse(id);
  console.log(course);

  return (
    <div className="bounds course--detail"></div>
  )
}

export default CourseDetail;