const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const deleteNoteButton = document.getElementById('deleteNote');
const archiveNoteButton = document.getElementById('archiveNote');
const editNoteButton = document.getElementById('editNote');
const clearDeleteHistoryButton = document.getElementById('clearDeleteHistory');
const clearArchiveHistoryButton = document.getElementById('clearArchiveHistory');
const deleteNoteHistory = document.getElementById('deleteNoteHistory');
const archiveNoteHistory = document.getElementById('archiveNoteHistory');
const title = document.getElementById('title');
const text = document.getElementById('text');

let notes = [];
let deletedNotesHistory = [];
let archivedNotesHistory = [];

// Load notes and history from local storage using getItem() method on page load
  window.addEventListener('DOMContentLoaded', () => {
  const storedNotes = localStorage.getItem('notes');
  const storedDeletedNotesHistory = localStorage.getItem('deletedNotesHistory');
  const storedArchivedNotesHistory = localStorage.getItem('archivedNotesHistory');
  
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    renderNotes();
  }
  
  if (storedDeletedNotesHistory) {
    deletedNotesHistory = JSON.parse(storedDeletedNotesHistory);
    showDeletedNotesHistory();
  }
  
  if (storedArchivedNotesHistory) {
    archivedNotesHistory = JSON.parse(storedArchivedNotesHistory);
    showArchivedNotesHistory();
  }
});

/*addNote feature for adding notes with calling renderNote() and saveNotesToLocalStorage() 
callback functions*/
function addNote() {
  const titleValue = addTitle.value;
  const textValue = addText.value;
  if (titleValue.trim() !== '' && textValue.trim() !== '') {
    const note = {
      title: titleValue,
      text: textValue,
      id: notes.length + 1
    };
    notes.push(note);
    addTitle.value = '';
    addText.value = '';
    renderNotes();
    saveNotesToLocalStorage();
  } else {
    alert('Please enter a title and text');
  }
}

// renderNotes feature for rendering the add notes data with calling showNote() callback function
function renderNotes() {
  notesDiv.innerHTML = '';
  for (const note of notes) {
    const noteElement = document.createElement('div');
    noteElement.innerHTML = `<h3>${note.title}</h3><p>${note.text}</p>`;
    noteElement.dataset.id = note.id;
    noteElement.addEventListener('click', showNote);
    notesDiv.appendChild(noteElement);
  }
}

// showNote feature for showing the added notes data on the web page
function showNote() {
  const id = this.dataset.id;
  const note = notes.find(note => note.id == id);
  title.textContent = note.title;
  text.textContent = note.text;
}

/* deleteNote feature for deleting the added particular notes data with 
calling renderNote() and saveNotesToLocalStorage() callback functions */
function deleteNote() {
  const id = notesDiv.querySelector('[data-id]').dataset.id;
  const noteIndex = notes.findIndex(note => note.id == id);
  if (noteIndex !== -1) {
    const note = notes.splice(noteIndex, 1)[0];
    renderNotes();
    saveNotesToLocalStorage();
    deletedNotesHistory.push(`${note.title} deleted`);
    saveDeletedNotesHistoryToLocalStorage();
    showDeletedNotesHistory();
  }
}

/* archiveNote feature for retrieving the added and deleted notes data with calling renderNotes(),
 saveArchivedNotesHistoryToLocalStorage(), showArchivedNotesHistory() and 
 saveNotesToLocalStorage() callback functions */
function archiveNote() {
  const id = notesDiv.querySelector('[data-id]').dataset.id;
  const noteIndex = notes.findIndex(note => note.id == id);
  if (noteIndex !== -1) {
    const note = notes.splice(noteIndex, 1)[0];
    renderNotes();
    saveNotesToLocalStorage();
    archivedNotesHistory.push(`${note.title} archived`);
    saveArchivedNotesHistoryToLocalStorage();
    showArchivedNotesHistory();
  }
}

// editNote feature for editing particular addNote() notes data with calling deleteNote() callback function
function editNote() {
  const id = notesDiv.querySelector('[data-id]').dataset.id;
  const note = notes.find(note => note.id == id);
  addTitle.value = note.title;
  addText.value = note.text;
  deleteNote();
  }
  
  /*showDeletedNotesHistory feature for showing deleted notes history data 
  even after refreshing the web page */
  function showDeletedNotesHistory() {
  deleteNoteHistory.innerHTML = '';
  for (const noteHistory of deletedNotesHistory) {
  const historyElement = document.createElement('p');
  historyElement.textContent = noteHistory;
  deleteNoteHistory.appendChild(historyElement);
  }
  }
 
  /*showArchivedNotesHistory feature for showing archived notes history data 
  even after refreshing the web page*/
  function showArchivedNotesHistory() {
  archiveNoteHistory.innerHTML = '';
  for (const noteHistory of archivedNotesHistory) {
  const historyElement = document.createElement('p');
  historyElement.textContent = noteHistory;
  archiveNoteHistory.appendChild(historyElement);
  }
  }
  
  /*saveNotesToLocalStorage feature for saving notes data to local storage */
  function deleteHistory() {
  deletedNotesHistory = [];
  saveDeletedNotesHistoryToLocalStorage();
  showDeletedNotesHistory();
  }
  
  /* archiveHistory feature for retrieving the previous archived notes data with calling
   saveArchivedNotesHistoryToLocalStorage() and showArchivedNotesHistory() callback functions*/
  function archiveHistory() {
  archivedNotesHistory = [];
  saveArchivedNotesHistoryToLocalStorage();
  showArchivedNotesHistory();
  }
  
  /*saveNotesToLocalStorage feature for saving notes data to local storage */
  function saveNotesToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  /*saveDeletedNotesHistoryToLocalStorage feature for saving deleted notes data to local storage */
  function saveDeletedNotesHistoryToLocalStorage() {
  localStorage.setItem('deletedNotesHistory', JSON.stringify(deletedNotesHistory));
  }
  
  /*saveArchivedNotesHistoryToLocalStorage feature for saving archived notes data to local storage */
  function saveArchivedNotesHistoryToLocalStorage() {
  localStorage.setItem('archivedNotesHistory', JSON.stringify(archivedNotesHistory));
  }
  
  /* Actions performed on above all particular features using Event Listeners */
  addNoteButton.addEventListener('click', addNote);
  deleteNoteButton.addEventListener('click', deleteNote);
  archiveNoteButton.addEventListener('click', archiveNote);
  editNoteButton.addEventListener('click', editNote);
  clearDeleteHistoryButton.addEventListener('click', deleteHistory);
  clearArchiveHistoryButton.addEventListener('click', archiveHistory);
  
  /* calling relative functions based upon the above features */
  renderNotes();
  showDeletedNotesHistory();
  showArchivedNotesHistory();
  
  