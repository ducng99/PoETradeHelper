import React, { useEffect, useRef, useState } from "react";
import Inject from "../../extensions/HistoryHelper";
import { HistoryEntryModel } from '../../models/History'
import HistoryEntry from "./hist-components/HistoryEntry";
import { v4 as uuidv4 } from 'uuid'
import Globals from "../../Globals";

export default function HistoryTab() {
    const _forceUpdate = useState(0)[1];
    const ForceUpdate = () => _forceUpdate(c => c + 1);
    const histories = useRef<HistoryEntryModel[]>([]);

    useEffect(() => {
        const savedHistories = window.localStorage.getItem(Globals.STORAGE_HELPER_HISTORY);
        if (savedHistories) {
            let parsed = JSON.parse(savedHistories);
            histories.current.push(...parsed);
        }
        else {
            window.localStorage.setItem(Globals.STORAGE_HELPER_HISTORY, JSON.stringify(histories.current));
        }

        Inject(AddHistory);
    }, []);

    function AddHistory(event: any) {
        if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
            let checkResultsLoaded = setInterval(() => {
                if (/\/trade\/search\/\w+\/\w+/.test(window.location.pathname)) {
                    clearInterval(checkResultsLoaded);

                    if (histories.current.length == 0 || histories.current[histories.current.length - 1].url !== window.location.href) {
                        let inputs = $<HTMLInputElement>('input.multiselect__input');
                        let item = inputs[0].value ? inputs[0].value : inputs[1].value;

                        histories.current.push({
                            id: uuidv4(),
                            title: item,
                            url: window.location.href,
                            time: Date.now()
                        });

                        window.localStorage.setItem(Globals.STORAGE_HELPER_HISTORY, JSON.stringify(histories.current));
                        ForceUpdate();
                    }
                }
            }, 1000);
        }
    }

    function ClearHistory() {
        histories.current.splice(0, histories.current.length);
        window.localStorage.setItem(Globals.STORAGE_HELPER_HISTORY, JSON.stringify(histories.current));
        ForceUpdate();
    }

    return (
        <div>
            <button className="helper-btn" onClick={ClearHistory}>Clear</button>
            <hr />
            {
                histories.current.slice().reverse().map(entry =>
                    <HistoryEntry entry={entry} />
                )
            }
        </div>
    )
}