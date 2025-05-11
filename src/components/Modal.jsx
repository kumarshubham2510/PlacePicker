<<<<<<< HEAD
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = function Modal({ children, open, onClose }) {
=======
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
>>>>>>> recover-lost-work
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
<<<<<<< HEAD
    document.getElementById("modal")
  );
};
=======
    document.getElementById('modal')
  );
}
>>>>>>> recover-lost-work

export default Modal;
