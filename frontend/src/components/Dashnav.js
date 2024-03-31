import React from "react";
import { Form } from "react-router-dom";
import "./dashnav.css";

const Dashnav = () => {
  return (
    <div className="dashnav-main">
      <div className="dashnav-utp">
        <button>Upgrade to Pro</button>
      </div>
      <div className="dashnav-logout">
        <Form action="/logout" method="post">
          <button>Logout</button>
        </Form>
      </div>
    </div>
  );
};

export default Dashnav;
