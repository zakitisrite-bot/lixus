import { usePage } from '@inertiajs/react';

export default function useTranslation() {
    const { locale, translations } = usePage().props;

    const t = (key) => {
        if (translations && translations[key]) {
            return translations[key];
        }
        return key;
    };

    return { t, locale };
}
