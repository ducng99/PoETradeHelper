import React, { useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap'
import TabsContainer from './components/TabsContainer'
import { AddTilda, StickySearchButton } from './extensions/FiltersHelper';

export default function App() {
    const [isOpen, setOpen] = useState(false);
    
    useEffect(() => {
        toggleOpen();
        AddTilda();
        StickySearchButton();
    }, []);

    function toggleOpen() {
        setOpen(!isOpen);
        
        const poeApp = document.querySelector<HTMLElement>('div#app > div.content');
        if (poeApp)
            poeApp.style.width = !isOpen ? 'calc(100% - var(--helper-width))' : '100%';
    }

    return (
        <div className="PoETradeHelper" style={isOpen ? { height: '100vh' } : { height: 'fit-content' }}>
            <button className="helper-btn" onClick={() => toggleOpen()}>Show/Hide</button>
            <TabsContainer isOpen={isOpen} />
        </div>
    )
}