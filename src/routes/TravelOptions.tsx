import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TravelOptions: React.FC = () => {

    interface Driver {
        id: string;
        name: string;
        description: string;
        vehicle: string;
        comment: string;
        ratePerKm: string;
        min_km: number;
    }

    const [driversData, setDriversData] = useState<Driver[]>([]);

    const getDrivers = async () => {
        try {
            const response = await fetch('http://localhost:8080/listDrivers');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
            }
            const driversData = await response.json();
            setDriversData(driversData);
            console.log('Dados:', driversData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDrivers();
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customer_id');
    const origemLatitude = queryParams.get('origemLatitude');
    const origemLogitude = queryParams.get('origemLogitude');
    const destinationLatitude = queryParams.get('destinationLatitude');
    const destinationLogitude = queryParams.get('destinationLogitude');
    const origin = queryParams.get('origem');
    const destination = queryParams.get('destination');
    const distance = queryParams.get('distance');
    const duration = queryParams.get('duration');

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x300&path=${origemLatitude},${origemLogitude}|${destinationLatitude},${destinationLogitude}&markers=color:blue|label:A|${origemLatitude},${origemLogitude}&markers=color:red|label:B|${destinationLatitude},${destinationLogitude}&key=${apiKey}`;

    const handleCreateRide = async (customer_id: string, driver: string, ratePerKm: string) => {
        
        const priceKm = parseFloat(ratePerKm);
        const numericDistance = distance ? parseFloat(distance) : 0; 
    
        if (isNaN(priceKm) || isNaN(numericDistance)) {
            console.error("Valores inválidos para cálculo");
            return;
        }
    
        const totalValue = priceKm * numericDistance; 
    
        const rideData = {
            customer_id: customer_id.toString(),
            origin: origin,
            destination: destination,
            distance: numericDistance,
            duration: duration,
            value: totalValue,
            driver: driver,
        };

        try{
            const response = await fetch('http://localhost:8080/createRide', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideData)
            });

            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.statusText}`);
            }

            navigate(`/travelHistory?customer_id=${customerId}`)

        }catch(error){
            console.error(error);
        };
    
        console.log("Ride data:", rideData);
    };

    return (
        <div className="travels">
            <h2>Rota</h2>

            <div className="map-container">
                <div>
                    <img src={mapUrl} alt="Mapa da rota" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="infoEstimate">
                    <p>
                        <strong>ID do Cliente:</strong> {customerId}
                    </p>
                    <p>
                        <strong>Origem:</strong> {origin}: {origemLatitude}, {origemLogitude}
                    </p>
                    <p>
                        <strong>Destino:</strong> {destination}: {destinationLatitude}, {destinationLogitude}
                    </p>
                    <p>
                        <strong>Distância:</strong> {distance}
                    </p>
                    <p>
                        <strong>Duração:</strong> {duration}
                    </p>
                </div>
            </div>

            <div className="line"></div>

            <div className="drivers">
                <h2>Motoristas Disponíveis</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Veículo</th>
                            <th>Avaliação</th>
                            <th>Valor da Viagem/km</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driversData.map((driver: Driver) => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.name}</td>
                                <td>{driver.description}</td>
                                <td>{driver.vehicle}</td>
                                <td>{driver.comment}</td>
                                <td>R$ {driver.ratePerKm}</td>
                                <td>
                                    <button
                                        className="choose-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCreateRide(driver.id, driver.name, driver.ratePerKm);
                                        }}
                                    >   
                                        Escolher
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};