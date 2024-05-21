import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Navbar from './common/navbar';
import Crypto from './pages/Crypto/Crypto';
import Profile from './pages/Profile/Profile';
import BuyCrypto from './pages/BuyCrypto/BuyAndSellCrypto';
import Wallet from './pages/Wallet/Wallet';
import CryptoBot from './pages/CryptoBot/CryptoBot';
import Exchange from './pages/Exchange/Exchange';
import Statement from './pages/Statement/Statement';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={News} path="/news" />
        <Route Component={Crypto} path="/crypto" />
        <Route Component={Profile} path="/profile" />
        <Route Component={BuyCrypto} path="/buy-crypto" />
        <Route Component={Wallet} path="/wallet" />
        <Route Component={CryptoBot} path="/crypto-bot" />
        <Route Component={Exchange} path="/exchange" />
        <Route Component={Statement} path="/statement" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
