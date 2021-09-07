import Globals from "../Globals"

export default class HelperSettings {
    private static _instance?: HelperSettings;
    private callbacks: Function[] = [];

    fontSize: number = 1.1;
    helperWidth: number = 390;

    public AddListener(callback: Function) {
        this.callbacks.push(callback);
    }

    public Save() {
        window.localStorage.setItem(Globals.STORAGE_HELPER_SETTINGS, JSON.stringify(this, (key, value) => {
            if (key === 'callbacks') return undefined;
            return value;
        }));
        this.callbacks.forEach(c => c());
    }

    static get Instance() {
        if (!this._instance) {
            this._instance = new HelperSettings();
            let savedSettings = window.localStorage.getItem(Globals.STORAGE_HELPER_SETTINGS);
            let savedSettingsObj;
            if (savedSettings && (savedSettingsObj = Object.assign(new HelperSettings(), JSON.parse(savedSettings)) as HelperSettings | undefined) && savedSettingsObj) {
                this._instance = savedSettingsObj;
            }
        }

        return this._instance;
    }
}