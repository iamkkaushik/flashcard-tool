// src/components/FlashcardViewer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardViewer = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:3000/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const nextCard = () => setCurrentIndex((currentIndex + 1) % flashcards.length);
  const prevCard = () => setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Flashcard {...flashcards[currentIndex]} />
      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default FlashcardViewer;
