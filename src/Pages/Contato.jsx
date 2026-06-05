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

    emailjs.send("service_l8pbtlq", "template_ew59ieq", templateParams, "PmD3D2WM3cQCWNZNA").then(
      (response) => {
        console.log("EMAIL ENVIADO", response.status, response.text);
        setName("");
        setEmail("");
        setMessage("");
      },
      (err) => {
        console.log("ERRO: ", err);
      },
    );
  }

  return (
    <>
      <form onSubmit={sendEmail} className='flex flex-col items-center py-16'>
        <input type='text' placeholder='Digite seu nome' className='m-3 h-8 w-6/12 rounded-md p-2' onChange={(e) => setName(e.target.value)} value={name} />
        <input type='email' placeholder='Digite seu email' className='m-3 h-8 w-6/12 rounded-md p-2' onChange={(e) => setEmail(e.target.value)} value={email} />
        <textarea
          type='text'
          placeholder='Digite sua mensagem...'
          className='m-3 h-24 w-6/12 rounded-md p-2'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input type='submit' value='Enviar' className='m-3 h-8 w-6/12 rounded-md bg-B0 text-white' />
      </form>
    </>
  );
}
