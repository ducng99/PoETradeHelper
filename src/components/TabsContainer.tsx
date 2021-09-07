import React from "react";
import BookmarksTab from "./tabs/Bookmarks";
import HistoryTab from "./tabs/History";
import PinsTab from "./tabs/Pins";
import SettingsTab from "./tabs/Settings";
import './TabsContainer.scss'

interface IProps {
    isOpen: boolean
}

export default function TabsContainer(props: IProps) {
    const style: React.CSSProperties = {
        display: props.isOpen ? 'block' : 'none'
    }

    return (
        <div id="helper-tabs" style={style}>
            <ul className="nav nav-tabs px-1" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="bookmark-tab" data-bs-toggle="tab" data-bs-target="#bookmark" type="button" role="tab" aria-controls="bookmark" aria-selected="true">
                        <i className="bi bi-bookmark-star-fill"></i>&#32;Bookmarks
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pins-tab" data-bs-toggle="tab" data-bs-target="#pins" type="button" role="tab" aria-controls="pins" aria-selected="false">
                        <i className="bi bi-pin-angle-fill"></i>&#32;Pins
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">
                        <i className="bi bi-clock-history"></i>&#32;History
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">
                        <i className="bi bi-gear-fill"></i>&#32;Settings
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane overflow-auto active" id="bookmark" role="tabpanel" aria-labelledby="bookmark-tab"><BookmarksTab /></div>
                <div className="tab-pane overflow-auto" id="pins" role="tabpanel" aria-labelledby="pins-tab"><PinsTab /></div>
                <div className="tab-pane overflow-auto" id="history" role="tabpanel" aria-labelledby="history-tab"><HistoryTab /></div>
                <div className="tab-pane overflow-auto" id="settings" role="tabpanel" aria-labelledby="settings-tab"><SettingsTab /></div>
            </div>
        </div>
    )
}