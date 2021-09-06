import { arrayMoveMutable } from "array-move";
import React, { useEffect, useState } from "react";
import Globals from "../../Globals";
import { BookmarkFolderModel } from "../../models/BookmarkModels";
import BookmarkFolderModal from "../modals/BookmarkFolderModal";
import BookmarkFolder from "./bmf-components/BookmarkFolder";

export default function BookmarksTab() {
    const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolderModel[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedBookmarks = window.localStorage.getItem(Globals.STORAGE_HELPER_BOOKMARKS);
        if (savedBookmarks) {
            setBookmarkFolders(JSON.parse(savedBookmarks));
        }
        else {
            window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(bookmarkFolders));
        }
    }, [])

    function handleShowAddBookmarkFolder() {
        setShowModal(true);
    }

    function AddBookmarkFolder(folder: BookmarkFolderModel) {
        const tmpBookmarks = [...bookmarkFolders];
        tmpBookmarks.push(folder);

        window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(tmpBookmarks));
        setBookmarkFolders(tmpBookmarks);
    }

    function UpdateBookmarkFolder(folder: BookmarkFolderModel) {
        const tmpBookmarks = [...bookmarkFolders];
        const folderIndex = tmpBookmarks.findIndex(f => f.id === folder.id);

        if (folderIndex !== -1) {
            tmpBookmarks[folderIndex] = folder;

            window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(tmpBookmarks));
            setBookmarkFolders(tmpBookmarks);
        }
    }

    function DeleteBookmarkFolder(folder: BookmarkFolderModel) {
        const tmpBookmarks = [...bookmarkFolders];
        const folderIndex = tmpBookmarks.findIndex(f => f.id === folder.id);

        if (folderIndex !== -1) {
            tmpBookmarks.splice(folderIndex, 1);

            window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(tmpBookmarks));
            setBookmarkFolders(tmpBookmarks);
        }
    }

    function MoveBookmarkFolder(folder: BookmarkFolderModel, offset: number) {
        const tmpBookmarks = [...bookmarkFolders];
        const folderIndex = tmpBookmarks.findIndex(f => f.id === folder.id);
        const newIndex = folderIndex + offset;

        if (folderIndex !== -1 && newIndex >= 0 && newIndex < tmpBookmarks.length) {
            arrayMoveMutable(tmpBookmarks, folderIndex, newIndex);

            window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(tmpBookmarks));
            setBookmarkFolders(tmpBookmarks);
        }
    }

    return (
        <>
            <button className="helper-btn" onClick={handleShowAddBookmarkFolder}>Create a folder</button>
            <hr />
            <div className="accordion">
                {
                    bookmarkFolders.map(folder =>
                        <BookmarkFolder key={folder.id} folder={folder} updateBookmarkFolder={UpdateBookmarkFolder} deleteBookmarkFolder={DeleteBookmarkFolder} moveBookmarkFolder={MoveBookmarkFolder} />
                    )
                }
            </div>

            {showModal && <BookmarkFolderModal show={showModal} setShow={setShowModal} addBookmarkFolder={AddBookmarkFolder} />}
        </>
    )
}