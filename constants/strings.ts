import i18n from "i18n-js";

const en = {
    Milk: 'Milk',
    Feeding: 'Feeding',
    FeedingPL: 'Feeding',
    DailyFeeding: 'Daily feeding',
    EditFeeding: 'Edit feeding',
    AddFeeding: 'Add feeding',
    MilkVolume: 'Milk volume [ml]',
    Time: 'Date and time',
    TryAgain: 'Try again',
    Poo: 'Poo'
}

const pl = {
    Milk: 'Mleko',
    Feeding: 'Karmienie',
    FeedingPL: 'Karmienia',
    DailyFeeding: 'Dobowe karmienia',
    EditFeeding: 'Edytuj karmienie',
    AddFeeding: 'Dodaj karmienie',
    MilkVolume: 'Objętość mleka [ml]',
    Time: 'Data i godzina',
    TryAgain: 'Spróbuj ponownie',
    Poo: 'Kupki'
}

i18n.translations["en"] = en;
i18n.translations["pl"] = pl;

export default i18n;