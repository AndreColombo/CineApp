import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-5 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="filmes">Filmes</Link>
        </li>
        <li>
          <Link to="noticias">Notícias</Link>
        </li>
        <li>
          <Link to="sobre">Sobre</Link>
        </li>
      </ul>
    </nav>
  );
}
