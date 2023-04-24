import { Note, NoteData, Tag } from './App'
import NoteForm from './NoteForm'

type Props = {
  onSubmit: (data:NoteData) => void,
  onAddTag: (tag:Tag) => void
  availableTags: Tag[]
}

const NewNote = (props: Props) => {
  const { onSubmit, onAddTag, availableTags } = props
  return (
    <>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote