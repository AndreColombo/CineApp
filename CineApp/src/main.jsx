import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./Pages/Home.jsx";
import Filmes from "./Pages/Filmes.jsx";
import DetalhesFilme from "./Pages/DetalhesFilmes.jsx";
import Noticias from "./Pages/Noticias.jsx";
import Noticia from "./Pages/Noticia.jsx";
import Sobre from "./Pages/Sobre.jsx";
import Pesquisa from "./Pages/Pesquisa.jsx";
import ComprarIngresso from "./Pages/ComprarIngresso.jsx";
import Pagamento from "./Pages/Pagamento.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="filmes" element={<Filmes />} />
          <Route path="filmes/:id" element={<DetalhesFilme />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/:id" element={<Noticia />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="pesquisa" element={<Pesquisa />} />
          <Route path="ingresso" element={<ComprarIngresso />} />
          <Route path="pagamento" element={<Pagamento />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
