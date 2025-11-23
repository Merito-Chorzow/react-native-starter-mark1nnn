import React, { createContext, useState, useEffect } from 'react';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await res.json();
      const mapped = data.map(p => ({
        id: String(p.id),
        title: p.title.slice(0, 40),
        description: p.body,
        date: new Date().toISOString(),
        photo: null,
        location: null,
      }));
      setNotes(mapped);
    } catch (e) {
      console.warn('fetchNotes error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async note => {
    const newNote = { ...note, id: String(Date.now()), date: new Date().toISOString() };
    setNotes(s => [newNote, ...s]);
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newNote.title, body: newNote.description }),
      });
    } catch (e) {
      console.warn('addNote API error', e.message);
    }
  };

  const updateNote = (id, patch) => {
    setNotes(s => s.map(n => (n.id === id ? { ...n, ...patch } : n)));
  };

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, updateNote, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
