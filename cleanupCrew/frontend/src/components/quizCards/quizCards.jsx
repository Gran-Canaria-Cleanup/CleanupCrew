import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import './quizCards.scss';

const TinderCards = () => {
  // Ref for the container element
  const tinderRef = useRef(null);

  // Ref array to store all individual card elements
  const cardRefs = useRef([]);

  // A reference to all active card DOM nodes (for swipe handling)
  const allCards = useRef([]);

  // Flag to ensure the container is only initialized once
  const containerLoaded = useRef(false);

  // Function to initialize the styling and position of the cards
  const initCards = () => {
    // Filter out any cards that have already been removed
    const newCards = allCards.current.filter(card => !card.classList.contains('removed'));

    // Stack the remaining cards visually
    newCards.forEach((card, index) => {
      card.style.zIndex = newCards.length - index;
      card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
      card.style.opacity = (10 - index) / 10;
    });

    // Add the 'loaded' class only once
    if (!containerLoaded.current) {
      tinderRef.current.classList.add('loaded');
      containerLoaded.current = true;
    }
  };

  // Create swipe gesture handling on a single card using Hammer.js
  const createHammer = (el) => {
    const hammertime = new Hammer(el);

    // While swiping (pan), apply transform and status class
    hammertime.on('pan', (event) => {
      el.classList.add('moving');

      if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0)) return;

      // Add love/nope visual indicators based on swipe direction
      tinderRef.current.classList.toggle('tinder_love', event.deltaX > 0);
      tinderRef.current.classList.toggle('tinder_nope', event.deltaX < 0);

      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      // Move the card with transform on swipe
      event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });

    // On swipe release (panend), either reset the card or fling it away
    hammertime.on('panend', (event) => {
      el.classList.remove('moving');
      tinderRef.current.classList.remove('tinder_love');
      tinderRef.current.classList.remove('tinder_nope');

      const moveOutWidth = document.body.clientWidth;

      // Decide if the card should return or be removed
      const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
      event.target.classList.toggle('removed', !keep);

      if (keep) {
        // If card should stay, reset transform
        event.target.style.transform = '';
      } else {
        // Otherwise, fling the card off screen with animation
        const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * moveOutWidth;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        event.target.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;

        // Reinitialize cards after swipe out
        initCards();
      }
    });
  };

  // Button click handler for "nope" and "love" actions
  const handleButton = (love) => (e) => {
    const cards = allCards.current.filter(card => !card.classList.contains('removed'));
    const moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return;

    const card = cards[0];
    card.classList.add('removed');

    // Slide card out left or right depending on button
    card.style.transform = love
      ? `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
      : `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;

    // Reset stack
    initCards();
    e.preventDefault();
  };

  // Set up the cards and gesture handlers once on mount
  useEffect(() => {
    // Link cardRefs to allCards for gesture logic
    allCards.current = cardRefs.current;

    // Attach Hammer.js gesture handlers to each card
    allCards.current.forEach(card => createHammer(card));

    // Initialize card layout
    initCards();
  }, []);

  // Static array of card data
  const cards = [
    { id: 1, title: 'Demo card 1' },
    { id: 2, title: 'Demo card 2' },
    { id: 3, title: 'Demo card 3' },
    { id: 4, title: 'Demo card 4' },
    { id: 5, title: 'Demo card 5' }
  ];

  return (
    <div className="tinder" ref={tinderRef}>
      {/* Icons that visually indicate swipe direction */}
      <div className="tinder--status">
        <i className="fa fa-remove"></i>
        <i className="fa fa-heart"></i>
      </div>

      {/* Card container */}
      <div className="tinder--cards">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="tinder--card"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            {/* Removed the image element */}
            <h3>{card.title}</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
        ))}
      </div>

      {/* Like/Dislike buttons */}
      <div className="tinder--buttons">
        <button id="nope" onClick={handleButton(false)}>
          <i className="fa fa-remove"></i>
        </button>
        <button id="love" onClick={handleButton(true)}>
          <i className="fa fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default TinderCards;
