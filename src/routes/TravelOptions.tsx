import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TravelOptions: React.FC = ( ) => {

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

    const getDrivers = async () =>{
        try{
            const response = await fetch('http://localhost:8080/listDrivers');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
            };
            const driversData = await response.json();
            setDriversData(driversData);
            console.log('Dados: ', driversData);
        }catch(error){
           console.log(error) ;
        };
    };

    useEffect(()=>{
        getDrivers();
    }, []);


    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customer_id');
    const origin = queryParams.get('origin');
    const destination = queryParams.get('destination');

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x300&path=${origin}|${destination}&markers=color:blue|label:A|${origin}&markers=color:red|label:B|${destination}&key=${apiKey}`;

    const handleRowClick = (customer_id: string, nameDrive: string) => {
        
    };

    const [formData, setFormData] = useState({
        customer_id: '',
        origin: '',
        destination: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent, ) => {
        e.preventDefault();
    
         try {
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
          
          navigate(`/travelHistory`);
          
        } catch (error: any) {
          console.error('Erro:', error);
        }  
    };

    return(
        <div className="travels">
            <h2>Rota</h2>

            <div className="map-container">
                <div>
                    <img src={mapUrl} alt="Mapa da rota" style={{ width: '100%', height: 'auto' }}/>
                </div>
               <div className='infoEstimate'>
                    <p><strong>ID do Cliente:</strong> {customerId}</p>
                    <p><strong>Origem:</strong> {origin}</p>
                    <p><strong>Destino:</strong> {destination}</p>
               </div>
            </div>

            <div className='line'></div>
           
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
                            <th>Valor da Viagem</th>
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
                                <td>{driver.ratePerKm}</td>
                                <td><button className="choose-btn" onClick={(e) => { e.stopPropagation(); handleRowClick(driver.id, driver.name); }} >Escolher</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}