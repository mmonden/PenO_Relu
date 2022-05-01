import React from "react";
import { FcCheckmark, FcCancel } from "react-icons/fc";

export default function DeleteModal({ open, string, onClose, onDelete }) {
  if (!open) return null;

  return (
    <div className="space-y-4">
      <div className="text-2xl">{string}</div>
      <div className="flex justify-center space-x-4">
        <button onClick={onDelete}>
          <FcCheckmark className="w-7 h-7" />
        </button>
        <button onClick={onClose}>
          <FcCancel className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
