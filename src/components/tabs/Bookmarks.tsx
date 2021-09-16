import { arrayMoveMutable } from "array-move";
import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Globals from "../../Globals";
import { BookmarkFolderModel } from "../../models/BookmarkModels";
import { ReadFile, UniquePush, WriteFile } from "../../Utils";
import BookmarkFolderModal from "../modals/BookmarkFolderModal";
import BookmarkFolder from "./bmf-components/BookmarkFolder";

export default function BookmarksTab() {
    const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolderModel[]>([]);
    const [showModal, setShowModal] = useState(false);
    const importFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedBookmarks = window.localStorage.getItem(Globals.STORAGE_HELPER_BOOKMARKS);
        if (savedBookmarks) {
            setBookmarkFolders(JSON.parse(savedBookmarks));
        }
        else {
            window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, JSON.stringify(bookmarkFolders));
        }
    }, [])

    function handleShowAddBookmarkFolder(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setShowModal(true);
    }

    function AddBookmarkFolder(folder: BookmarkFolderModel) {
        const tmpBookmarks = UniquePush(bookmarkFolders, folder);

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

    async function ImportBookmarks(event: React.ChangeEvent<HTMLInputElement>) {
        const filesList = event.currentTarget.files;
        if (filesList && filesList.length > 0) {
            console.log(filesList);
            const fileContent = await ReadFile(filesList[0]);
            if (fileContent) {
                console.log(fileContent);
                try {
                    const importedBookmarks = JSON.parse(fileContent) as BookmarkFolderModel[];
                    window.localStorage.setItem(Globals.STORAGE_HELPER_BOOKMARKS, fileContent);
                    setBookmarkFolders([...importedBookmarks]);
                }
                catch {
                    // JSON parse failed
                }
            }
        }
    }

    function ExportBookmarks(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        WriteFile('PoETradeHelper_Bookmarks.json', JSON.stringify(bookmarkFolders));
    }

    return (
        <>
            <div className="d-flex">
                <button className="helper-btn me-auto" onClick={handleShowAddBookmarkFolder}>Create a folder</button>
                <input ref={importFileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={ImportBookmarks} />
                <button className="helper-btn" onClick={(e) => { e.stopPropagation(); importFileRef.current?.click() }}>Import</button>
                <button className="helper-btn" onClick={ExportBookmarks}>Export</button>
            </div>
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