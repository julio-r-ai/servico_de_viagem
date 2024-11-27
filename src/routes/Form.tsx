export const FormTravelRequest = () => {
    return(
        <form action="" className="form">
            <h2 className="titleForm">Faça sua estimativa de viagem</h2>
            <div>
                <label htmlFor="customer_id">Informe o ID do usuário:</label>
                <input type="number" name="customer_id"/>
            </div>
            <div>
                <label htmlFor="origin">Origem de saida:</label>
                <input type="text" name="origin"/>
            </div>
            <div>
                <label htmlFor="destination">Destino:</label>
                <input type="text" name="destination"/>
            </div>
            <div><button type="submit" className="button">Estimar Valor</button></div>
        </form>
        
    )
}