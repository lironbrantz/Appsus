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
        id: 'n201',
        createdAt: Date.now() - 100000,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#d3e3fd' },
        info: {
            title: 'Meeting notes',
            txt: 'Monday, 10:30 AM\n\nReview the latest designs\nDiscuss the project timeline\nFinalize the remaining tasks\n\nNext meeting: Thursday',
            url: '',
            todos: []
        }
    },
    {
        id: 'n202',
        createdAt: Date.now() - 90000,
        type: 'NoteTodos',
        isPinned: true,
        style: { backgroundColor: '#fff475' },
        info: {
            title: 'Shopping list',
            txt: '',
            url: '',
            todos: [
                { txt: 'Milk', doneAt: Date.now() },
                { txt: 'Eggs', doneAt: Date.now() },
                { txt: 'Fresh bread', doneAt: null },
                { txt: 'Cherry tomatoes', doneAt: null },
                { txt: 'Olive oil', doneAt: null },
                { txt: 'Coffee', doneAt: null }
            ]
        }
    },
    {
        id: 'n203',
        createdAt: Date.now() - 80000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: {
            title: 'The mountains',
            txt: 'Northern Italy, September 2025',
            url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
            todos: []
        }
    },
    {
        id: 'n204',
        createdAt: Date.now() - 70000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#e4c1f9' },
        info: {
            title: 'Pasta recipe',
            txt: '200g pasta\n2 cloves garlic\nOlive oil\nCherry tomatoes\nFresh basil\nParmesan\n\nCook pasta until al dente. Sauté garlic and tomatoes in olive oil. Add pasta water, mix everything together and finish with fresh basil.',
            url: '',
            todos: []
        }
    },
    {
        id: 'n205',
        createdAt: Date.now() - 60000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: {
            title: 'Coffee',
            txt: 'Medium roast, 18g in / 36g out',
            url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
            todos: []
        }
    },
    {
        id: 'n206',
        createdAt: Date.now() - 50000,
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#ccff90' },
        info: {
            title: 'Things to do',
            txt: '',
            url: '',
            todos: [
                { txt: 'Pick up a package', doneAt: Date.now() },
                { txt: 'Book a dentist appointment', doneAt: null },
                { txt: 'Return library books', doneAt: null },
                { txt: 'Buy a birthday card', doneAt: null }
            ]
        }
    },
    {
        id: 'n207',
        createdAt: Date.now() - 40000,
        type: 'NoteVideo',
        isPinned: false,
        style: { backgroundColor: '#e8eaed' },
        info: {
            title: 'Flowers',
            txt: '',
            url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            todos: []
        }
    },
    {
        id: 'n208',
        createdAt: Date.now() - 30000,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: {
            title: 'Lake house',
            txt: '',
            url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
            todos: []
        }
    },
    {
        id: 'n209',
        createdAt: Date.now() - 20000,
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#fce8e6' },
        info: {
            title: 'Wi-Fi',
            txt: 'Guest network\n\nNetwork: Guest_WiFi\nPassword: welcome2025\n\nRouter is in the living room.',
            url: '',
            todos: []
        }
    },
    {
        id: 'n210',
        createdAt: Date.now() - 10000,
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#c8e6c9' },
        info: {
            title: 'Weekend plans',
            txt: '',
            url: '',
            todos: [
                { txt: 'Farmers market', doneAt: Date.now() },
                { txt: 'Lunch with friends', doneAt: null },
                { txt: 'Go to the cinema', doneAt: null },
                { txt: 'Laundry', doneAt: null }
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
                    (note.info.txt || '').toLowerCase().includes(search) ||
                    (note.info.title || '').toLowerCase().includes(search)
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


function getEmptyNote(type = 'NoteTxt') {
    return {
        id: '',
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title: '',
            txt: '',
            url: '',
            todos: []
        }
    }
}