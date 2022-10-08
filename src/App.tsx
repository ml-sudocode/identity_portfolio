import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
// import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'
// import { getDefaultProvider } from 'ethers'
import './App.css'
import Nav from "./components/Nav";
import { About } from "./views/about/About";
import { Home } from "./views/home/Home";
import { Identities } from "./views/identities/Identities";
import { Wallets } from "./views/wallets/Wallets";

// const dappConfig: Config = {
//   readOnlyChainId: Mainnet.chainId,
//   readOnlyUrls: {
//     [Mainnet.chainId]: getDefaultProvider('mainnet'),
//     [Goerli.chainId]: getDefaultProvider('goerli'),
//   },
// }

function App() {
  return (
    // <DAppProvider config={dappConfig}>
      <div className="App">
        <Router basename={import.meta.env.VITE_BASENAME as string}>
          <div className="app-inner p-4">
            <Nav />
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/identities/*" element={<Identities />} />
              <Route path="/wallets/*" element={<Wallets />} />
              <Route path="*" element={<Navigate to={'/home'} />} />
            </Routes>
          </div>
        </Router>
      </div>
    // </DAppProvider>
  )
}

export default App;
