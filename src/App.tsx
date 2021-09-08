import React, { useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap'
import TabsContainer from './components/TabsContainer'
import { AddTilda } from './extensions/FiltersHelper';
import Settings from './models/HelperSettings';

export default function App() {
    const [isOpen, setOpen] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({
        height: 'fit-content',
        fontSize: `${Settings.Instance.fontSize}em`,
        width: `${Settings.Instance.helperWidth}px`
    });

    useEffect(() => {
        ToggleOpen();
        AddTilda();

        Settings.Instance.AddListener(handleSettingsUpdate);
    }, []);

    function ToggleOpen() {
        const poeApp = document.querySelector<HTMLElement>('div#app > div.content');
        if (poeApp)
            poeApp.style.width = !isOpen ? `calc(100% - ${Settings.Instance.helperWidth}px)` : '100%';

        // Create new variable of isOpen to avoid setState stashing/queue/merge or whatever
        const tmpIsOpen = new Boolean(isOpen);
        setStyle(prev => {
            prev.height = !tmpIsOpen ? '100vh' : 'fit-content';
            return prev;
        });
        setOpen(prev => !prev);
    }

    function handleSettingsUpdate() {
        setStyle(prev => {
            const newStyle = { ...prev }
            newStyle.fontSize = `${Settings.Instance.fontSize}em`;
            newStyle.width = `${Settings.Instance.helperWidth}px`;
            return newStyle;
        });

        const poeApp = document.body.querySelector<HTMLElement>('div#app > div.content');
        if (poeApp)
            poeApp.style.width = `calc(100% - ${Settings.Instance.helperWidth}px)`;
    }

    return (
        <div className="PoETradeHelper" style={style}>
            <button className="helper-btn" onClick={() => ToggleOpen()}>Show/Hide</button>
            <TabsContainer isOpen={isOpen} />
        </div>
    )
}