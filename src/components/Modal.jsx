import { createPortal } from "react-dom";

function Modal(props) {
    
    const { title, content, show, onClose, onConfirm, confirmText = "Conferma"} = props;
    
    
    // Contenuto Modale
    return show && createPortal (

        <div className="container-modale-overlay">
            <div className="modale">

                {/* Contenuto principale */}
                <h1> {title} </h1>
                {content}

                {/* Bottoni */}
                <div className="bottoni-modale">
                    <button className="btn-modale-annulla" onClick={onClose}> Annulla </button>
                    <button className="btn-modale-conferma" onClick={onConfirm}> {confirmText} </button>
                </div>
            </div>

        </div>,


        // Nodo del DOM in cui la modale viene montata
        document.body
    );
}

export default Modal;