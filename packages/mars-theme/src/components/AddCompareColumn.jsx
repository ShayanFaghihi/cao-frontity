import React, { useState } from "react";
import ReactModal from "react-modal";

import AppsList from "./list/AppsList";

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translateX(-50%)",
    width: '60%',
    height: '85%',
    overflowY : 'scroll'
  },
};

ReactModal.setAppElement('#root');


const AddCompareColumn = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="compare-table__app table-column choose-column">
      <div className="choose-column__box">
        <div className="choose-column__icon" onClick={openModal}>
          +
        </div>
        <p className="choose-column__text">Choose A Platform To Compare</p>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AppsList isForAdd={true} />
      </ReactModal>
    </div>
  );
};

export default AddCompareColumn;
