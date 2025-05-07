import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Layout from "./pages/Layout";
import Signup from "./components/Signup";

function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
