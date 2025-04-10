import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import './quizCards.scss';
import nopesvg from "../../assets/images/nope.svg";
import yessvg from "../../assets/images/yes.svg";

const TinderCards = () => {
  const tinderRef = useRef(null);
  const cardRefs = useRef([]);
  const allCards = useRef([]);
  const containerLoaded = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { id: 1, question: 'Does recycling one aluminum can save enough energy to power a TV for 3 hours?', correctAnswer: true },
    { id: 2, question: 'Can putting food waste in landfills create methane gas?', correctAnswer: true },
    { id: 3, question: 'Is it more eco-friendly to throw away glass than to recycle it?', correctAnswer: false },
    { id: 4, question: 'Do fast fashion brands usually reduce textile waste?', correctAnswer: false },
    { id: 5, question: 'Does plastic ever fully break down in nature?', correctAnswer: false },
    { id: 6, question: 'Can turning off unused electronics help reduce carbon emissions?', correctAnswer: true },
    { id: 7, question: 'Is producing bottled water more energy-efficient than tap water?', correctAnswer: false },
    { id: 8, question: 'Does recycling paper save water and energy?', correctAnswer: true },
    { id: 9, question: 'Is e-waste a bigger problem in high-income countries only?', correctAnswer: false },
    { id: 10, question: 'Can planting native plants help reduce water usage in gardens?', correctAnswer: true },
  ];

  const initCards = () => {
    const newCards = allCards.current.filter(card => !card.classList.contains('removed'));

    newCards.forEach((card, index) => {
      if (index >= 3) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
        card.style.zIndex = newCards.length - index;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
      }
    });

    if (!containerLoaded.current) {
      tinderRef.current.classList.add('loaded');
      containerLoaded.current = true;
    }
  };

  const checkAnswer = (cardElement, isYesSwipe) => {
    const questionId = parseInt(cardElement.dataset.id);
    const currentQuestion = cards.find(q => q.id === questionId);
    const userAnswer = isYesSwipe;
    const correct = userAnswer === currentQuestion.correctAnswer;

    const feedbackEl = cardElement.querySelector('.feedback');
    feedbackEl.textContent = correct ? 'Correct!' : 'Wrong!';
    feedbackEl.classList.add(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      feedbackEl.textContent = '';
      feedbackEl.classList.remove('correct', 'wrong');
    }, 3000);

    console.log(
      `Q${questionId}: ${currentQuestion.question} — You answered: ${userAnswer ? 'Yes' : 'No'} — ${correct ? '✅ Correct!' : '❌ Wrong!'}`
    );

    setCurrentIndex(prev => Math.min(prev + 1, cards.length));
  };

  const createHammer = (el) => {
    const hammertime = new Hammer(el);

    hammertime.on('pan', (event) => {
      el.classList.add('moving');
      if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0)) return;

      tinderRef.current.classList.toggle('tinder_love', event.deltaX > 0);
      tinderRef.current.classList.toggle('tinder_nope', event.deltaX < 0);

      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });

    hammertime.on('panend', (event) => {
      el.classList.remove('moving');
      tinderRef.current.classList.remove('tinder_love');
      tinderRef.current.classList.remove('tinder_nope');

      const moveOutWidth = document.body.clientWidth;
      const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
      event.target.classList.toggle('removed', !keep);

      if (keep) {
        event.target.style.transform = '';
      } else {
        const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * moveOutWidth;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        event.target.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;

        checkAnswer(event.target, event.deltaX > 0);
        initCards();
      }
    });
  };

  const handleButton = (love) => (e) => {
    const cards = allCards.current.filter(card => !card.classList.contains('removed'));
    const moveOutWidth = document.body.clientWidth * 1.5;
    if (!cards.length) return;

    const card = cards[0];
    card.classList.add('removed');

    card.style.transform = love
      ? `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
      : `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;

    checkAnswer(card, love);
    initCards();
    e.preventDefault();
  };

  useEffect(() => {
    allCards.current = cardRefs.current;
    allCards.current.forEach(card => createHammer(card));
    initCards();
  }, []);

  return (
    <section className='quizBody'>
          {/* Progress Bar Section */}
          <div className="quiz-progress">
        <div className="quiz-progress__info">
          Question {Math.min(currentIndex + 1, cards.length)} of {cards.length}
        </div>
        <div className="quiz-progress__bar">
          <div
            className="quiz-progress__bar--fill"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>
    <div className="tinder" ref={tinderRef}>


      <div className="tinder--status">
        <i className="fa fa-remove"></i>
        <i className="fa fa-heart"></i>
      </div>

      <div className="tinder--cards">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="tinder--card"
            data-id={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <h3>{card.question}</h3>
            <p>Swipe right for "Yes", left for "No"</p>
            <div className="feedback" />
          </div>
        ))}
      </div>

      <div className="tinder--buttons">
        <button id="nope" onClick={handleButton(false)}>
          <img src={nopesvg} alt="" />
          <i className="fa fa-remove"></i>
        </button>
        <button id="love" onClick={handleButton(true)}>
          <img src={yessvg} alt="" />
          <i className="fa fa-heart"></i>
        </button>
      </div>
    </div>
    </section>
  );
};

export default TinderCards;
