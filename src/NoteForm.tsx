import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { FormEvent, useRef, useState } from "react"
import { NoteData, Tag } from "./App"
import {v4 as uuidV4} from "uuid"
import { useNavigate } from "react-router-dom"

interface Props{
    onSubmit:(data:NoteData) =>void
    onAddTag:(tag:Tag) => void
    availableTags: Tag[]

    title?:string
    markdown?:string
    tags?:Tag[]

    edit?:boolean
}

const NoteForm = (props:Props) => {

  const { onSubmit, onAddTag, availableTags, title="", markdown="", tags=[], edit } = props

  const titleRef  = useRef<HTMLInputElement>(null)
  const markDownRef  = useRef<HTMLTextAreaElement>(null)
  const [ selectedTags, setSelectedTags ] = useState<Tag[]>(tags)
  const navigate = useNavigate()  

  function handleSubmit(e:FormEvent){
    e.preventDefault()
    // send the data somewhere
    const data:NoteData = {
        title: titleRef.current!.value,
        markdown: markDownRef.current!.value,
        tags:selectedTags // tags asspcoated with this form
    }

    onSubmit(data)
    navigate("..")
  }

  return (
    <Form  style={{maxWidth:"1000px", marginInline:"auto"}} onSubmit={handleSubmit}>
        <h1 className='mb-4'>
            {edit ? "Edit Note" :"New Note"}
        </h1>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required ref={titleRef} defaultValue={title}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect 
                            isMulti
                            value={selectedTags.map(tag=>{
                                // converting back to label and value which is format for creatable
                                return {
                                    label: tag.label,
                                    value : tag.id
                                }
                            })}
                            options = {availableTags.map(tag=>{
                                return {
                                    label: tag.label,
                                    value: tag.id
                                }
                            })}

                            onChange={tags=>{
                                setSelectedTags(tags.map(tag=>{
                                    // selected tags are the tags that go into a form
                                    return {
                                        label: tag.label,
                                        id: tag.value
                                    }
                                }))
                            }}

                            onCreateOption={label =>{
                                // this replaces onChange for creating a new tag
                                // created tags are saved somewhere and presented as options 
                                const newTag = {id:uuidV4(), label}
                                onAddTag(newTag) // save to localstorage 
                                setSelectedTags(prev => [...prev, newTag])
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="markdown">
                <Form.Label>Body</Form.Label>
                <Form.Control required as="textarea" rows={15} ref={markDownRef} defaultValue={markdown}/>
            </Form.Group>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">Save</Button>
                <Link to=".." >
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm