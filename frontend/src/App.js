import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Services from "./pages/Services"
import Home from './pages/Home';
import ShipmentForm from './pages/ShipmentForm'
import EmailForm from './pages/EmailForm';
import Admin from './pages/Admin'
import ConfirmationPage from './pages/confirmationPage';
import RoadFreight from './pages/RoadFreightForm';
import RoadFormOne from './pages/RoadFormOne'
import RoadFormTwo from './pages/RoadFormTwo';
import ThankYouPage from './pages/ThankYouPage';
import ShippingServices from './pages/ShippingServices';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      
      <main className='pages'>
      <Routes>
     
      <Route path='/'
      element={<Home />}>
      
      </Route>
      
      <Route path='/services'
      element={<Services />}>
      </Route>

      <Route path='/emailForm'
      element={<EmailForm />}>
      </Route>
      
      <Route path='/shipment'
      element={<ShipmentForm />}>
      </Route>

      <Route path='/admin'
      element={<Admin />}>
      </Route>

      <Route path='/roadFreight'
      element={<RoadFreight />}>
      </Route>

      <Route path='/confirmation'
      element={<ConfirmationPage />}>
      </Route>

      <Route path='/thankyou'
      element={<ThankYouPage />}>
      </Route>

      <Route path='/RoadFormOne'
      element={<RoadFormOne />}>
      </Route>

      <Route path='/RoadFormTwo'
      element={<RoadFormTwo />}>
      </Route>

      <Route path='/ShippingServices'
      element={<ShippingServices />}>
      </Route>

      </Routes>
      
      </main>
      <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
