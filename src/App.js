import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import SubMenu from "./pages/SubMenu/SubMenu";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Blog from "./pages/Blog/Blog";
import Shop from "./pages/Shop/Shop";
import WineDetail from "./pages/WineDetail/WineDetail";
import CartContainer from "./components/CartContainer/CartContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import WishList from "./pages/WishList/WishList";
import RecoveryEmail from "./pages/RecoveryEmail/RecoveryEmail";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import OTPInput from "./pages/OTPInput/OTPInput";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contacts />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/wish-list" element={<WishList />}></Route>
        <Route path="/recovery-email" element={<RecoveryEmail />}></Route>
        <Route path="/change" element={<ChangePassword />}></Route>
        <Route path="/otp" element={<OTPInput />}></Route>
        <Route path="/:id" element={<WineDetail />}></Route>
      </Routes>
      <SubMenu />
      <CartContainer />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
