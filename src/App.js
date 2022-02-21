
import Header from './Component/Header/Header'
import Footer from './Component/Footer/Footer'
import Home from './Component/Home'
import Shop from './Component/Shop'
import Cart from './Component/Cart'
import Signup from './Component/SignUp'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
