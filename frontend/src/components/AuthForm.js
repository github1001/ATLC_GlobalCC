import {
  Form,
  Link,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useEffect, useRef, useState } from 'react';

function AuthForm({ Mode, show, onClickOutside }) {
  const data = useActionData();
  const navigation = useNavigation();
  const ref = useRef(null);

  const isSubmitting = navigation.state === 'submitting';

  const [isLogin, setIsLogin] = useState(Mode === "login")



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show)
    return null;





  return (
    <>
      <div ref={ref}>

        <Form method="post" className={classes.form} >
          <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          {!isLogin && (
            <>
              <p>
                <label htmlFor="username">Username</label>
                <input id="username" type="username" name="username" required />
              </p>
            </>
          )}
          <p>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </p>

          <p>
            <label htmlFor="image">Password</label>
            <input id="password" type="password" name="password" required />
          </p>

          {!isLogin && (
            <>
              <p>
                <label htmlFor="event">Event</label>
                <select id="event" name="event" required>
                  <option value="event1">Event 1</option>
                  <option value="event2">Event 2</option>
                  <option value="event3">Event 3</option>
                </select>
              </p>
            </>
          )}
          <div className={classes.actions}>
            {/* <button type='button' onClick={handelTYpechange} >
            {isLogin ? 'Create new user' : 'Login'}
          </button> */}
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AuthForm;