import React from "react";
import { Modal } from "../Modal";

const SuccessModal = () => {
  return (
    <Modal>
      <h2>Yay! 🥳</h2>
      <p>You have successfully solved all the patterns.</p>
    </Modal>
  );
};

export { SuccessModal };
