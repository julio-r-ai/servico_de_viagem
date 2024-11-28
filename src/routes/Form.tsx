import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const FormTravelRequest: React.FC = () => {
    const [formData, setFormData] = useState({
        customer_id: '',
        origin: '',
        destination: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        navigate(`/travelOptions?customer_id=${formData.customer_id}&origin=${formData.origin}&destination=${formData.destination}`);
    
        /* try {
            const response = await fetch('http://localhost:8080/createRide', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
          });
    
          if (!response.ok) {
            throw new Error('Erro ao enviar os dados'); 
          }
          
          navigate(`/travelOptions?customer_id=${formData.customer_id}&origin=${formData.origin}&destination=${formData.destination}`);
          
        } catch (error: any) {
          console.error('Erro:', error);
        }  */ 
    };

    return(
        <form onSubmit={handleSubmit} className="form">
            <h2 className="titleForm">Faça sua estimativa de viagem</h2>
            <div>
                <label htmlFor="customer_id">Informe o ID do usuário:</label>
                <input type="text" required  name="customer_id" value={formData.customer_id}  onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="origin: '',
                ">Origem de saida:</label>
                <input type="text" name="origin" required value={formData.origin} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="destination">Destino:</label>
                <input type="text" name="destination" required value={formData.destination} onChange={handleChange}/>
            </div>
            <div><button type="submit" className="button">Estimar Valor</button></div>
        </form>
    )
}