import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiResponse = {
  distance: number; 
  duration: string; 
  origemLatitude: number;
  origemLogitude: number;
  destinationLatitude: number;
  destinationLogitude: number;
};

export const FormTravelRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  });

  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        origin: formData.origin,
        destination: formData.destination,
      });

      const response = await fetch(`http://localhost:8080/apiGoogle?${params.toString()}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            origin: formData.origin,
            destination: formData.destination,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();
      setData(result);
      setError(null);

      navigate(
        `/travelOptions?customer_id=${formData.customer_id}&distance=${result.distance}&duration=${result.duration}&origemLatitude=${result.origemLatitude}&origemLogitude=${result.origemLogitude}&destinationLatitude=${result.destinationLatitude}$destinationLogitude=${result.destinationLogitude}`
      );
      
    } catch (e: any) {
      setError("Erro ao buscar dados. Verifique os valores ou a API.");
      console.error("Erro na solicitação:", e.message || e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titleForm">Faça sua estimativa de viagem</h2>

     
      <div>
        <label htmlFor="customer_id">Informe o ID do usuário:</label>
        <input
          type="text"
          required
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
        />
      </div>

     
      <div>
        <label htmlFor="origin">Origem de saída:</label>
        <input
          type="text"
          name="origin"
          required
          value={formData.origin}
          onChange={handleChange}
        />
      </div>

     
      <div>
        <label htmlFor="destination">Destino:</label>
        <input
          type="text"
          name="destination"
          required
          value={formData.destination}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit" className="button">
          Estimar Valor
        </button>
      </div>


      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {data && (
        <div>
          <h3>Resultados da API:</h3>
          <p>
            <strong>Distância:</strong> {data.distance} km
          </p>
          <p>
            <strong>Duração:</strong> {data.duration}
          </p>
          <p>
            <strong>Coordenadas de Origem:</strong>{" "}
            {data.origemLatitude}, {data.origemLogitude}
          </p>
          <p>
            <strong>Coordenadas de Destino:</strong>{" "}
            {data.destinationLatitude}, {data.destinationLogitude}
          </p>
        </div>
      )}
    </form>
  );
};