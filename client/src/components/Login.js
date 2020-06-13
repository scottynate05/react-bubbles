import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/protected')
      })
      .catch(err => console.log('err: ', err.message, err.response))
  };

  return (
    <>
      <div>
        <form onSubmit={(user => login(user))}>          
          <input
            type='text'
            name='username'
            value={user.username}
            onChange={handleChanges}
          />
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={handleChanges}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
