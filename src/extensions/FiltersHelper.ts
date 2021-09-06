import { Sleep } from "../Utils";

export function GetFilters() {
    let filters = $('div.search-advanced-pane.brown div.filter-group.expanded div.filter.full-span:not(.disabled) div.filter-title');
    let filtersRegex: string[] = [];

    filters.each((i, filter) => {
        let filterText = $(filter).contents()[1].textContent?.trim();
        filterText = filterText?.replace(/[\\+\\-]?#/g, '[\\+\\-]?[0-9.]+');
        filterText && filtersRegex.push(filterText);
    });

    return filtersRegex;
}

export async function AddTilda() {
    const seachPanel = document.querySelector('div.brown');

    while (!seachPanel) await Sleep(1000);

    seachPanel.addEventListener('click', async () => {
        while (!document.activeElement) await Sleep(50);
        let inputDOM = document.activeElement as HTMLInputElement;
        if (inputDOM && inputDOM.classList.contains('multiselect__input') && !inputDOM.classList.contains('helper_checked')) {
            inputDOM.classList.add('helper_checked');

            inputDOM.addEventListener('input', async (e) => {
                await Sleep(2);
                const inputElement = e.target as HTMLInputElement;
                if (/^[a-z]/.test(inputElement.value)) {
                    inputElement.value = '~' + inputElement.value;
                }
            });
        }
    });
}

export async function StickySearchButton() {
    let searchBar = $('div.search-panel > div.controls');
    
    while (!searchBar.length) {
        await Sleep(1000);
        searchBar = $('div.search-panel > div.controls');
    }
    
    searchBar.css('position', 'sticky')
        .css('z-index', '2')
        .css('bottom', '0px')
        .css('background-color', '#00000099');
}