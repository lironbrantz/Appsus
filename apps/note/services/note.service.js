import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
const { loadFromStorage, saveToStorage, makeId } = utilService
export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}

const NOTE_KEY = 'noteDB'
const demoNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/300/200',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
       {
        id: 'n103',
        createdAt: Date.now(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            title: 'My Video'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n104',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                {
                    txt: 'Driving license'
                    , doneAt: null
                },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]
_createNotes()

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

            if (filterBy.search) {
                const search = filterBy.search.toLowerCase()
                notes = notes.filter(note =>
                    (note.info.txt || '').toLowerCase().includes(search)
                )
            }

            return notes
        })
}
function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}
function remove(noteId) {

    return storageService.remove(NOTE_KEY, noteId)
}
function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}
function _createNotes() {
    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = demoNotes
        saveToStorage(NOTE_KEY, notes)
    }
}
function _createNote(txt) {

    const note = getEmptyNote(txt)
    note.id = makeId()
    return note
}

function getEmptyNote(txt = '') {
    return {
        id: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            txt
        }
    }
}
