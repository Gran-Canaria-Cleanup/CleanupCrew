import React, { useState } from 'react';
import './addTrash.scss';

export const AddTrash = ({ onAddTrash }) => {
  const [quantity, setQuantity] = useState(1); // Quantité par défaut

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1); // Réinitialiser à 1 si la valeur est invalide
    }
  };

  return (
    <section className="addTrashSection">
      <h2>Add trash here!</h2>
      <div className="quantityInput">
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <section className="trashButtonSection">
        <div id="yellowButton" className="trashButton" onClick={() => onAddTrash('plastic', quantity)}>
          <div className="trashText">
            <h2>Plastic</h2>
            <p>+</p>
          </div>
        </div>
        <div id="greenButton" className="trashButton" onClick={() => onAddTrash('glass', quantity)}>
          <div className="trashText">
            <h2>Glass</h2>
            <p>+</p>
          </div>
        </div>
        <div id="blueButton" className="trashButton" onClick={() => onAddTrash('paper', quantity)}>
          <div className="trashText">
            <h2>Paper</h2>
            <p>+</p>
          </div>
        </div>
      </section>
    </section>
  );
};