import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Modal } from "react-bootstrap";
import { BookmarkFolderModel, BookmarkModel } from "../../models/BookmarkModels";
import { HashSet } from "../../HashSet";
import { BookmarkIDComparer } from "../tabs/Bookmarks";

interface IProps {
    show: boolean,
    setShow: Function,
    addBookmarkFolder?: Function,
    editBookmarkFolder?: Function,
    bookmarkFolder?: BookmarkFolderModel
}

export default function BookmarkFolderModal(props: IProps) {
    const [name, setName] = useState(props.bookmarkFolder ? props.bookmarkFolder.name : '');
    const [color, setColor] = useState(props.bookmarkFolder ? props.bookmarkFolder.bgColor : '#133d62');

    function handleSubmit() {
        if (name && color) {
            if (props.bookmarkFolder && props.editBookmarkFolder) {
                props.bookmarkFolder.name = name;
                props.bookmarkFolder.bgColor = color;
                props.editBookmarkFolder(props.bookmarkFolder);
            }
            else if (props.addBookmarkFolder) {
                props.addBookmarkFolder({
                    id: uuidv4(),
                    name,
                    bgColor: color,
                    bookmarks: new HashSet<BookmarkModel>()
                });
            }
            props.setShow(false);
        }
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.bookmarkFolder ? 'Edit' : 'Create'} a folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="add_bookmarkFolder_name">Name:</Form.Label>
                    <Form.Control id="add_bookmarkFolder_name" defaultValue={name} onChange={event => setName(event.currentTarget.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="add_bookmarkFolder_color">Background color:</Form.Label>
                    <Form.Control id="add_bookmarkFolder_color" defaultValue={color} type="color" onInput={event => setColor(event.currentTarget.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>{props.bookmarkFolder ? 'Save' : 'Add'}</Button>
            </Modal.Footer>
        </Modal>
    )
}