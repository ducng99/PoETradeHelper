import React from "react";
import { HistoryEntryModel } from "../../../models/History";
import { PrettyTime } from "../../../Utils";
import './HistoryEntry.scss'

interface IProps {
    entry: HistoryEntryModel
}

export default function HistoryEntry(props: IProps) {


    return (
        <div history-id={props.entry.id} className="history-entry">
            <a href={props.entry.url} style={{ flexGrow: 1 }}>
                <div className="d-flex">
                    <b className="history-title">{props.entry.title}</b>
                    <small className="ms-auto">{PrettyTime(props.entry.time)}</small>
                </div>
                <small style={{ color: 'gray' }}>...{props.entry.url.substring(props.entry.url.indexOf('/trade/'))}</small>
            </a>
        </div>
    )
}