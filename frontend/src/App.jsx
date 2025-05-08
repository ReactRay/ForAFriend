import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Layout from "./pages/Layout";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} /> {/* default child route */}
          <Route path='/login' element={<Login />} /> {/* default child route */}
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster />

    </main>
  );
}

export default App;
