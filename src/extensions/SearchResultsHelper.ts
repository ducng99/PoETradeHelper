import { MouseEventHandler } from "react";
import { GetFilters } from "./FiltersHelper";
import { RawPriceData } from "./PricesHelper";

export function Inject(AddToPin: MouseEventHandler<HTMLButtonElement>) {
    setInterval(() => {
        if (window.location.href.indexOf("exchange") === -1) {
            let buttonsInResults = $('.results span.pull-left:not(.checked)');

            buttonsInResults.each((i, options) => {
                let addPinButton = $('<button class="btn btn-default whisper-btn">Pin</button>');
                addPinButton.on('click', <any>AddToPin);

                $(options).append(addPinButton);
                $(options).addClass('checked');
            });

            let prices = $('span[data-field="price"][helper-checked!="ok"]').has('span.currency-image > img[title!="chaos"]');

            prices.each((i, priceNode) => {
                let chaosEquiv = GetPrice(priceNode)[2];
                $(priceNode).append(`<br/><span>&#8776;</span> <span>${chaosEquiv}<span>×</span><span><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png" alt="chaos" title="chaos"></span></span>`);
                priceNode.setAttribute('helper-checked', 'ok');
            });

            let currentFilters = GetFilters();

            let modTexts = $('div[data-mod] span[data-field][helper-checked!="ok"]');

            modTexts.each((i, modText) => {
                for (const filter of currentFilters) {
                    if (filter && modText.textContent && RegExp(filter).test(modText.textContent)) {
                        modText.style.backgroundColor = "#484703";
                        modText.style.color = "#e2e2e2";
                        modText.setAttribute('helper-checked', 'ok');
                        break;
                    }
                }
            });
        }
    }, 2000);
}

export function GetPrice(dom: HTMLElement) {
    let spans = dom.querySelectorAll('span');
    let priceNum = spans[1].textContent;
    let currency = spans[3].querySelector('span')?.textContent;
    let chaosPrice = 0;

    if (currency !== 'Chaos Orb' && RawPriceData) {
        for (const tCurrency of RawPriceData.lines) {
            if (tCurrency.currencyTypeName === currency) {
                chaosPrice = tCurrency.chaosEquivalent;
                break;
            }
        }

        let chaosEquivPrice = (parseFloat(priceNum!) * chaosPrice).toFixed(2);

        return [priceNum, currency, chaosEquivPrice];
    }

    return [priceNum, currency];
}