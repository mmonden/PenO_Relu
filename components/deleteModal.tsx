import React from 'react'
import { FcCheckmark, FcCancel } from "react-icons/fc";

export default function DeleteModal({ open, children, onClose, onDelete }) {
    if (!open) return null;

    return (
        <div>
            <div>
                {children}
            </div>
            <div>
                <button onClick={onDelete}><FcCheckmark className="w-7 h-7" /></button>
                <button onClick={onClose}><FcCancel className="w-7 h-7" /></button>
            </div>
        </div>
    )
}