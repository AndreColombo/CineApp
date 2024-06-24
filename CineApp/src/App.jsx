import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-26">
      <div className="bg-18">
        <Header />
      </div>
      <div className="mb-4">
        <Outlet />
      </div>
      <div className="bg-18">
        <Footer />
      </div>
    </div>
  );
}

export default App;
