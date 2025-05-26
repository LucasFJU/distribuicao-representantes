
import { useState, useEffect } from "react";

const senhaPadrao = "admin123"; // Troque por uma senha segura

export default function AdminPanel() {
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [dados, setDados] = useState([{ nome: "", telefone: "", link: "" }]);

  const handleChange = (index, field, value) => {
    const novo = [...dados];
    novo[index][field] = value;
    setDados(novo);
  };

  const adicionar = () => setDados([...dados, { nome: "", telefone: "", link: "" }]);

  const baixarCSV = () => {
    const linhas = ["Nome,Telefone,Link", ...dados.map(d => `${d.nome},${d.telefone},${d.link}`)];
    const blob = new Blob([linhas.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "representantes.csv";
    a.click();
  };

  if (!autenticado) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          className="border rounded w-full p-2 mb-4"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          onClick={() => setAutenticado(senha === senhaPadrao)}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Painel de Representantes</h1>
      {dados.map((rep, i) => (
        <div key={i} className="grid grid-cols-3 gap-2 mb-4">
          <input
            type="text"
            placeholder="Nome"
            value={rep.nome}
            onChange={e => handleChange(i, "nome", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={rep.telefone}
            onChange={e => handleChange(i, "telefone", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Link do material"
            value={rep.link}
            onChange={e => handleChange(i, "link", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      ))}
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={adicionar}>
          + Adicionar
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={baixarCSV}>
          📥 Exportar CSV
        </button>
      </div>
    </div>
  );
}
