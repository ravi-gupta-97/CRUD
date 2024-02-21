import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { signin } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const getLoggedUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/getloggeduser`, {
        withCredentials: true
      })
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const fetchedLoggedUser = await getLoggedUser();
        if (fetchedLoggedUser) {
          dispatch(signin(fetchedLoggedUser));
        }
        else {
          // navigate('/signin')
        }

      } catch (error) {
        console.log(error);
      }
    })()
  }, [dispatch, navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {!loggedUser && <Route path='/signup' element={<SignUp />} />}
        {!loggedUser && <Route path='/signin' element={<SignIn />} />}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
