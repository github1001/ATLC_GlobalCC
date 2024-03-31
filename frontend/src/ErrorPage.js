import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Error: Access Denied</h1>
      <p>Please login first to access this page.</p>
      {/* You can add a button here to redirect users to the login page */}
      {/* Example: <button onClick={() => history.push('/login')}>Login</button> */}
    </div>
  );
};

export default ErrorPage;
