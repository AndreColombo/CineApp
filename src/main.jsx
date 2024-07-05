import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Pesquisa from "./Pages/Pesquisa.jsx";
import Home from "./Pages/Home.jsx";
import Filmes from "./Pages/Filmes.jsx";
import DetalhesFilme from "./Pages/DetalhesFilme.jsx";
import Series from "./Pages/Series.jsx";
import DetalhesSerie from "./Pages/DetalhesSerie.jsx";
import Elenco from "./Pages/Elenco.jsx";
import Pessoa from "./Pages/Pessoa.jsx";
import FilmesPessoa from "./Pages/FilmesPessoa.jsx";
import Noticias from "./Pages/Noticias.jsx";
import Noticia from "./Pages/Noticia.jsx";
import Sobre from "./Pages/Sobre.jsx";
import ComprarIngresso from "./Pages/ComprarIngresso.jsx";
import Confirmacao from "./Pages/Confirmacao.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="filmes" element={<Filmes />} />
          <Route path="filmes/:id" element={<DetalhesFilme />} />
          <Route path="filmes/:id/elenco" element={<Elenco tipo="filme" />} />
          <Route path="series" element={<Series />} />
          <Route path="series/:id" element={<DetalhesSerie />} />
          <Route path="series/:id/elenco" element={<Elenco tipo="serie" />} />
          <Route path="pessoa/:id" element={<Pessoa />} />
          <Route path="pessoa/:id/filmes" element={<FilmesPessoa />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/:id" element={<Noticia />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="pesquisa" element={<Pesquisa />} />
          <Route path="ingresso/:id" element={<ComprarIngresso />} />
          <Route
            path="ingresso/:id/elenco"
            element={<Elenco tipo="filmes" />}
          />
          <Route path="confirmacao" element={<Confirmacao />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
