import { arrayMoveMutable } from "array-move";
import React, { useState } from "react";
import { BookmarkFolderModel, BookmarkModel } from "../../../models/BookmarkModels";
import { GetContrastTextColor } from "../../../Utils";
import BookmarkFolderModal from "../../modals/BookmarkFolderModal";
import BookmarkModal from "../../modals/BookmarkModal";
import { BookmarkIDComparer } from "../Bookmarks";
import Bookmark from "./Bookmark";
import './BookmarkFolder.scss'

interface IProps {
    folder: BookmarkFolderModel,
    updateBookmarkFolder: Function,
    deleteBookmarkFolder: Function,
    moveBookmarkFolder: Function,
}

export default function BookmarkFolder(props: IProps) {
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [showBookmarkFolderModal, setShowBookmarkFolderModal] = useState(false);

    const style: React.CSSProperties = {
        backgroundColor: props.folder.bgColor,
        color: GetContrastTextColor(props.folder.bgColor)
    }

    function AddBookmark(bookmark: BookmarkModel) {
        props.folder.bookmarks.s_push(BookmarkIDComparer, bookmark);
        props.updateBookmarkFolder(props.folder);
    }

    function DeleteBookmark(bookmark: BookmarkModel) {
        const index = props.folder.bookmarks.findIndex(bm => bm.id === bookmark.id);
        if (index !== -1) {
            props.folder.bookmarks.splice(index, 1);
            props.updateBookmarkFolder(props.folder);
        }
    }

    function EditBookmark(bookmark: BookmarkModel) {
        const index = props.folder.bookmarks.findIndex(bm => bm.id === bookmark.id);
        if (index !== -1) {
            props.folder.bookmarks[index] = bookmark;
            props.updateBookmarkFolder(props.folder);
        }
    }

    function MoveBookmark(bookmark: BookmarkModel, offset: number) {
        const bookmarkIndex = props.folder.bookmarks.findIndex(bm => bm.id === bookmark.id);
        const newIndex = bookmarkIndex + offset;

        if (bookmarkIndex !== -1 && newIndex >= 0 && newIndex < props.folder.bookmarks.length) {
            arrayMoveMutable(props.folder.bookmarks, bookmarkIndex, newIndex);
            props.updateBookmarkFolder(props.folder);
        }
    }

    return (
        <div className="accordion-item mt-1">
            <h2 className="accordion-header" id={"header_" + props.folder.id}>
                <button className="accordion-button collapsed" type="button" style={style} data-bs-toggle="collapse" data-bs-target={"#content_" + props.folder.id} aria-expanded="false" aria-controls={"content_" + props.folder.id}>
                    <div className="me-auto">{props.folder.name}</div>

                    <button className="helper-btn" onClick={() => props.moveBookmarkFolder(props.folder, -1)}><i className="bi bi-chevron-up"></i></button>
                    <button className="helper-btn" onClick={() => props.moveBookmarkFolder(props.folder, 1)}><i className="bi bi-chevron-down"></i></button>
                    <button className="helper-btn" onClick={() => setShowBookmarkFolderModal(true)}><i className="bi bi-pencil-fill"></i></button>
                    <button className="helper-btn" onClick={() => props.deleteBookmarkFolder(props.folder)}><i className="bi bi-trash"></i></button>

                    {showBookmarkFolderModal && <BookmarkFolderModal show={showBookmarkFolderModal} setShow={setShowBookmarkFolderModal} editBookmarkFolder={props.updateBookmarkFolder} bookmarkFolder={props.folder} />}
                </button>
            </h2>
            <div id={"content_" + props.folder.id} className="accordion-collapse collapse" aria-labelledby={"header_" + props.folder.id}>
                <div className="accordion-body">
                    {
                        props.folder.bookmarks.map(bm =>
                            <Bookmark key={bm.id} bookmark={bm} deleteBookmark={DeleteBookmark} moveBookmark={MoveBookmark} editBookmark={EditBookmark} />
                        )
                    }
                    <button className="helper-btn w-100" onClick={() => setShowBookmarkModal(true)}>Add new bookmark</button>
                    {showBookmarkModal && <BookmarkModal show={showBookmarkModal} setShow={setShowBookmarkModal} addBookmark={AddBookmark} />}
                </div>
            </div>
        </div>
    )
}