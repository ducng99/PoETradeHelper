import axios from 'axios'
import { Sleep } from '../Utils';
import { PoENinjaResponse } from './poeninjaResponse';

export let RawPriceData: PoENinjaResponse;

declare function SendGetRequest(url: string): Promise<any>;

export async function UpdatePrices(curLeague?: string) {
    let league = curLeague ? curLeague : document.querySelector('span.multiselect__single')?.textContent;
    
    while (typeof league === 'undefined') {
        await Sleep(2000);
        league = document.querySelector('span.multiselect__single')?.textContent;
    }
    
    SendGetRequest(`https://poe.ninja/api/data/currencyoverview?league=${league}&type=Currency`)
        .then(res => {
            RawPriceData = res;
        }).catch(ex => {
            console.error("Failed updating prices:", ex);
        });
}