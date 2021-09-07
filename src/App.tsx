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
        fontSize: Settings.Instance.fontSize + 'em',
    });

    useEffect(() => {
        ToggleOpen();
        AddTilda();
        
        document.body.setAttribute('style', `--helper-width: ${Settings.Instance.helperWidth}px`);
        Settings.Instance.AddListener(handleSettingsUpdate);
    }, []);

    function ToggleOpen() {
        setOpen(!isOpen);

        const poeApp = document.querySelector<HTMLElement>('div#app > div.content');
        if (poeApp)
            poeApp.style.width = !isOpen ? 'calc(100% - var(--helper-width))' : '100%';

        setStyle(Object.assign({ ...style }, { height: !isOpen ? '100vh' : 'fit-content' }));
    }

    function handleSettingsUpdate() {
        setStyle(Object.assign({ ...style }, { fontSize: Settings.Instance.fontSize + 'em' }));
        document.body.setAttribute('style', `--helper-width: ${Settings.Instance.helperWidth}px`);
    }

    return (
        <div className="PoETradeHelper" style={style}>
            <button className="helper-btn" onClick={() => ToggleOpen()}>Show/Hide</button>
            <TabsContainer isOpen={isOpen} />
        </div>
    )
}