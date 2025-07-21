import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './features/Home';
import PropertyDetails from './pages/PropertyDetails';
import BackToTopButton from './components/BacktoTop';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
      <BackToTopButton />
    </>
  );
}
