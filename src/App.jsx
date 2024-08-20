import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="bg-FF dark:bg-26">
      <div className="bg-DF dark:bg-18">
        <Header />
      </div>
      <div className="mb-4">
        <Outlet />
      </div>
      <div className="bg-DF dark:bg-18">
        <Footer />
      </div>
    </div>
  );
}