import React from 'react'
import { FcCheckmark, FcCancel } from "react-icons/fc";


const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: -10,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0, 0, .7)',
    zIndex: 1000

}

const MODAL_STYLES = {
    position: 'fixed',
    top: '30%',
    left: '49%',
    transform: 'translate(-50%, 50%)',
    backgroundColor: '#FFF',
    padding: '40px',
    zIndex: 1900
}

export default function DeleteModal({ open, children, onClose, onDelete }) {
    if (!open) return null;

    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <div>
                    {children}
                </div>
                <div>
                    <button onClick={onClose}><FcCancel className="w-7 h-7" /></button>
                    <button onClick={onDelete}><FcCheckmark className="w-7 h-7" /></button>
                </div>
            </div>
        </div>
    )
}