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

      </Routes>
      
      </main>
      <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
