const $addBtn = document.querySelector('.add');
const $deleteBtn = document.querySelector('.delete-all');

const $closeNoteBtn = document.getElementsByClassName('.delete-note');  //pobiera dynamicznie - żywa kolekcja
const $panelSaveBtn = document.querySelector('.save');
const $panelCancelBtn = document.querySelector('.cancel');

const $noteArea = document.querySelector('.note-area');
const $notePanel = document.querySelector('.note-panel');
const $category = document.querySelector('#category');
const $textArea = document.querySelector('#text');
const $error = document.querySelector('.error');

let $selectedValue;
let $cardID = 0;

const openPanel = () => {
    $notePanel.style.display = 'flex';
    $panelCancelBtn.addEventListener('click', () => {
        $notePanel.style.display = 'none';
        $error.style.visibility = 'hidden';
        $textArea.value = '';
        $category.selectedIndex = 0;
    });
    $panelSaveBtn.addEventListener('click', () => {
        if($textArea.value !== '' && $category.selectedIndex !== 0){
            createNote();
            $error.style.visibility = 'hidden';
        } else {
            $error.style.visibility = 'visible';
        }
    });
};
const createNote = () => {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('id', $cardID);
    newNote.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${$selectedValue}</h3>
            <button class="delete-note" onClick="deleteNote(${$cardID})"><i class="fa-solid fa-xmark icon"></i></button>
        </div>
        <div class="note-body">
            ${$textArea.value}
        </div>`;
    $noteArea.appendChild(newNote);
    $notePanel.style.display = 'none';
    $cardID++;
    $textArea.value = '';
    $category.selectedIndex = 0;
    checkColor(newNote);
};
const selectValue = () => {
    $selectedValue = $category.options[$category.selectedIndex].text;
};
const checkColor = note => {
    switch($selectedValue) {
        case 'Zakupy':
            note.style.backgroundColor = 'rgb(72,255,0)';
        break;
        case 'Praca':
            note.style.backgroundColor = 'rgb(255,243,0)';
        break;
        case 'Inne':
            note.style.backgroundColor = 'rgb(0,170,255)';
        break;
    }
};
const deleteNote = id => {
    const noteToDelete = document.getElementById(id);
    $noteArea.removeChild(noteToDelete);

};
$addBtn.addEventListener('click', openPanel);
$deleteBtn.addEventListener('click', () => {$noteArea.textContent = ''});