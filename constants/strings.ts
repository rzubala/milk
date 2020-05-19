import i18n from "i18n-js";

const en = {
    Milk: 'Milk',
    Feeding: 'Feeding',
    DailyFeeding: 'Daily feeding',
    EditFeeding: 'Edit feeding',
    AddFeeding: 'Add feeding',
    MilkVolume: 'Milk volume [ml]',
    Time: 'Date and time',
}

const pl = {
    Milk: 'Mleko',
    Feeding: 'Karmienie',
    DailyFeeding: 'Dzienne karmienie',
    EditFeeding: 'Edytuj karmienie',
    AddFeeding: 'Dodaj karmienie',
    MilkVolume: 'Objętość mleka [ml]',
    Time: 'Data i godzina',
}

i18n.translations["en"] = en;
i18n.translations["pl"] = pl;

export default i18n;