import NoteForm from './NoteForm'

type Props = {}

const NewNote = (props: Props) => {
  return (
    <>
        <h1 className='mb-4'>
            New note
        </h1>
        <NoteForm />
    </>
  )
}

export default NewNote