import React from 'react';
import './planescomponent.css';

function PlansComponent() {
  return (
    <div className="plans-container">
      <div className="plan">
        <h3>Free Plan</h3>
        <ul>
          <li>Basic features</li>
          <li>Limited access</li>
          <li>No premium support</li>
        </ul>
        <button>Sign Up</button>
      </div>
      <div className="plan">
        <h3>Silver Plan</h3>
        <ul>
          <li>Enhanced features</li>
          <li>Full access</li>
          <li>Priority support</li>
        </ul>
        <button>Sign Up</button>
      </div>
      <div className="plan">
        <h3>Pro Plan</h3>
        <ul>
          <li>Premium features</li>
          <li>Unlimited access</li>
          <li>24/7 premium support</li>
        </ul>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default PlansComponent;
