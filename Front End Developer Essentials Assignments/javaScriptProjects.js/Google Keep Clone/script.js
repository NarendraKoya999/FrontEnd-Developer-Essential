//complete my deleteHistory Function?

const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNotes');
const notesDiv = document.getElementById('notes');


//When Refreshing the web Page ,the entire previous added data is shown on the Web Page
showNotes();

//Implementing Add Notes Function and Storing the Data using Local Storage
function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }

    if(addText.value == ''){
        alert('Add your note');
        return;
    }
    
    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

//Implementing Show Notes Function and Showing the Data using Local Storage
function showNotes(){
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i=0; i<notes.length; i++){
        notesHTML += `<div class="note">
                         <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                         <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
                         <div class="text">${notes[i].text}</div>
                      </div>`
    }
    notesDiv.innerHTML = notesHTML;
}

//Implementing Delete Notes and Deleting the Data using Local Storage
function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
addNoteButton.addEventListener('click', addNotes);
