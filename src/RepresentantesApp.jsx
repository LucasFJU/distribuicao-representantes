import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"; // Substitua pelo seu link CSV

export default function RepresentantesApp() {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.text())
      .then(text => {
        const linhas = text.split("\n");
        const resultado = linhas.slice(1).map(linha => {
          const [nome, telefone, link] = linha.split(",");
          return { nome, telefone, link };
        });
        setDados(resultado.filter(rep => rep.nome));
      });
  }, []);

  const filtrados = dados.filter(rep =>
    rep.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Distribuição de Representantes</h1>
      <Input
        placeholder="Buscar representante..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-4">
        {filtrados.map((rep, i) => (
          <div key={i} className="flex justify-between items-center border p-4 rounded-xl shadow-sm">
            <div>
              <p className="font-semibold">{rep.nome}</p>
              <a href={rep.link} className="text-sm text-blue-600 underline" target="_blank">
                Ver material
              </a>
            </div>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                const msg = `Olá ${rep.nome}, segue o material: ${rep.link}`;
                window.open(`https://wa.me/${rep.telefone}?text=${encodeURIComponent(msg)}`);
              }}
            >
              WhatsApp
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
