import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Work from "./pages/work";
import Contact from "./pages/Contact";
import Test from "./components/test";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/contact" element={<Test />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
