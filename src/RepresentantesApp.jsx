import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"; // Substitua pelo seu link CSV

export default function RepresentantesApp() {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const linhas = text.split("\n");
        const resultado = linhas.slice(1).map((linha) => {
          const [nome, telefone, link] = linha.split(",");
          return { nome, telefone, link };
        });
        setDados(resultado);
      });
  }, []);

  const dadosFiltrados = dados.filter((dado) =>
    dado.nome?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Representantes</h1>
      
      <Input
        type="text"
        placeholder="Buscar por nome..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <ul className="mt-4 space-y-4">
        {dadosFiltrados.map((dado, index) => (
          <li key={index} className="p-4 border rounded shadow-sm">
            <p className="font-semibold">{dado.nome}</p>
            <p>{dado.telefone}</p>
            <a href={dado.link} target="_blank" rel="noopener noreferrer">
              <Button>Acessar contato</Button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
