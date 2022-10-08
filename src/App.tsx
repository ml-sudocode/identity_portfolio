import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import Nav from "./components/Nav";
import { About } from "./views/about/About";
import { Addresses } from "./views/addresses/Addresses";
import { Home } from "./views/home/Home";
import { Identities } from "./views/identities/Identities";


function App() {
  return (
    <div className="App">
      <Router basename={import.meta.env.VITE_BASENAME as string}>
        <div className="app-inner p-4">
          <Nav />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/identities/*" element={<Identities />} />
            <Route path="/addresses/*" element={<Addresses />} />
            <Route path="*" element={<Navigate to={'/home'} />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
