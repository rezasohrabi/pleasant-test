import clsx from 'clsx';
import React from 'react';
import { useForm } from '../../hooks';
import './Login.scss';

const Login = (props) => {
  const login = () => {
    alert('wellcome to appp');
  };

  const validate = (values) => {
    const errors = {};
    console.log(values);
    if (!values.password) {
      errors.password = 'password cannot be empty';
    } else if (values.password.length < 8) {
      errors.password = 'password must be greater than 8 character';
    }
    if (!values.username) {
      errors.username = 'username is required';
    }
    return errors;
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>Username</label>
      <div className='form-control'>
        <input
          type='text'
          name='username'
          className={clsx(errors.username && 'has-error')}
          value={values.username || ''}
          onChange={handleChange}
        />
        {<p className='error'>{errors.username && errors.username}</p>}
      </div>
      <label>Password</label>
      <div className='form-control'>
        <input
          type='password'
          name='password'
          className={clsx(errors.password && 'has-error')}
          value={values.password || ''}
          onChange={handleChange}
        />
        {<p className='error'>{errors.password && errors.password}</p>}
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
