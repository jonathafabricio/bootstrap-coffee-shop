document.addEventListener('DOMContentLoaded', function() {
    let flagBr = document.getElementById('flagBr');
    let flagUs = document.getElementById('flagUs');

    async function loadTranslations() {
        const response = await fetch('./assets/translations/translations.json');
        return await response.json();
    }

    function updateTexts(translations, language) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            let translation;

            if (key.startsWith('carousel')) {
                translation = translations[key] && translations[key][language];
            } else if (key.includes('.')) {
                const parts = key.split('.');
                translation = translations[parts[0]] && translations[parts[0]][language][parts[1]];
            } else {
                translation = translations[key] && translations[key][language];
            }

            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'search') {
                    element.placeholder = translation;
                } else {
                    element.innerText = translation;
                }
            }
        });
    }

    function setActiveLanguage(language) {
        if (language === 'pt-BR') {
            flagBr.classList.add('active-language');
            flagUs.classList.remove('active-language');
        } else {
            flagUs.classList.add('active-language');
            flagBr.classList.remove('active-language');
        }
    }

    flagBr.addEventListener('click', async () => {
        const translations = await loadTranslations();
        updateTexts(translations, 'pt-BR');
        setActiveLanguage('pt-BR');
    });

    flagUs.addEventListener('click', async () => {
        const translations = await loadTranslations();
        updateTexts(translations, 'en-US');
        setActiveLanguage('en-US');
    });

    loadTranslations().then(translations => {
        updateTexts(translations, 'pt-BR');
        setActiveLanguage('pt-BR');
    });
});
