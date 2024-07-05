import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function TrocarTema() {
  const [dark, setDark] = useState(() => {
    // Carregar o tema atual do localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Aplicar o tema ao carregar a página
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const trocarTema = () => {
    setDark(!dark);
    // Salvar o tema atual no localStorage
    localStorage.setItem("theme", !dark ? "dark" : "light");
  };

  return (
    <div>
      {dark ? (
        <SunIcon
          className="w-7 h-7 text-FF cursor-pointer"
          onClick={trocarTema}
        />
      ) : (
        <MoonIcon
          className="w-7 h-7 text-26 cursor-pointer"
          onClick={trocarTema}
        />
      )}
    </div>
  );
}
