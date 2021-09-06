import React, { useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap'
import TabsContainer from './components/TabsContainer'
import { AddTilda } from './extensions/FiltersHelper';

export default function App() {
    const [isOpen, setOpen] = useState(false);
    let style: React.CSSProperties = {
        height: 'fit-content'
    }

    useEffect(() => {
        ToggleOpen();
        AddTilda();
    }, []);

    function ToggleOpen() {
        setOpen(!isOpen);

        const poeApp = document.querySelector<HTMLElement>('div#app > div.content');
        if (poeApp)
            poeApp.style.width = !isOpen ? 'calc(100% - var(--helper-width))' : '100%';

        style = {
            height: !isOpen ? '100vh' : 'fit-content'
        }
    }

    return (
        <div className="PoETradeHelper" style={style}>
            <button className="helper-btn" onClick={() => ToggleOpen()}>Show/Hide</button>
            <TabsContainer isOpen={isOpen} />
        </div>
    )
}