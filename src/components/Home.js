import React, { useState, useEffect } from 'react';
// import './App.css'; // Import the CSS file

function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Fetch flashcards from the backend
    fetch('/api/flashcards')
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-container">
      {flashcards.length > 0 ? (
        <div className="flashcard">
          <p>{flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}</p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <div className="buttons">
        <button onClick={handlePrev} disabled={flashcards.length === 1}>
          Previous
        </button>
        <button onClick={handleFlip}>
          {flipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button onClick={handleNext} disabled={flashcards.length === 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
