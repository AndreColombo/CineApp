import { Link } from "react-router-dom";
import TrocarTema from "./TrocarTema";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-5 text-lg items-center">
        <li>
          <Link to="filmes">Filmes</Link>
        </li>
        <li>
          <Link to="series">Séries</Link>
        </li>
        <li>
          <Link to="noticias">Notícias</Link>
        </li>
        <li>
          <Link to="contato">Contato</Link>
        </li>
        <li>
          <Link to="sobre">Sobre</Link>
        </li>
        <TrocarTema />
      </ul>
    </nav>
  );
}
