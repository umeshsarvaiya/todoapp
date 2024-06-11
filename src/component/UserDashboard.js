import React, { memo, useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBInputGroup
  } from 'mdb-react-ui-kit'; 
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import AddList from './AddList';
import TodoList from './TodoList';
const UserDashboard = () => {
const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {   
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
          console.log("user logIn Success")
        } else {
          console.log("User is not login");
        }
      });
    };
    useEffect(() => {
      fetchUserData();
    }, []);

    async function handleLogout() {
      try {
        await auth.signOut();
        window.location.href = "/login";
        console.log("User log in successfully!");
        window.alert("user Logout ");
      } catch (error) {
        console.error("Error",error.message);
      }
    }
  
  return (
    <div>
    
    {userDetails ? (
        <>
        <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand style={{"color":"green", "fontSize":"26px"}}>Hello {userDetails.firstName} {userDetails.lastName}</MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
             <MDBBtn outline  onClick={handleLogout}>Logout</MDBBtn>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
        </>
      ) : (
     <p>Loading...</p>
      )}
  <AddList/>
  <TodoList/>
  
    </div>
  )
}

export default memo(UserDashboard)