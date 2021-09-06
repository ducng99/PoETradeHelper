import React from "react";
import { GetPrice } from "../../../extensions/SearchResultsHelper";
import { RawPriceData } from "../../../extensions/PricesHelper";

interface IProps {
    index: number,
    itemElement: HTMLElement,
    parentElement: HTMLElement,
    removePin: Function
}

export default function Pin(props: IProps) {
    const [price, currency, chaosEquiv] = GetPrice(props.parentElement.querySelector('span[data-field="price"]')!);
    const currencyImg = RawPriceData.currencyDetails.find(p => p.name.toLowerCase() === currency?.toLowerCase())?.icon;

    function ScrollTo() {
        let boxRect = props.parentElement.getBoundingClientRect();

        let windowPadding = Math.floor(window.innerHeight / 2 - boxRect.height / 2);
        let offset = Math.floor(boxRect.top - windowPadding);
        if (Math.floor(boxRect.top) != windowPadding) {
            window.scrollBy(0, offset);
            props.parentElement.style.transition = 'background 0.5s linear';
            props.parentElement.style.background = '#ffffff50';
            setTimeout(() => {
                props.parentElement.style.background = '';
            }, 500);
        }
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: props.itemElement.outerHTML }}></div>
            <div style={{ padding: '.5em', backgroundColor: '#000' }}>Price: {price} {currencyImg ? <>× <img src={currencyImg} width="28px" /></> : currency}
                {chaosEquiv && <> &#8776; {chaosEquiv} × <img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png" width="28px" /></>}<br />
            </div>
            <button className="helper-btn" onClick={() => props.removePin(props.index)}>Remove</button>
            <button className="helper-btn" onClick={() => ScrollTo()}>Scroll to</button>
            <hr />
        </div>
    )
}