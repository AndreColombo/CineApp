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
    <header className='flex items-center justify-between p-8 px-14 text-26 dark:text-FF'>
      <Link to='/'>
        <img src='/./AndreFlix.png' alt='AndreFlix' width={150} />
      </Link>
      <form onSubmit={handleSubmit} className='w-1/3'>
        <input
          type='text'
          placeholder='Pesquisar Filmes'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className='w-full rounded border border-[#FF5733] bg-FF p-1 dark:bg-26'
        />
      </form>
      <Navbar />
    </header>
  );
}
