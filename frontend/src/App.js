import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import RoadFormOne from "./pages/RoadFormOne";
import RoadFormTwo from "./pages/RoadFormTwo";
import ThankYouPage from "./pages/ThankYouPage";
import ShippingServices from "./pages/ShippingServices";
import Consulting from "./pages/Consulting";
import InkAndPrinting from "./pages/InkAndPrinting";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <main className="pages">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/thankyou" element={<ThankYouPage />}></Route>

            <Route path="/RoadFormOne" element={<RoadFormOne />}></Route>

            <Route path="/RoadFormTwo" element={<RoadFormTwo />}></Route>

            <Route
              path="/ShippingServices"
              element={<ShippingServices />}
            ></Route>

            <Route path="/Consulting" element={<Consulting />}></Route>

            <Route path="/InkAndPrinting" element={<InkAndPrinting />}></Route>

            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
