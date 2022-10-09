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
import { Portfolio } from "./views/portfolio/Portfolio";
import { Activity } from "./views/activity/Activity";
import { Wallets } from "./views/wallets/Wallets";
import { Actions } from "./views/actions/Actions";
import { Transactions } from "./views/transactions/Transactions";

function App() {
  return (
    <div className="App">
      <Router basename={import.meta.env.VITE_BASENAME as string}>
        <div className="app-inner p-4">
          <Nav />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/transactions/*" element={<Transactions />} />
            <Route path="/wallets/*" element={<Wallets />} />
            <Route path="/addresses/*" element={<Addresses />} />
            <Route path="*" element={<Navigate to={'/home'} />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
