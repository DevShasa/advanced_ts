import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type Props = {
    submit: (id:string, data:NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export default function EditNote(props:Props){
    const { submit, onAddTag, availableTags } = props
    const note = useNote()
    return (
        <>
            <NoteForm 
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data => submit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
                edit
            />
        </>
    )
}