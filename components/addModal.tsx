import React from "react";
import Modal from 'react-modal';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { AddForm } from "./addForm";



const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: -10,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0, 0, .7)",
    zIndex: 1000,
};

const MODAL_STYLES = {
    position: "fixed",
    top: "30%",
    left: "49%",
    transform: "translate(-50%, 50%)",
    backgroundColor: "#FFF",
    padding: "40px",
    zIndex: 1900,
};

type AddModalProps = {
    open: boolean;
}


export default function AddModal({ open }: AddModalProps) {
    if (!open) return null;
    console.log(open)
    return (
        <Modal isOpen={open}>
            <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
                    explicabo hic incidunt placeat quasi repellendus soluta,
                    vero. Autem delectus est laborum minus modi molestias
                    natus provident, quidem rerum sint, voluptas!</p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-default'>
                    Close
                </button>
                <button className='btn btn-primary'>
                    Save changes
                </button>
            </Modal.Footer>
        </Modal>
        // <div style={OVERLAY_STYLES}>
        //   <div style={MODAL_STYLES}>
        //     <div>{children}</div>
        //     <div className="flex justify-center space-x-2">
        //       <button onClick={onDelete}>
        //         <FcCheckmark className="w-7 h-7" />
        //       </button>
        //       <button onClick={onClose}>
        //         <FcCancel className="w-7 h-7" />
        //       </button>
        //     </div>
        //   </div>
        // </div>
    );
}
