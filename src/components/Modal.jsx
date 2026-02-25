import { createPortal } from "react-dom";

function Modal(props) {
    
    const { title, content, show, onClose, onConfirm, confirmText = "Conferma"} = props;
    
    
    // Contenuto Modale
    return show && createPortal (

        <div className="modale-overlay">
            <div className="modale">

                {/* Contenuto principale */}
                <h1> {title} </h1>
                <p> {content} </p>

                {/* Bottoni */}
                <button onClick={onClose}> Annulla </button>
                <button onClick={onConfirm}> {confirmText} </button>
            </div>

        </div>,


        // Nodo del DOM in cui la modale viene montata
        document.body
    );
}

export default Modal;