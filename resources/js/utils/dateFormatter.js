export function formatLocalizedDate(dateInput, t, locale) {
    if (!dateInput) return '';

    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const year = d.getFullYear();
        const monthsFr = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        const monthTranslated = t(monthsFr[d.getMonth()]);
        return `${day} ${monthTranslated} ${year}`;
    }

    let str = String(dateInput);
    const monthsMap = [
        { regex: /janvier|jan/i, key: "Janvier" },
        { regex: /février|fevrier|fév|fev/i, key: "Février" },
        { regex: /mars|mar/i, key: "Mars" },
        { regex: /avril|avr/i, key: "Avril" },
        { regex: /mai/i, key: "Mai" },
        { regex: /juin/i, key: "Juin" },
        { regex: /juillet|juil|jul/i, key: "Juillet" },
        { regex: /août|aout|aug/i, key: "Août" },
        { regex: /septembre|sep/i, key: "Septembre" },
        { regex: /octobre|oct/i, key: "Octobre" },
        { regex: /novembre|nov/i, key: "Novembre" },
        { regex: /décembre|decembre|déc|dec/i, key: "Décembre" }
    ];

    for (const m of monthsMap) {
        if (m.regex.test(str)) {
            str = str.replace(m.regex, t(m.key));
            break;
        }
    }
    return str;
}
