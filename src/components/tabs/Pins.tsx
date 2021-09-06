import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { GetPrice } from "../../extensions/SearchResultsHelper";
import { UpdatePrices } from "../../extensions/PricesHelper";
import { Inject } from "../../extensions/SearchResultsHelper";
import Pin from "./pins-components/Pin";

export default function PinsTab() {
    const _forceUpdate = useState(0)[1];
    const ForceUpdate = () => _forceUpdate(c => c + 1);
    const pins = useRef<[HTMLElement, HTMLElement][]>([]);

    useEffect(() => {
        UpdatePrices();
        Inject(AddToPin);
    }, []);

    function RemovePin(index: number) {
        if (index >= 0 && index < pins.current.length) {
            pins.current.splice(index, 1);
            ForceUpdate();
        }
    }

    const AddToPin = (event: React.MouseEvent<HTMLButtonElement>) => {
        let resultBox = event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement!;
        let itemShowcase = resultBox.querySelector<HTMLElement>('div.itemPopupContainer')!;
        $(itemShowcase).css('margin', '0px');
        $(itemShowcase).css('margin-top', '0.5em');

        pins.current.push([itemShowcase, resultBox]);
        ForceUpdate();
    };

    return (
        <>
            {
                pins.current.map(pin =>
                    <Pin key={pins.current.indexOf(pin)} index={pins.current.indexOf(pin)} itemElement={pin[0]} parentElement={pin[1]} removePin={RemovePin} />
                )
            }
        </>
    )
}