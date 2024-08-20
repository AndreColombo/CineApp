import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function sendEmail(e) {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("Nem todos os campos estão preenchidos");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

    emailjs
      .send(
        "service_l8pbtlq",
        "template_ew59ieq",
        templateParams,
        "PmD3D2WM3cQCWNZNA"
      )
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          setName("");
          setEmail("");
          setMessage("");
        },
        (err) => {
          console.log("ERRO: ", err);
        }
      );
  }

  return (
    <>
      <form onSubmit={sendEmail} className="flex flex-col items-center py-16">
        <input
          type="text"
          placeholder="Digite seu nome"
          className="w-6/12 h-8 p-2 m-3 rounded-md "
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Digite seu email"
          className="w-6/12 h-8 p-2 m-3 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <textarea
          type="text"
          placeholder="Digite sua mensagem..."
          className="w-6/12 h-24 p-2 m-3 rounded-md "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          type="submit"
          value="Enviar"
          className=" w-6/12 h-8 m-3 rounded-md text-white bg-B0"
        />
      </form>
    </>
  );
}
