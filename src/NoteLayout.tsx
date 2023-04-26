
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './App'

type Props = {
    notes:Note[]
}

export function NoteLayout(props: Props){

    const {notes} = props
    const {id} = useParams()

    const note = notes.find(n=>n.id === id)

    if(note === null) return <Navigate to="/" replace />

    return <Outlet context={note} /> // basicaly render the root element and pass it the note
}


export function useNote(){
    // provide access to note to all the children elements
    return useOutletContext<Note>()
}
