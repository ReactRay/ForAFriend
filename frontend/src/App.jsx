import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Layout from "./pages/Layout";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home";
import { useEffect } from "react";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import { useAuthStore } from './store/auth.store.js'
import { usePostStore } from "./store/post.store.js";
import RequestPage from "./pages/RequestPage.jsx";
import JobsPage from './pages/JobsPage.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {

  const { user, checkAuth } = useAuthStore()
  const { getPosts } = usePostStore()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])



  return (
    <main>
      <PayPalScriptProvider options={{ "client-id": "AUo_Nd2v130UXzAYEb2wcYuuMAll7vMM96t_4g5xAOHPhU9aZLCWrxOBlyIPcMbHcz_cFA5MenYRzqcw" }}>

        <NavBar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Layout />}>
            <Route index element={<Login />} /> {/* default child route */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/home" />} /> {/* default child route */}
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
          </Route>
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/post/:id" element={user ? <PostPage /> : <Navigate to="/login" />} />
          <Route path="/user/:id" element={user ? <UserPage /> : <Navigate to='/login' />} />
          <Route path="/requests" element={user ? <RequestPage /> : <Navigate to='/login' />} />
          <Route path="/jobs" element={user ? <JobsPage /> : <Navigate to='/login' />} />
        </Routes>
        <Toaster />
      </PayPalScriptProvider>
    </main>
  );
}

export default App;
