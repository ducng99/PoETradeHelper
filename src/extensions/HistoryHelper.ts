import { Sleep } from "../Utils";

export default async function Inject(AddHistory: Function) {
    document.body.addEventListener('keydown', <any>AddHistory);
    let searchBtn = document.body.querySelector<HTMLButtonElement>('button.search-btn');
    
    while (!searchBtn) {
        await Sleep(1000);
    }
    
    searchBtn.addEventListener('click', <any>AddHistory);
}