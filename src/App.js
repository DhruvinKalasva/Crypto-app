import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import Coins from "./routes/Coins";
import Exchanges from "./routes/Exchanges";
import CoinDetails from "./routes/CoinDetails";
import Footer from "./components/footer/Footer.js"
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/exchanges" element={<Exchanges />} />
      <Route path="/coin/:id" element={<CoinDetails />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
