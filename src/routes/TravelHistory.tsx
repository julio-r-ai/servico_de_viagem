import { useLocation, useNavigate } from 'react-router-dom';

export const TravelHistory = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customer_id')

    if (customerId) {
        const customerIdNumber: number = parseInt(customerId, 10);
        if (isNaN(customerIdNumber)) {
            console.error('O customer_id não é um número válido.');
        } else {
            console.log('Customer ID como número:', customerIdNumber);
        }
    } else {
        console.error('O parâmetro customer_id não está presente.');
    }

    return(
        <div className="travels">
            <h1>Histórico de Viagens</h1>

            <form id="filter-form" className="form">

                <div>
                    <label htmlFor="customer_id">ID do Usuário:</label>
                    <input type="text" name="customer_id" defaultValue={customerId ?? ''}/>
                </div>

                <div>
                    <label htmlFor="driverFilter">Filtrar por Motorista:</label>
                    <select id="driverFilter" name="driverFilter">
                        <option value="all">Todos</option>
                        <option value="Homer Simpson">Homer Simpson</option>
                        <option value="Dominic Toretto">Dominic Toretto</option>
                        <option value="James Bond">James Bond</option>
                    </select>
                </div>

                <button type="submit" className="aplicationFiltro">Aplicar Filtro</button>
            </form>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Data e Hora</th>
                        <th>Motorista</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Distância</th>
                        <th>Tempo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody id="trips-list">
                    <tr>
                        <td>25/11/2024 14:30</td>
                        <td>João Silva</td>
                        <td>Av. Paulista</td>
                        <td>Rua da Consolação</td>
                        <td>5 km</td>
                        <td>10 min</td>
                        <td>R$ 25,00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}