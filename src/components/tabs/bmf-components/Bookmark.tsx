import React, { useState } from "react";
import './Bookmark.scss'
import { BookmarkModel } from "../../../models/BookmarkModels";
import { GetContrastTextColor } from "../../../Utils";
import BookmarkModal from "../../modals/BookmarkModal";

interface IProps {
    bookmark: BookmarkModel,
    deleteBookmark: Function,
    moveBookmark: Function,
    editBookmark: Function
}

export default function Bookmark(props: IProps) {
    const [showModal, setShowModal] = useState(false);

    const style: React.CSSProperties = {
        backgroundColor: props.bookmark.bgColor,
        color: GetContrastTextColor(props.bookmark.bgColor)
    }

    return (
        <div className="d-flex">
            <a href={props.bookmark.url} className="flex-grow-1 p-1 bookmark-entry" style={style}>{props.bookmark.name}</a>

            <button className="helper-btn" onClick={() => props.moveBookmark(props.bookmark, -1)}><i className="bi bi-chevron-up"></i></button>
            <button className="helper-btn" onClick={() => props.moveBookmark(props.bookmark, 1)}><i className="bi bi-chevron-down"></i></button>
            <button className="helper-btn" onClick={() => setShowModal(true)}><i className="bi bi-pencil-fill"></i></button>
            <button className="helper-btn" onClick={() => props.deleteBookmark(props.bookmark)}><i className="bi bi-trash"></i></button>

            {showModal && <BookmarkModal show={showModal} setShow={setShowModal} editBookmark={props.editBookmark} bookmark={props.bookmark} />}
        </div>
    )
}