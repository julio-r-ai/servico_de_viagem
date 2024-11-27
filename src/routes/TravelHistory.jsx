export const TravelHistory = () => {
    return(
        <div className="travels">
            <h1>Histórico de Viagens</h1>

            <form id="filter-form" className="form">

                <div>
                    <label for="customer_id">ID do Usuário:</label>
                    <input type="text" name="customer_id"/>
                </div>

                <div>
                    <label for="driverFilter">Filtrar por Motorista:</label>
                    <select id="driverFilter" name="driverFilter">
                        <option value="all">Todos</option>
                        <option value="João Silva">João Silva</option>
                        <option value="Maria Santos">Maria Santos</option>
                    </select>
                </div>

                <button type="submit" className="aplicationFiltro">Aplicar Filtro</button>
            </form>

            <table class="styled-table">
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