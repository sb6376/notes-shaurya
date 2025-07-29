function Editor({ activeNote, onUpdateNote }) {
  if (!activeNote) {
    return <div className="editor-placeholder">Select a note or create a new one.</div>;
  }
  const handleEdit = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
    });
  };
  return (
    <div className="editor-container">
      <input
        className="editor-title"
        type="text"
        value={activeNote.title}
        onChange={(e) => handleEdit('title', e.target.value)}
        autoFocus />
      <textarea
        className="editor-body"
        value={activeNote.body}
        onChange={(e) => handleEdit('body', e.target.value)}
        placeholder="Write your note here..."/>
    </div>
  );
}
export default Editor;
