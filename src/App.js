import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Editor from './Editor';
function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes-app-data')) || []
  );
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
  }, [notes]);
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(), 
      title: 'New Note',
      body: 'Write something...',
      isFavorited: false,
      isTrashed: false,
    };
    setNotes([newNote, ...notes]); 
    setCategory('all'); 
    setActiveNoteId(newNote.id); 
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote; 
      }
      return note; 
    });
    setNotes(updatedNotesArray);
  };

  const handleTrashNote = (id) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isTrashed: true, isFavorited: false };
      }
      return note;
    });
    setNotes(updatedNotesArray);
    if (id === activeNoteId) {
      setActiveNoteId(null);
    }
  };

  const handleToggleFavorite = (id) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isFavorited: !note.isFavorited };
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const handleRestoreNote = (id) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isTrashed: false };
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const handleDeleteForever = (id) => {
    const updatedNotesArray = notes.filter((note) => note.id !== id);
    setNotes(updatedNotesArray);
  };

  const getVisibleNotes = () => {
    let filteredNotes = notes;
    if (category === 'all') {
      filteredNotes = notes.filter((note) => !note.isTrashed);
    } else if (category === 'favorites') {
      filteredNotes = notes.filter((note) => !note.isTrashed && note.isFavorited);
    } else if (category === 'trash') {
      filteredNotes = notes.filter((note) => note.isTrashed);
    }
    if (searchTerm) {
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredNotes;
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId);
  };
  return (
    <div className="App">
      <Sidebar
        notes={getVisibleNotes()}
        onAddNote={handleAddNote}
        onTrashNote={handleTrashNote}
        onToggleFavorite={handleToggleFavorite}
        onRestoreNote={handleRestoreNote}
        onDeleteForever={handleDeleteForever}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Editor
        activeNote={getActiveNote()}
        onUpdateNote={handleUpdateNote}
      />
    </div>
  );
}

export default App;