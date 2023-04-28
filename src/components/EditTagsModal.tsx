import { Tag } from '../App'
import {
    Modal,
    Form, 
    Row,
    Stack,
    Col,
    Button
} from "react-bootstrap"


interface Props{
    handleClose: ()=>void,
    show:boolean,
    availableTags: Tag[],
    onDeleteTag: (id:string)=> void
    onUpdateTag:(id:string, label:string) =>void
    
}

const EditTagsModal = (props: Props) => {

    const {handleClose,show, availableTags, onDeleteTag, onUpdateTag} = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag=>(
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control 
                                        type="text"
                                        value={tag.label}
                                        onChange={e => onUpdateTag(tag.id, e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={()=> onDeleteTag(tag.id)} variant="outline-danger">
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
                <Button className="mt-2 float-end" onClick={handleClose} variant="danger">
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default EditTagsModal