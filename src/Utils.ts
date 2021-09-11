import { BookmarkFolderModel, BookmarkModel } from "./models/BookmarkModels";

export function GetContrastTextColor(color: string) {
    if (color && color.length === 7) {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const brightness = (299 * r + 587 * g + 114 * b) / 1000;

        return brightness >= (0xff / 2) ? '#000' : '#e2e2e2'
    }

    return '#000';
}

export function Sleep(milisec: number) {
    return new Promise(resolve => { setTimeout(resolve, milisec) });
}

export function PrettyTime(time: number) {
    let now = new Date();
    let currentTime = now.getTime();
    now.setDate(0);
    let timeDiff = currentTime - time;

    if (timeDiff < 1000 * 60 * 60) // less than 1 hour
    {
        let min = Math.floor(timeDiff / 1000 / 60);
        return min + ' minute' + (min <= 1 ? '' : 's') + ' ago';
    }
    else if (timeDiff < 1000 * 60 * 60 * 24) // less than a day
    {
        let hour = Math.floor(timeDiff / 1000 / 60 / 60);
        return hour + ' hour' + (hour <= 1 ? '' : 's') + ' ago';
    }
    else if (timeDiff < 1000 * 60 * 60 * 24 * now.getDate()) // less than a month
    {
        let days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
        return days + ' day' + (days <= 1 ? '' : 's') + ' ago';
    }

    return 'a long time ago';
}

export function ReadFile(file: File): Promise<string | undefined> {
    return new Promise(resolve => {
        let fr = new FileReader();
        fr.onload = (e) => {
            if (fr.result) {
                resolve(fr.result.toString());
            }
        };
        fr.readAsText(file);
    });
}

export function WriteFile(name: string, content: string) {
    const dummy = document.createElement('a');
    dummy.setAttribute('href', "data:text/plain;charset=utf-8;base64," + btoa(content));
    dummy.setAttribute('download', name);
    document.body.appendChild(dummy);
    dummy.click();
    document.body.removeChild(dummy);
}

export function UniquePush<T = any>(array: Array<T>, ...items: Array<T>) {
    const tmp = [...array];
    const uniques = items.filter(a => !array.find(b => (a as any).id === (b as any).id));
    tmp.push(...uniques);

    return tmp;
}