import React from 'react';

const UnhandledError = () => {
  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
      </div>
      <div className="bounds">
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </div>
  )
}

export default UnhandledError;