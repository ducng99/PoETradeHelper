import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Modal } from "react-bootstrap";
import { BookmarkModel } from "../../models/BookmarkModels";

interface IProps {
    show: boolean,
    setShow: Function,
    addBookmark?: Function,
    editBookmark?: Function,
    bookmark?: BookmarkModel
}

export default function BookmarkModal(props: IProps) {
    const [name, setName] = useState(props.bookmark ? props.bookmark.name : '');
    const [url, setURL] = useState(props.bookmark ? props.bookmark.url : window.location.href);
    const [color, setColor] = useState(props.bookmark ? props.bookmark.bgColor : '#222');

    useEffect(() => {
        let inputs = $<HTMLInputElement>('input.multiselect__input');
        if (!props.bookmark)
            setName(inputs[0].value ? inputs[0].value : (inputs[1].value === 'Any' ? '' : inputs[1].value));
    }, [])

    function handleSubmit() {
        if (name && url && color) {
            if (props.bookmark && props.editBookmark) {
                props.bookmark.name = name;
                props.bookmark.url = url;
                props.bookmark.bgColor = color;
                props.editBookmark(props.bookmark);
            }
            else if (props.addBookmark) {
                props.addBookmark({
                    id: uuidv4(),
                    name,
                    url,
                    bgColor: color
                });
            }
            props.setShow(false);
        }
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.bookmark ? 'Edit' : 'Create'} a bookmark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control value={name} onChange={event => setName(event.currentTarget.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>URL:</Form.Label>
                    <Form.Control value={url} onChange={event => setURL(event.currentTarget.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Background color:</Form.Label>
                    <Form.Control value={color} type="color" onInput={event => setColor(event.currentTarget.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>{props.bookmark ? 'Save' : 'Add'}</Button>
            </Modal.Footer>
        </Modal>
    )
}