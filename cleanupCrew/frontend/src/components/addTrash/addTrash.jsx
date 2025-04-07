import React from 'react';
import './addTrash.scss';

export const AddTrash = () => {
  return (
    <section className='addTrashSection'>
        <h2>Add trash here!</h2>
        <section className='trashButtonSection'>
            <div id='yellowButton' className='trashButton'> 
                <div className='trashText'>
                <h2>Plastic</h2>
                <p>+</p>
                </div>
            </div>
            <div id='greenButton' className='trashButton'> 
            <div className='trashText'>
                <h2>Glass</h2>
                <p>+</p>
            </div>
            </div>
            <div id='blueButton' className='trashButton'> 
            <div className='trashText'>
                <h2>Paper</h2>
                <p>+</p>
            </div>
            </div>
        </section>
    </section>
  );
};