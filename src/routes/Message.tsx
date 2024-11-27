import React from "react";

export const Message: React.FC = () => {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="message">
            <h2>Mensagem</h2>
            <p>Variavel da mensagem, Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro magni sunt nobis.</p>
            <button onClick={handleGoBack}>Ok</button>
        </div>
    )
}