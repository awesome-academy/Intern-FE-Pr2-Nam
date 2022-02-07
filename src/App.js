
import Header from './Component/Header/Header'
import Home from './Component/Home'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
