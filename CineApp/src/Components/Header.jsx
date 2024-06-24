import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/pesquisa?q=${search}`);
    setSearch("");
  };

  return (
    <header className="flex text-white p-8 px-14 justify-between items-center">
      <Link to="/">
        <img src="/./AndreFlix.png" alt="AndreFlix" width={150} />
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquisar Filmes"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-96 rounded p-1 bg-26 border border-[#FF5733]"
        />
      </form>
      <Navbar />
    </header>
  );
}
