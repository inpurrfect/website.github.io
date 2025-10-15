const { useState, useEffect } = React;

const Icons = {
    Copy: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
    ),
    Mail: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
    ),
    Link2: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 17H7A5 5 0 0 1 7 7h2"/>
            <path d="M15 7h2a5 5 0 1 1 0 10h-2"/>
            <line x1="8" x2="16" y1="12" y2="12"/>
        </svg>
    ),
    FileText: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M10 9H8"/>
            <path d="M16 13H8"/>
            <path d="M16 17H8"/>
        </svg>
    ),
    ArrowRight: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
        </svg>
    ),
    Database: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
            <path d="M3 12A9 3 0 0 0 21 12"/>
        </svg>
    ),
    Plus: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
        </svg>
    ),
    Trash2: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" x2="10" y1="11" y2="17"/>
            <line x1="14" x2="14" y1="11" y2="17"/>
        </svg>
    ),
    ExternalLink: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 3h6v6"/>
            <path d="M10 14 21 3"/>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        </svg>
    ),
    AlertCircle: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4"/>
            <path d="M12 16h.01"/>
        </svg>
    ),
    Sparkles: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
        </svg>
    ),
    TrendingUp: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
        </svg>
    ),
    LogOut: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
    ),
    User: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    ),
    Moon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    ),
    Sun: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" x2="12" y1="1" y2="3"/>
            <line x1="12" x2="12" y1="21" y2="23"/>
            <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"/>
            <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"/>
            <line x1="1" x2="3" y1="12" y2="12"/>
            <line x1="21" x2="23" y1="12" y2="12"/>
            <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"/>
            <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"/>
        </svg>
    ),
    Search: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>
    ),
    BarChart: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="12" x2="12" y1="20" y2="10"/>
            <line x1="18" x2="18" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>
    )
};

