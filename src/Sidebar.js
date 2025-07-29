function Sidebar({
  notes,
  onAddNote,
  onTrashNote,
  onToggleFavorite,
  onRestoreNote,
  onDeleteForever,
  activeNoteId,
  setActiveNoteId,
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button className="add-button" onClick={onAddNote}>Add</button>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sidebar-categories">
        <button onClick={() => setCategory('all')}>All Notes</button>
        <button onClick={() => setCategory('favorites')}>Favorites</button>
        <button onClick={() => setCategory('trash')}>Trash</button>
      </div>

      <div className="sidebar-notes-list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${note.id === activeNoteId ? 'active' : ''}`}
            onClick={() => setActiveNoteId(note.id)}
          >
            <div className="note-item-title">
              {note.title}
              {note.isFavorited && category !== 'favorites' && <span className="fav-icon">⭐</span>}
            </div>
            <p className="note-item-preview">
              {note.body && note.body.substring(0, 60)}
            </p>
            <div className="note-item-actions">
              {category === 'trash' ? (
                <>
                  <button onClick={(e) => { e.stopPropagation(); onRestoreNote(note.id); }}>Restore</button>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteForever(note.id); }}>Delete</button>
                </>
              ) : (
                <>
                  <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(note.id); }}>Fav</button>
                  <button onClick={(e) => { e.stopPropagation(); onTrashNote(note.id); }}>Trash</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
