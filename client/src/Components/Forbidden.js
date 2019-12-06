import React from 'react';

const Forbidden = () => {
  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
      </div>
      <div className="bounds" id="denied">
        <h1>Forbidden</h1>
        <p>Oh no! You can't access this page.</p>
      </div>
    </div>
  )
}

export default Forbidden;