const defaultTemplates = {
    'Refund - Standard': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht.\n\nWir haben Ihre Anfrage geprüft und werden die Rückerstattung in Höhe von <Betrag> veranlassen. Das Geld wird innerhalb von <Tage> Werktagen auf Ihr Konto zurückerstattet.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message.\n\nWe have reviewed your request and will process a refund of <Amount>. The money will be returned to your account within <Days> business days.\n\nBest regards\nNextbike Team',
        category: 'Refunds',
        keywords: 'refund,rückerstattung,money back,geld zurück,zurückerstatten,reimburse'
    },
    'Refund - Partial': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht.\n\nNach Überprüfung Ihres Falls können wir Ihnen eine teilweise Rückerstattung von <Betrag> anbieten. Die ursprüngliche Gebühr von <Original Betrag> wurde berechnet, weil <Grund>.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message.\n\nAfter reviewing your case, we can offer you a partial refund of <Amount>. The original fee of <Original Amount> was charged because <Reason>.\n\nBest regards\nNextbike Team',
        category: 'Refunds',
        keywords: 'teilweise,partial,part,teil,some money,ein teil'
    },
    'Refund - Denied': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht.\n\nLeider können wir Ihrer Rückerstattungsanfrage nicht stattgeben, da <Grund>. Gemäß unseren AGB ist die Gebühr berechtigt.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message.\n\nUnfortunately, we cannot approve your refund request because <Reason>. According to our terms and conditions, the fee is justified.\n\nBest regards\nNextbike Team',
        category: 'Refunds',
        keywords: 'deny,ablehnen,nicht möglich,cannot,leider nicht,unfortunately,no refund'
    },
    'Accident - Report Received': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht bezüglich des Vorfalls vom <Datum> um <Uhrzeit> Uhr.\n\nWir haben Ihre Schadenmeldung unter der Nummer <Schadensnummer> aufgenommen und werden uns umgehend darum kümmern. Ein Mitarbeiter wird sich innerhalb von <Zeitraum> bei Ihnen melden.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message regarding the incident on <Date> at <Time>.\n\nWe have recorded your damage report under number <Report Number> and will address it immediately. A staff member will contact you within <Timeframe>.\n\nBest regards\nNextbike Team',
        category: 'Accident',
        keywords: 'accident,unfall,crash,kollision,damage,schaden,incident,vorfall,injured,verletzt'
    },
    'Technical Issue - Bike': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Meldung bezüglich des defekten Fahrrads <Bike-Nr>.\n\nWir haben das Problem <Problem> dokumentiert und das Fahrrad wurde aus dem Verkehr gezogen. Ihre Miete wurde entsprechend angepasst/storniert.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for reporting the defective bike <Bike Number>.\n\nWe have documented the problem <Problem> and the bike has been removed from service. Your rental has been adjusted/cancelled accordingly.\n\nBest regards\nNextbike Team',
        category: 'Level 2',
        keywords: 'defect,defekt,broken,kaputt,not working,funktioniert nicht,bike problem,fahrrad problem,flat tire,platter reifen'
    },
    'PayPal - Payment Issue': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht bezüglich Ihrer PayPal-Zahlung.\n\nWir haben festgestellt, dass <Problem>. Bitte <Lösung>. Sollte das Problem weiterhin bestehen, wenden Sie sich bitte direkt an PayPal unter der Transaktionsnummer <Transaktions-ID>.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message regarding your PayPal payment.\n\nWe have identified that <Problem>. Please <Solution>. If the problem persists, please contact PayPal directly using transaction number <Transaction ID>.\n\nBest regards\nNextbike Team',
        category: 'PayPal',
        keywords: 'paypal,payment,zahlung,transaction,transaktion,charged,belastet'
    },
    'SEPA - Direct Debit': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht bezüglich der SEPA-Lastschrift.\n\nDie Abbuchung von <Betrag> erfolgte am <Datum> für <Beschreibung>. Die Mandatsreferenz lautet: <Mandatsreferenz>.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message regarding the SEPA direct debit.\n\nThe debit of <Amount> was processed on <Date> for <Description>. The mandate reference is: <Mandate Reference>.\n\nBest regards\nNextbike Team',
        category: 'SEPA',
        keywords: 'sepa,lastschrift,direct debit,bank,konto,account,abbuchung'
    },
    'Dimoco - Mobile Payment': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht bezüglich Ihrer Mobilfunkrechnung.\n\nDie Zahlung über Dimoco in Höhe von <Betrag> wurde für <Beschreibung> verarbeitet. Bei Fragen zur Abrechnung wenden Sie sich bitte an Ihren Mobilfunkanbieter <Anbieter> oder direkt an Dimoco.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message regarding your mobile phone bill.\n\nThe payment via Dimoco of <Amount> was processed for <Description>. For billing questions, please contact your mobile operator <Provider> or Dimoco directly.\n\nBest regards\nNextbike Team',
        category: 'Dimoco',
        keywords: 'dimoco,mobile,handy,phone bill,mobilfunkrechnung,carrier billing'
    },
    'Account - Login Issue': {
        de: 'Guten Tag,\n\nvielen Dank für Ihre Nachricht bezüglich Ihrer Login-Probleme.\n\nBitte versuchen Sie, Ihr Passwort über die „Passwort vergessen"-Funktion zurückzusetzen. Falls das Problem weiterhin besteht, überprüfen Sie bitte Ihre E-Mail-Adresse und App-Version.\n\nMit freundlichen Grüßen\nNextbike Team',
        en: 'Hello,\n\nThank you for your message regarding your login issues.\n\nPlease try to reset your password using the "Forgot password" function. If the problem persists, please check your email address and app version.\n\nBest regards\nNextbike Team',
        category: 'Level 2',
        keywords: 'login,anmelden,password,passwort,cannot login,kann nicht,forgot password,passwort vergessen,account locked,konto gesperrt'
    }
};

const defaultCategories = [
    { name: 'Customer Account', color: 'bg-blue-500' },
    { name: 'Other', color: 'bg-gray-500' },
    { name: 'Rental', color: 'bg-green-500' },
    { name: 'Service Fee', color: 'bg-purple-500' }
];

