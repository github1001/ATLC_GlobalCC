// ContactUs.js

import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>
        Have questions or suggestions? We'd love to hear from you! Feel free to reach out using
        the contact information below.
      </p>

      <div className="contact-info">
        <div>
          <h3>Email</h3>
          <p>
            For general inquiries: <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>

        <div>
          <h3>Phone</h3>
          <p>
            Customer support: <a href="tel:+123456789">+1 (234) 567-89</a>
          </p>
        </div>

        <div>
          <h3>Address</h3>
          <p>123 Event Street, Cityville, State, 12345, Australia</p>
        </div>
      </div>

      <p>
        We value your feedback and are committed to providing the best experience for our users.
        Don't hesitate to get in touch with us!
      </p>
    </div>
  );
};

export default ContactUs;
