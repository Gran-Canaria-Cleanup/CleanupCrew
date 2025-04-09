import React, { useState } from 'react';
import './addTrash.scss';

export const AddTrash = ({ onAddTrash }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrashType, setSelectedTrashType] = useState('');
  const [count, setCount] = useState(1);

  const openModal = (type) => {
    setSelectedTrashType(type);
    setCount(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTrashType('');
  };

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSave = () => {
    // Mappe le type affiché dans la modale (Plastic, Glass, Paper) au type attendu par l'API (plastic, glass, paper)
    const trashType = selectedTrashType.toLowerCase();
    onAddTrash(trashType, count); // Appelle la fonction onAddTrash avec le type et la quantité
    closeModal(); // Ferme la modale après avoir sauvegardé
  };

  const getModalColorClass = () => {
    switch (selectedTrashType) {
      case 'Plastic':
        return 'yellowModal';
      case 'Glass':
        return 'greenModal';
      case 'Paper':
        return 'blueModal';
      default:
        return '';
    }
  };

  return (
    <section className="addTrashSection">
      <h2>Add trash here!</h2>

      <section className="trashButtonSection">
        {modalOpen ? (
          <div className={`inlineModal styledModal ${getModalColorClass()}`}>
            <button className="closeButton" onClick={closeModal}>×</button>
            <p>How many {selectedTrashType.toLowerCase()} items you want to add?</p>
            <div className="rowControls">
              <div className="counterWrapper">
                <button onClick={decrement}>−</button>
                <span>{count}</span>
                <button onClick={increment}>+</button>
              </div>
              <button className="saveButton" onClick={handleSave}>Save</button>
            </div>
          </div>
        ) : (
          <>
            <div id="yellowButton" className="trashButton" onClick={() => openModal('Plastic')}>
              <div className="trashText">
                <h2>Plastic</h2>
                <p>+</p>
              </div>
            </div>
            <div id="greenButton" className="trashButton" onClick={() => openModal('Glass')}>
              <div className="trashText">
                <h2>Glass</h2>
                <p>+</p>
              </div>
            </div>
            <div id="blueButton" className="trashButton" onClick={() => openModal('Paper')}>
              <div className="trashText">
                <h2>Paper</h2>
                <p>+</p>
              </div>
            </div>
          </>
        )}
      </section>
    </section>
  );
};