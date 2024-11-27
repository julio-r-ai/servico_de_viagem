export const TravelOptions = () => {
    return(
        <div className="travels">
            <h1>Opções de Viagem</h1>

            <div class="map-container">
                <h2>Rota</h2>
                <h2>IMAGEM DO MAPA ESTATICO</h2>
                {/* <img id="map" src="https://via.placeholder.com/600x300" alt="Mapa Estático"> */}
            </div>

            <h2>Motoristas Disponíveis</h2>
            <div class="drivers">
                <table class="styled-table">
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
                            <td><button class="choose-btn" onclick="chooseDriver('João Silva')">Escolher</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}