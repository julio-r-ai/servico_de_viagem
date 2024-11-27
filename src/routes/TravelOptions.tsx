import React from 'react';
import { useLocation } from 'react-router-dom';

export const TravelOptions: React.FC = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customer_id');
    const origin = queryParams.get('origin');
    const destination = queryParams.get('destination');

    return(
        <div className="travels">
            <h1>Opções de Viagem</h1>

            <div className="map-container">
                <h2>Rota</h2>
                <h2>IMAGEM DO MAPA ESTATICO</h2>
                <p><strong>ID do Cliente:</strong> {customerId}</p>
                <p><strong>Origem:</strong> {origin}</p>
                <p><strong>Destino:</strong> {destination}</p>
            </div>

            <h2>Motoristas Disponíveis</h2>
            <div className="drivers">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Veículo</th>
                            <th>Avaliação</th>
                            <th>Valor da Viagem</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>João Silva</td>
                            <td>Motorista experiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ipsa amet corporis reprehenderit ducimus rem nemo. Velit deserunt eveniet fugit fuga, neque vitae, sit repellat veniam sunt ut aliquam labore!</td>
                            <td>Toyota Corolla</td>
                            <td>4.8</td>
                            <td>R$ 25,00</td>
                            <td><button className="choose-btn">Escolher</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}