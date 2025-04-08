import React from 'react';
import './addTrash.scss';

export const AddTrash = ({ onAddTrash }) => {
  return (
    <section className="addTrashSection">
      <h2>Add trash here!</h2>
      <section className="trashButtonSection">
        <div id="yellowButton" className="trashButton" onClick={() => onAddTrash('plastic')}>
          <div className="trashText">
            <h2>Plastic</h2>
            <p>+</p>
          </div>
        </div>
        <div id="greenButton" className="trashButton" onClick={() => onAddTrash('glass')}>
          <div className="trashText">
            <h2>Glass</h2>
            <p>+</p>
          </div>
        </div>
        <div id="blueButton" className="trashButton" onClick={() => onAddTrash('paper')}>
          <div className="trashText">
            <h2>Paper</h2>
            <p>+</p>
          </div>
        </div>
      </section>
    </section>
  );
};