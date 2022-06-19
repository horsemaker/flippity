import "./Modal.css";

const Modal = ({ children }) => {
  return (
    <div className="modal__container">
      <div className="modal">{children}</div>
    </div>
  );
};

export { Modal };
