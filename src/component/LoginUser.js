import React, { memo, useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error, seterror] = useState(''); 
    const Loginbtn = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        await signInWithEmailAndPassword(auth, email, password);
        
        console.log("User logged in Successfully");
        window.location.href = "/dashboard";
       seterror("successful")
      } catch (error) {
        console.log(error.message);
        seterror("login fail",error.message)
      }
    };
  return (
    <div>
<form onSubmit={Loginbtn}>
<MDBContainer className="my-5">
<MDBCard>
  <MDBRow className='g-0'>
    <MDBCol md='6'>
      <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
    </MDBCol>
    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>
        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
          <span className="h1 fw-bold mb-0">Logo</span>
        </div>
        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"    value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"   value={password}
          onChange={(e) => setPassword(e.target.value)}/> 
        <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
        <a className="small name-muted" href="#!">Forgot password?</a>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/signupuser" style={{color: '#393f81'}}>   Register here</a></p>
        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small name-muted me-1">Terms of use.</a>
          <a href="#!" className="small name-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

{error && <div style={{color:'red'}}>{error}</div>}
   
</MDBContainer>

</form>
    </div>
  )
}

export default memo(LoginUser)