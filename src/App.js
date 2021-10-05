import React, { useState } from 'react';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';

export const App = () => {
  const [auth, setAuth] = useState('')

  return (
    <>
      {/* <RegisterInstructor /> */}
      <Login setAuth={setAuth}/>
    </>
  )
    
};
