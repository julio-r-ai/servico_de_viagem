import React from "react";
import { useLocation } from "react-router-dom";

export const Message: React.FC = () => {

    const handleGoBack = () => {
        window.history.back();
    };

    const location = useLocation();
    const errorMessage = location.state?.errorMessage || 'Ocorreu um erro desconhecido';

    return (
        <div className="message">
            <h2>Mensagem</h2>
            <p>{errorMessage}</p>
            <p>Tente novamente.</p>
            <button onClick={handleGoBack}>Ok</button>
        </div>
    )
}