import { Tag } from '../App'

interface Props{
    handleClose: ()=>void,
    show:boolean,
    availableTags: Tag[],
    onDeleteTag: (id:string)=> void
    onUpdateTag:(id:string, label:string) =>void
    
}

const EditTagsModal = (props: Props) => {
    return (
        <div>EditTagsModal</div>
    )
}

export default EditTagsModal