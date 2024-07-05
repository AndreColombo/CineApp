import React from "react";

export default function Confirmacao() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const tipoIngresso = localStorage.getItem("tipoIngresso");
  const quantidade = localStorage.getItem("quantidade");

  return (
    <div className="text-26 dark:text-FF p-14">
      <h1 className="font-bold text-xl my-5">Confirmação da Compra</h1>
      <p>Obrigado pela sua compra, {name}!</p>
      <p>Detalhes da compra:</p>
      <ul>
        <li>Tipo de ingresso: {tipoIngresso}</li>
        <li>Quantidade: {quantidade}</li>
        <li>E-mail: {email}</li>
      </ul>
    </div>
  );
}
