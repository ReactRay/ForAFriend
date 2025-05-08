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
function App() {

  const { user, checkAuth } = useAuthStore()



  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} /> {/* default child route */}
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/home" />} /> {/* default child route */}
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        </Route>
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={user ? <PostPage /> : <Navigate to="/login" />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
      <Toaster />

    </main>
  );
}

export default App;
