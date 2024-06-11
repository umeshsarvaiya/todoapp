import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {  NavLink } from 'react-router-dom';

function SignupUser() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [conformpassword,setConformPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [signinsuccess ,setsigninsuccsess] = useState("");
  const [successfail,setsuccessfail] = useState("");
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};
const handleConfirmPasswordChange = (e) => {
    setConformPassword(e.target.value);
};
const validatePasswords = () => {
    let errorMessages = '';
    if (password.length < 6) {
        errorMessages += 'Password must be at least 6 characters long. ';

    }
    if (password !== conformpassword) {
        errorMessages += 'Passwords do not match. ';
    }
    setError(errorMessages);
    return errorMessages === '';
};

  const handleRegister = async (e) => {
   
    e.preventDefault();
    
    setsigninsuccsess('');
    setsuccessfail('');
   
    
    if(validatePasswords()){
        try {
            await createUserWithEmailAndPassword(auth, email, password);
           
            const user = auth.currentUser;
            setsigninsuccsess("User Registered Successfully!!")
            console.log(user);
            if (user) {
              await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
                photo:""
              });
            }
            console.log("User Registered Successfully!!");  
          } catch (error) {
            setsuccessfail(error.message)
            console.log(error.message);
          }
        };
   
        
      
    }


  return (

    <form onSubmit={handleRegister}>
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="not found" class="img-fluid" />
        </MDBCol>

        <MDBCol col='4' md='6'>

        <MDBInput wrapperClass='mb-4' label='First Name' id='formControlLg' type='name' size="lg"   onChange={(e) => setFname(e.target.value)}
          required/>
          <MDBInput wrapperClass='mb-4' label='Last Name' id='formControlLg' type='name' size="lg" onChange={(e) => setLname(e.target.value)}/>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"  onChange={(e) => setEmail(e.target.value)}
          required/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"      onChange={handlePasswordChange}
                    required
          />
          <MDBInput wrapperClass='mb-4' label='Conform Password' id='formControlLg' type='password' size="lg"
             onChange={handleConfirmPasswordChange}
          />
          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <MDBBtn className="mb-4 w-100" size="lg" type="submit" >Sign in</MDBBtn>
        </MDBCol>
      </MDBRow>
      {error && <div style={{ color: 'red' }}>{error}</div>} 
      {signinsuccess && <div style={{ color: 'green' }}>{signinsuccess}
      <NavLink to='/login' style={{"color":"green","margin":"20px", "backgroundColor":"yellow"}}>Login</NavLink>
      </div>}
      {successfail && <div style={{color:'red'}}>{successfail}</div>}
    </MDBContainer>
    </form>
     
    
  );
}

export default SignupUser;