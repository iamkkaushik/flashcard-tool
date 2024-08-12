// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css'

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    axios.get('https://striveras.onrender.com/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  };

  const addFlashcard = () => {
    axios.post('https://striveras.onrender.com/flashcards', { question, answer })
      .then(() => {
        fetchFlashcards();
        setQuestion('');
        setAnswer('');
      })
      .catch(error => console.error('Error adding flashcard:', error));
  };

  const updateFlashcard = () => {
    axios.put(`https://striveras.onrender.com/flashcards/${editId}`, { question, answer })
      .then(() => {
        fetchFlashcards();
        setQuestion('');
        setAnswer('');
        setEditId(null);
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  const deleteFlashcard = (id) => {
    axios.delete(`https://striveras.onrender.com/flashcards/${id}`)
      .then(() => fetchFlashcards())
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <div className='dashboard'>
      <h2>FlashCards</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className='ip2'
      />
      <button onClick={editId ? updateFlashcard : addFlashcard}>
        {editId ? 'Update' : 'Add'}
      </button>

      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id}>
            {flashcard.question} - {flashcard.answer}
            <button onClick={() => {
              setEditId(flashcard.id);
              setQuestion(flashcard.question);
              setAnswer(flashcard.answer);
            }}>Edit</button>
            <button onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
