export const products: Array<Record<string, string>> = 
[
    {
        value: "كمبيوتر محمول;Laptop;Laptop;Ordinateur portable",
    },
    {
        value: "شاشة LCD;LCD-Monitor;LCD Monitor;Moniteur LCD",
    },
    {
        value: "شاشة LED;LED-Monitor;LED Monitor;Moniteur LED",
    },
    {
        value: "Notebook;Notebook;Notebook;Carnet de notes",
    },
    {
        value: "لوحة مفاتيح سلكية;Kabelgebundene Tastatur;Wired keyboard;Clavier filaire",
    },
    {
        value: "فأرة سلكية;Kabelgebundene Maus;Wired mouse;Souris filaire",
    },
    {
        value: "لوحة مفاتيح لاسلكية;Kabellose Tastatur;Wireless keyboard;Clavier sans fil",
    },
    {
        value: "فأرة لاسلكية;Kabellose Maus;Wireless mouse;Souris sans fil"
    },
];
        const accountLanguage = 1036;

        const values = [1025, 1031, 1033, 1036];

        // Find index of selected language

        const langIndex = values.findIndex(v => v === accountLanguage);

        export const result = products.map(p => ({value: p.value.split(";")[langIndex]}));

        console.log(result);