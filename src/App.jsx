import { useState } from "react";

export default function App() {
  const [ecuacion, setEcuacion] = useState("x + y"); // dy/dx = f(x,y)
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(1);
  const [h, setH] = useState(0.1); // paso
  const [n, setN] = useState(10); // número de iteraciones
  const [resultados, setResultados] = useState([]);

  const calcularEuler = () => {
    let puntos = [];
    let x = parseFloat(x0);
    let y = parseFloat(y0);
    let paso = parseFloat(h);
    let iter = parseInt(n);

    for (let i = 0; i <= iter; i++) {
      puntos.push({ x, y });

      try {
        const f = new Function("x", "y", `return ${ecuacion}`);
        let dydx = f(x, y);
        y = y + paso * dydx;
        x = x + paso;
      } catch (error) {
        alert("Error en la ecuación. Usa variables x y y.");
        return;
      }
    }

    setResultados(puntos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow">
        📘 Calculadora de Ecuaciones Diferenciales
      </h1>

      {/* Card de inputs */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Parámetros iniciales
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">
              Ecuación (dy/dx = f(x,y))
            </span>
            <input
              type="text"
              value={ecuacion}
              onChange={(e) => setEcuacion(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">x₀</span>
            <input
              type="number"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">y₀</span>
            <input
              type="number"
              value={y0}
              onChange={(e) => setY0(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Paso (h)</span>
            <input
              type="number"
              step="0.01"
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col col-span-2">
            <span className="text-sm font-medium text-gray-600">
              Número de iteraciones
            </span>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <button
          onClick={calcularEuler}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
        >
          🚀 Calcular
        </button>
      </div>

      {/* Resultados */}
      {resultados.length > 0 && (
        <div className="mt-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            📊 Resultados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-gradient-to-r from-blue-200 to-purple-200">
                  <th className="p-2 border border-gray-300">i</th>
                  <th className="p-2 border border-gray-300">x</th>
                  <th className="p-2 border border-gray-300">y</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-2 border border-gray-200">{i}</td>
                    <td className="p-2 border border-gray-200">
                      {p.x.toFixed(4)}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {p.y.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
