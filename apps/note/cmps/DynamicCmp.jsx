import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicCmp({ note }) {
    switch (note.type) {
        case 'NoteImg':
            return <NoteImg info={note.info} />

        case 'NoteTxt':
            return <NoteTxt info={note.info} />

        case 'NoteTodos':
            return <NoteTodos info={note.info} />

        case 'NoteVideo':
            return <NoteVideo info={note.info} />

    }

}