function NextbikeEmailHelper() {
    const [emailContent, setEmailContent] = useState('');
    const [extractedData, setExtractedData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('de');
    const [filledTemplate, setFilledTemplate] = useState('');
    const [copiedField, setCopiedField] = useState('');
    const [showTemplateManager, setShowTemplateManager] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDE, setNewTemplateDE] = useState('');
    const [newTemplateEN, setNewTemplateEN] = useState('');
    const [newTemplateKeywords, setNewTemplateKeywords] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#3b82f6');
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('nextbike_darkMode');
        return saved ? JSON.parse(saved) : false;
    });
    const [showStatistics, setShowStatistics] = useState(false);
    const [templateSearch, setTemplateSearch] = useState('');
    const [statistics, setStatistics] = useState(() => {
        const saved = sessionStorage.getItem('nextbike_session_statistics');
        return saved ? JSON.parse(saved) : {
            emailsProcessed: 0,
            templateUsage: {},
            categoryUsage: {},
            sessionStart: new Date().toISOString()
        };
    });

    const [templates, setTemplates] = useState(() => {
        const saved = localStorage.getItem('nextbike_templates');
        return saved ? JSON.parse(saved) : defaultTemplates;
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('nextbike_categories');
        return saved ? JSON.parse(saved) : defaultCategories;
    });

    useEffect(() => {
        localStorage.setItem('nextbike_templates', JSON.stringify(templates));
    }, [templates]);

    useEffect(() => {
        localStorage.setItem('nextbike_categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('nextbike_darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        sessionStorage.setItem('nextbike_session_statistics', JSON.stringify(statistics));
    }, [statistics]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const trackEmailProcessed = (emailText) => {
        if (!emailText || emailText.trim().length < 10) {
            return;
        }
        setStatistics(prev => ({
            ...prev,
            emailsProcessed: prev.emailsProcessed + 1
        }));
    };

    const trackTemplateUsage = (templateName) => {
        setStatistics(prev => ({
            ...prev,
            templateUsage: {
                ...prev.templateUsage,
                [templateName]: (prev.templateUsage[templateName] || 0) + 1
            }
        }));
    };

    const trackCategoryUsage = (categoryName) => {
        setStatistics(prev => ({
            ...prev,
            categoryUsage: {
                ...prev.categoryUsage,
                [categoryName]: (prev.categoryUsage[categoryName] || 0) + 1
            }
        }));
    };

    const calculateMatchScore = (emailText, template) => {
        if (!emailText || !template.keywords) return 0;

        const emailLower = emailText.toLowerCase();
        const keywords = template.keywords.toLowerCase().split(',').map(k => k.trim());

        let matches = 0;
        let totalWeight = keywords.length;

        keywords.forEach(keyword => {
            if (emailLower.includes(keyword)) {
                matches++;
            }
        });

        const categoryBonus = emailLower.includes(template.category.toLowerCase()) ? 0.2 : 0;
        const score = ((matches / totalWeight) + categoryBonus) * 100;
        return Math.min(Math.round(score), 100);
    };

    const generateSuggestions = (emailText) => {
        const scored = Object.entries(templates).map(([name, template]) => ({
            name,
            template,
            score: calculateMatchScore(emailText, template)
        }));

        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    };

    const detectCrashIncident = (text) => {
        const crashKeywords = [
            'crash', 'crashed', 'kollision', 'unfall', 'verunfallt',
            'zusammenstoß', 'zusammengestoßen', 'accident', 'collision',
            'hit', 'getroffen', 'aufgefahren', 'gestürzt', 'sturz',
            'umgefallen', 'schwer verletzt', 'seriously injured', 'injury',
            'verletzung', 'ambulance', 'krankenwagen', 'hospital', 'krankenhaus',
            'smashed', 'zerstört', 'destroyed', 'demoliert', 'totalled'
        ];

        const textLower = text.toLowerCase();
        const foundKeywords = crashKeywords.filter(keyword => textLower.includes(keyword));

        return {
            hasCrash: foundKeywords.length > 0,
            keywords: foundKeywords
        };
    };

    const extractInfo = (text) => {
        const customerMatch = text.match(/customers\/edit\/(\d+)/);
        const bikeMatch = text.match(/bikes\/edit\/(\d+)/);
        const rentalMatch = text.match(/rentals\/edit\/(\d+)/);
        const errorReportMatch = text.match(/errorreport\/edit\/(\d+)/);
        const dateMatch = text.match(/Date: ([\d-]+ [\d:]+)/);
        const problemMatch = text.match(/Reportable_Problem description: (.+)/);

        const germanText = text.match(/Ich habe.*?(?=---|\\n\\n|$)/s);
        const englishText = text.match(/I (have|had).*?(?=---|\\n\\n|$)/s);
        const customerMessage = germanText || englishText;

        const crashDetection = detectCrashIncident(text);

        return {
            customerId: customerMatch ? customerMatch[1] : null,
            customerLink: customerMatch ? `https://my.nextbike.net/office/customers/edit/${customerMatch[1]}` : null,
            bikeId: bikeMatch ? bikeMatch[1] : null,
            bikeLink: bikeMatch ? `https://my.nextbike.net/office/bikes/edit/${bikeMatch[1]}` : null,
            rentalId: rentalMatch ? rentalMatch[1] : null,
            rentalLink: rentalMatch ? `https://my.nextbike.net/office/rentals/edit/${rentalMatch[1]}` : null,
            errorReportId: errorReportMatch ? errorReportMatch[1] : null,
            errorReportLink: errorReportMatch ? `https://my.nextbike.net/office/errorreport/edit/${errorReportMatch[1]}` : null,
            date: dateMatch ? dateMatch[1] : null,
            problem: problemMatch ? problemMatch[1] : null,
            customerMessage: customerMessage ? customerMessage[0].trim() : null,
            messageLanguage: germanText ? 'de' : englishText ? 'en' : null,
            crashDetected: crashDetection.hasCrash,
            crashKeywords: crashDetection.keywords
        };
    };

    const generateTLDR = () => {
        if (!extractedData) return '';

        const parts = [];
        if (extractedData.customerId) parts.push(`Customer: ${extractedData.customerId}`);
        if (extractedData.bikeId) parts.push(`Bike: ${extractedData.bikeId}`);
        if (extractedData.rentalId) parts.push(`Rental: ${extractedData.rentalId}`);
        if (extractedData.problem) parts.push(`Issue: ${extractedData.problem}`);
        if (selectedCategory) parts.push(`Category: ${selectedCategory}`);

        return parts.join(' | ');
    };

    const handleExtract = () => {
        if (!emailContent || emailContent.trim().length < 10) {
            alert('Please paste valid email content (at least 10 characters)');
            return;
        }

        const data = extractInfo(emailContent);
        setExtractedData(data);
        trackEmailProcessed(emailContent);

        if (data.messageLanguage) {
            setSelectedLanguage(data.messageLanguage);
        }

        if (data.crashDetected) {
            const accidentTemplate = Object.entries(templates).find(([name, _]) =>
                name.toLowerCase().includes('accident') || name.toLowerCase().includes('unfall')
            );

            if (accidentTemplate) {
                const [name, template] = accidentTemplate;
                setSelectedCategory(template.category);
                setSelectedTemplate(name);
                setFilledTemplate(data.messageLanguage === 'de' ? template.de : template.en);
                trackTemplateUsage(name);
                trackCategoryUsage(template.category);
                setSuggestions([{ name, template, score: 100 }]);
                return;
            }
        }

        const suggested = generateSuggestions(emailContent);
        setSuggestions(suggested);

        if (suggested.length > 0 && suggested[0].score >= 70) {
            setSelectedCategory(suggested[0].template.category);
            setSelectedTemplate(suggested[0].name);
            const template = suggested[0].template;
            setFilledTemplate(data.messageLanguage === 'de' ? template.de : template.en);
            trackTemplateUsage(suggested[0].name);
            trackCategoryUsage(suggested[0].template.category);
        }
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    const getTemplatesByCategory = (category) => {
        return Object.entries(templates)
            .filter(([_, template]) => template.category === category)
            .map(([name, _]) => name);
    };

    const getFilteredTemplates = () => {
        if (!templateSearch) return templates;

        const searchLower = templateSearch.toLowerCase();
        return Object.entries(templates)
            .filter(([name, template]) =>
                name.toLowerCase().includes(searchLower) ||
                template.category.toLowerCase().includes(searchLower) ||
                (template.keywords && template.keywords.toLowerCase().includes(searchLower))
            )
            .reduce((acc, [name, template]) => {
                acc[name] = template;
                return acc;
            }, {});
    };

    const extractBlanks = (text) => {
        const blanks = text.match(/<[^>]+>/g) || [];
        return [...new Set(blanks)];
    };

    const handleTemplateSelect = (templateName) => {
        setSelectedTemplate(templateName);
        const template = templates[templateName];
        setFilledTemplate(selectedLanguage === 'de' ? template.de : template.en);
        trackTemplateUsage(templateName);
        if (template.category) {
            trackCategoryUsage(template.category);
        }
    };

    const handleLanguageSwitch = (lang) => {
        setSelectedLanguage(lang);
        if (selectedTemplate) {
            const template = templates[selectedTemplate];
            setFilledTemplate(lang === 'de' ? template.de : template.en);
        }
    };

    const addTemplate = () => {
        if (newTemplateName && newTemplateDE && newTemplateEN && selectedCategory) {
            setTemplates({
                ...templates,
                [newTemplateName]: {
                    de: newTemplateDE,
                    en: newTemplateEN,
                    category: selectedCategory,
                    keywords: newTemplateKeywords
                }
            });
            setNewTemplateName('');
            setNewTemplateDE('');
            setNewTemplateEN('');
            setNewTemplateKeywords('');
            alert('Template added successfully!');
        }
    };

    const deleteTemplate = (templateName) => {
        if (confirm(`Delete template "${templateName}"?`)) {
            const newTemplates = { ...templates };
            delete newTemplates[templateName];
            setTemplates(newTemplates);
            if (selectedTemplate === templateName) {
                setSelectedTemplate('');
            }
        }
    };

    const addCategory = () => {
        if (newCategoryName && newCategoryColor) {
            setCategories([...categories, { name: newCategoryName, color: newCategoryColor }]);
            setNewCategoryName('');
            setNewCategoryColor('#3b82f6');
            alert('Category added successfully!');
        }
    };

    const deleteCategory = (categoryName) => {
        if (confirm(`Delete category "${categoryName}"? This will not delete templates in this category.`)) {
            setCategories(categories.filter(cat => cat.name !== categoryName));
            if (selectedCategory === categoryName) {
                setSelectedCategory('');
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedCategory(suggestion.template.category);
        setSelectedTemplate(suggestion.name);
        const template = suggestion.template;
        setFilledTemplate(selectedLanguage === 'de' ? template.de : template.en);
        trackTemplateUsage(suggestion.name);
        trackCategoryUsage(suggestion.template.category);

        const templateSection = document.getElementById('template-section');
        if (templateSection) {
            templateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getMatchColor = (score) => {
        if (score >= 70) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        if (score >= 30) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className={`min-h-screen p-6 pb-24 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`rounded-2xl shadow-xl p-6 mb-6 flex items-center justify-between flex-wrap gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center gap-3">
                        <Icons.Mail className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                        <div>
                            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nextbike Email Assistant</h1>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Smart email template assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowStatistics(!showStatistics)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                            <Icons.BarChart className="w-5 h-5" />
                            {showStatistics ? 'Hide' : 'Show'} Stats
                        </button>
                        <button
                            onClick={() => setShowTemplateManager(!showTemplateManager)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-purple-700 hover:bg-purple-800 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                        >
                            <Icons.Database className="w-5 h-5" />
                            {showTemplateManager ? 'Hide' : 'Manage'} Templates
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white'}`}
                        >
                            {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                            {darkMode ? 'Light' : 'Dark'}
                        </button>
                    </div>
                </div>

                {showStatistics && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.BarChart className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                Session Statistics
                            </h2>
                            <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                Resets when browser closes
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-blue-200'}`}>
                                <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>Emails Processed</div>
                                <div className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-blue-900'}`}>{statistics.emailsProcessed}</div>
                            </div>
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-purple-100 to-purple-200'}`}>
                                <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-purple-800'}`}>Templates Used</div>
                                <div className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-purple-900'}`}>{Object.keys(statistics.templateUsage).length}</div>
                            </div>
                            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-100 to-green-200'}`}>
                                <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-green-800'}`}>Categories Used</div>
                                <div className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-green-900'}`}>{Object.keys(statistics.categoryUsage).length}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Most Used Templates</h3>
                                <div className="space-y-2">
                                    {Object.entries(statistics.templateUsage)
                                        .sort((a, b) => b[1] - a[1])
                                        .slice(0, 5)
                                        .map(([name, count]) => (
                                            <div key={name} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{name}</span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-200 text-indigo-900'}`}>{count}x</span>
                                            </div>
                                        ))}
                                    {Object.keys(statistics.templateUsage).length === 0 && (
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No templates used yet</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Category Distribution</h3>
                                <div className="space-y-2">
                                    {Object.entries(statistics.categoryUsage)
                                        .sort((a, b) => b[1] - a[1])
                                        .map(([name, count]) => (
                                            <div key={name} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{name}</span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-200 text-purple-900'}`}>{count}x</span>
                                            </div>
                                        ))}
                                    {Object.keys(statistics.categoryUsage).length === 0 && (
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No categories used yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showTemplateManager && (
                    <div className="space-y-6 mb-6">
                        {/* Add Category Section */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.Plus className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                Add New Category
                            </h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Category Name"
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                                />
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Select Color
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={newCategoryColor.startsWith('#') ? newCategoryColor : '#3b82f6'}
                                            onChange={(e) => setNewCategoryColor(e.target.value)}
                                            className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                                        />
                                        <div className={`flex-1 p-4 rounded-xl text-white font-semibold text-center`} style={{backgroundColor: newCategoryColor.startsWith('#') ? newCategoryColor : '#3b82f6'}}>
                                            Preview
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={addCategory}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                >
                                    Add Category
                                </button>
                            </div>
                        </div>

                        {/* Manage Categories Section */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.Database className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                Manage Categories
                            </h2>
                            <div className="space-y-2">
                                {categories.map(category => {
                                    const isHexColor = category.color.startsWith('#');
                                    return (
                                        <div key={category.name} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={isHexColor ? 'w-8 h-8 rounded' : `${category.color} w-8 h-8 rounded`}
                                                    style={isHexColor ? {backgroundColor: category.color} : {}}
                                                ></div>
                                                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{category.name}</div>
                                            </div>
                                            <button
                                                onClick={() => deleteCategory(category.name)}
                                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                            >
                                                <Icons.Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add Template Section */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.Plus className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                Add New Template
                            </h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newTemplateName}
                                    onChange={(e) => setNewTemplateName(e.target.value)}
                                    placeholder="Template Name"
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' : 'border-gray-300 focus:border-purple-500'}`}
                                />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'border-gray-300 focus:border-purple-500'}`}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={newTemplateKeywords}
                                    onChange={(e) => setNewTemplateKeywords(e.target.value)}
                                    placeholder="Keywords (comma separated: refund,rückerstattung,money back)"
                                    className={`w-full p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' : 'border-gray-300 focus:border-purple-500'}`}
                                />
                                <textarea
                                    value={newTemplateDE}
                                    onChange={(e) => setNewTemplateDE(e.target.value)}
                                    placeholder="German template (use <Blank> for fields to fill)"
                                    className={`w-full h-32 p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' : 'border-gray-300 focus:border-purple-500'}`}
                                />
                                <textarea
                                    value={newTemplateEN}
                                    onChange={(e) => setNewTemplateEN(e.target.value)}
                                    placeholder="English template (use <Blank> for fields to fill)"
                                    className={`w-full h-32 p-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' : 'border-gray-300 focus:border-purple-500'}`}
                                />
                                <button
                                    onClick={addTemplate}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-purple-700 hover:bg-purple-800 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                                >
                                    Add Template
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`rounded-2xl shadow-xl p-8 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Paste Email Content
                    </label>
                    <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        className={`w-full h-48 p-4 border-2 rounded-lg focus:outline-none resize-none font-mono text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500' : 'border-gray-300 focus:border-indigo-500'}`}
                        placeholder="Paste the email content here..."
                    />
                    <button
                        onClick={handleExtract}
                        className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                    >
                        <Icons.ArrowRight className="w-5 h-5" />
                        Extract & Analyze
                    </button>
                </div>

                {extractedData && extractedData.crashDetected && (
                    <div className="bg-red-600 rounded-xl shadow-2xl p-6 mb-6 border-4 border-red-800 animate-pulse">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Icons.AlertCircle className="w-12 h-12 text-white animate-bounce" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    ⚠️ SERIOUS INCIDENT DETECTED
                                </h2>
                                <p className="text-white text-lg mb-3">
                                    This email mentions a <strong>BIKE CRASH or SERIOUS ACCIDENT</strong>. Immediate attention required!
                                </p>
                                <div className="bg-red-800 rounded-lg p-4 mb-3">
                                    <div className="text-red-100 font-semibold mb-2">Detected keywords:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {extractedData.crashKeywords.map((keyword, index) => (
                                            <span key={index} className="px-3 py-1 bg-red-900 text-white rounded-full text-sm font-bold uppercase">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-red-600 font-bold mb-2">⚡ Action Required:</div>
                                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                                        <li>Check for injuries and contact emergency services if needed</li>
                                        <li>Document all incident details and damage reports</li>
                                        <li>Escalate to Level 2 support immediately</li>
                                        <li>Verify bike condition and remove from service</li>
                                        <li>Review rental history and customer account</li>
                                        <li>Contact insurance if applicable</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {suggestions.length > 0 && (
                    <div className={`rounded-xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900' : 'bg-gradient-to-r from-pink-500 to-orange-500'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Icons.Sparkles className="w-6 h-6 text-white" />
                                <h2 className="text-2xl font-bold text-white">AI-Analyzed Templates</h2>
                            </div>
                            <span className="text-xs px-3 py-1 bg-white bg-opacity-20 text-white rounded-full">
                                Click to use
                            </span>
                        </div>
                        <div className="space-y-3">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`rounded-lg p-4 cursor-pointer transition-all transform hover:scale-102 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                {index === 0 && suggestion.score >= 70 && (
                                                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                                        BEST MATCH
                                                    </span>
                                                )}
                                                <span className={`text-xl font-bold ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>#{index + 1}</span>
                                                <div className="flex-1">
                                                    <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{suggestion.name}</div>
                                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{suggestion.template.category}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                                    <div
                                                        className={`${getMatchColor(suggestion.score)} h-4 rounded-full transition-all match-bar flex items-center justify-end pr-2`}
                                                        style={{ width: `${suggestion.score}%` }}
                                                    >
                                                        {suggestion.score >= 30 && (
                                                            <span className="text-white text-xs font-bold">{suggestion.score}%</span>
                                                        )}
                                                    </div>
                                                </div>
                                                {suggestion.score < 30 && (
                                                    <span className={`font-bold text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{suggestion.score}%</span>
                                                )}
                                                <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {suggestion.score >= 80 ? 'Excellent' :
                                                     suggestion.score >= 60 ? 'Good' :
                                                     suggestion.score >= 40 ? 'Fair' : 'Low'} Match
                                                </div>
                                            </div>
                                        </div>
                                        <button className={`ml-4 px-6 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
                                            Use This
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {extractedData && generateTLDR() && (
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Icons.AlertCircle className="w-6 h-6 text-white" />
                                <div>
                                    <div className="text-xs text-indigo-100 font-semibold mb-1">QUICK SUMMARY</div>
                                    <div className="text-white font-mono text-sm">{generateTLDR()}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(generateTLDR(), 'tldr')}
                                className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
                            >
                                <Icons.Copy className="w-4 h-4" />
                                {copiedField === 'tldr' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}

                {extractedData && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Icons.Link2 className="w-6 h-6 text-indigo-600" />
                            Quick Access
                        </h2>
                        <div className="space-y-3">
                            {extractedData.customerId && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                                    <div>
                                        <div className="text-xs text-blue-600 font-semibold">Customer</div>
                                        <div className="font-mono text-blue-900">{extractedData.customerId}</div>
                                    </div>
                                    <button
                                        onClick={() => openLink(extractedData.customerLink)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                                    >
                                        <Icons.ExternalLink className="w-4 h-4" />
                                        Open
                                    </button>
                                </div>
                            )}
                            {extractedData.bikeId && (
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
                                    <div>
                                        <div className="text-xs text-green-600 font-semibold">Bike</div>
                                        <div className="font-mono text-green-900">{extractedData.bikeId}</div>
                                    </div>
                                    <button
                                        onClick={() => openLink(extractedData.bikeLink)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                                    >
                                        <Icons.ExternalLink className="w-4 h-4" />
                                        Open
                                    </button>
                                </div>
                            )}
                            {extractedData.rentalId && (
                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                                    <div>
                                        <div className="text-xs text-purple-600 font-semibold">Rental</div>
                                        <div className="font-mono text-purple-900">{extractedData.rentalId}</div>
                                    </div>
                                    <button
                                        onClick={() => openLink(extractedData.rentalLink)}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center gap-2"
                                    >
                                        <Icons.ExternalLink className="w-4 h-4" />
                                        Open
                                    </button>
                                </div>
                            )}
                            {extractedData.errorReportId && (
                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-2 border-red-200">
                                    <div>
                                        <div className="text-xs text-red-600 font-semibold">Error Report</div>
                                        <div className="font-mono text-red-900">{extractedData.errorReportId}</div>
                                    </div>
                                    <button
                                        onClick={() => openLink(extractedData.errorReportLink)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                                    >
                                        <Icons.ExternalLink className="w-4 h-4" />
                                        Open
                                    </button>
                                </div>
                            )}
                            {extractedData.problem && (
                                <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                                    <div className="text-xs text-yellow-600 font-semibold mb-1">Problem Description</div>
                                    <div className="text-yellow-900">{extractedData.problem}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {extractedData && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Icons.Database className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                            Select Category
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {categories.map(category => {
                                const isSelected = selectedCategory === category.name;
                                const isHexColor = category.color.startsWith('#');
                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => {
                                            setSelectedCategory(category.name);
                                            setSelectedTemplate('');
                                            setFilledTemplate('');
                                        }}
                                        className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                                            isSelected && !isHexColor
                                                ? `${category.color} text-white shadow-lg scale-105`
                                                : !isSelected && (darkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                                        }`}
                                        style={isSelected && isHexColor ? {backgroundColor: category.color, color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', transform: 'scale(1.05)'} : {}}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{category.name}</span>
                                            {isSelected && <span className="ml-2">✓</span>}
                                        </div>
                                        <div className={`text-xs mt-1 ${isSelected ? 'text-white opacity-90' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {getTemplatesByCategory(category.name).length} templates
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {selectedCategory && (
                    <div id="template-section" className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.FileText className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                                Select Template
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleLanguageSwitch('de')}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedLanguage === 'de' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    DE
                                </button>
                                <button
                                    onClick={() => handleLanguageSwitch('en')}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedLanguage === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Templates in {selectedCategory}
                            </label>
                            <div className="relative">
                                <Icons.Search className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => handleTemplateSelect(e.target.value)}
                                    className={`w-full pl-10 p-3 border-2 rounded-lg focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500' : 'bg-white border-gray-300 text-gray-800 focus:border-indigo-500'}`}
                                >
                                    <option value="">Choose a template...</option>
                                    {Object.entries(templates)
                                        .filter(([_, template]) => template.category === selectedCategory)
                                        .map(([name, template]) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {filledTemplate && (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Response</label>
                                    <button
                                        onClick={() => copyToClipboard(filledTemplate, 'template')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${darkMode ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                                    >
                                        <Icons.Copy className="w-4 h-4" />
                                        {copiedField === 'template' ? 'Copied!' : 'Copy Response'}
                                    </button>
                                </div>
                                <textarea
                                    value={filledTemplate}
                                    onChange={(e) => setFilledTemplate(e.target.value)}
                                    className={`w-full h-64 p-4 border-2 rounded-lg focus:outline-none resize-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500' : 'border-gray-300 focus:border-indigo-500'}`}
                                />

                                {extractBlanks(filledTemplate).length > 0 && (
                                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                                        <div className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                            <Icons.AlertCircle className="w-4 h-4" />
                                            Fields to fill in:
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {extractBlanks(filledTemplate).map((blank, index) => (
                                                <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-mono">
                                                    {blank}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {showTemplateManager && (
                    <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Icons.Database className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                            All Templates
                        </h2>
                        <div className="mb-4">
                            <div className="relative">
                                <Icons.Search className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="text"
                                    value={templateSearch}
                                    onChange={(e) => setTemplateSearch(e.target.value)}
                                    placeholder="Search templates by name, category, or keywords..."
                                    className={`w-full pl-10 p-3 border-2 rounded-lg focus:outline-none transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-purple-500'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {Object.entries(getFilteredTemplates()).map(([name, template]) => (
                                <div key={name} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                    <div>
                                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{name}</div>
                                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{template.category}</div>
                                    </div>
                                    <button
                                        onClick={() => deleteTemplate(name)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                    >
                                        <Icons.Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {Object.keys(getFilteredTemplates()).length === 0 && (
                                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Icons.Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>No templates found matching "{templateSearch}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <footer className={`fixed bottom-0 left-0 right-0 shadow-lg border-t-2 py-3 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-indigo-200'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
                        <div className="flex items-center gap-2">
                            <Icons.Link2 className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                            <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quick Links:</span>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <a
                                href="https://www.nextbike.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-semibold transition-colors"
                            >
                                <Icons.ExternalLink className="w-4 h-4" />
                                Nextbike Website
                            </a>
                            <a
                                href="https://nextbike.atlassian.net/wiki/spaces/CS/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition-colors"
                            >
                                <Icons.FileText className="w-4 h-4" />
                                Atlassian Wiki
                            </a>
                            <a
                                href="https://app.slack.com/client/T01HE2ECXSL/C08L6B54LJH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-semibold transition-colors"
                            >
                                <Icons.Mail className="w-4 h-4" />
                                Slack Channel
                            </a>
                        </div>
                    </div>
                    <div className={`text-center border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Created by{' '}
                            <a
                                href="https://exwm.space"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-semibold hover:underline transition-all ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
                            >
                                Kasjan Bystrowski
                            </a>
                            {' '}for Nextbike with ❤️
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

ReactDOM.render(<NextbikeEmailHelper />, document.getElementById('root'));
