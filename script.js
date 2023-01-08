let addBtn = document.getElementById('btn');
let app = document.getElementById('app');

getNote().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    app.insertBefore(noteEl, addBtn)
});

function createNoteEl(id, content){
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = 'Note here';
    element.value = content;

    element.addEventListener('dblclick', ()=>{
        const warning = confirm('Delete note?')

        if(warning){
            deleteNote(id, element);
        } 
    })

    element.addEventListener('input', ()=>{
        updateNote(id, element.value);
    });

    return element;
}

function addNote () {
    let notes = getNote();

    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: '',
    }
    const noteEl = createNoteEl(noteObject.id, noteObject.content);
    app.insertBefore(noteEl, addBtn);
    notes.push(noteObject);

    saveData(notes);
}

function saveData(notes){
    localStorage.setItem('note-app', JSON.stringify(notes));

}

function getNote(){
    return JSON.parse(localStorage.getItem('note-app') || '[]')
}

function updateNote(id, content){
    const notes = getNote();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveData(notes);
}

function deleteNote(id, element){
    const notes = getNote().filter((note)=> note.id != id);
    app.removeChild(element);
    saveData(notes);
}


addBtn.addEventListener('click', addNote)