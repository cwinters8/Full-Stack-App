import React from 'react';
import robot from '../404robot_transparent.jpg';

const NotFound = () => {
  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
      </div>
      <div className='robot'>
        <img src={robot} alt="404 Robot" />
      </div>
    </div>
  );
}

export default NotFound;