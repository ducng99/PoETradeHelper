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
    let seachPanel;

    do {
        await Sleep(1000);
        seachPanel = document.querySelector('div.brown');
    } while (!seachPanel);

    seachPanel.addEventListener('click', async () => {
        let tries = 0;

        while (document.activeElement?.tagName.toLowerCase() !== 'input' && ++tries < 5) {
            await Sleep(100);
        }

        let inputDOM = document.activeElement as HTMLInputElement;
        if (inputDOM && inputDOM.classList.contains('multiselect__input') && !inputDOM.classList.contains('helper_checked')) {
            inputDOM.addEventListener('input', async (e) => {
                await Sleep(2);
                const inputElement = e.target as HTMLInputElement;
                if (/^[a-z]/.test(inputElement.value)) {
                    inputElement.value = '~' + inputElement.value;
                }
            });

            inputDOM.classList.add('helper_checked');
        }
    });

    console.log('Add tilda done!');
}