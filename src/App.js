
import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './component/firebase';
import { Route,Routes, Navigate } from 'react-router-dom';


import LoginUser from './component/LoginUser';
import SignupUser from './component/SignupUser';
import UserDashboard from './component/UserDashboard';
import AddList from './component/AddList';
import TodoList from './component/TodoList';
import { useDispatch } from 'react-redux';
import { setUser } from './features/TodoSlices';
function App() {

  const [user, setUserState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          setUserState(user);
          if (user) {
              dispatch(setUser(user.uid));
          }
      });

      return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" /> : <LoginUser />}
              />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path='/signupuser' element={<SignupUser/>}/>
            </Routes> 
          </div>
  
  );
}

export default App;
