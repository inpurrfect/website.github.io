// app.js - Nextbike Email Assistant - COMPLETE VERSION
const { useState, useEffect, useRef } = React;

// Icons
const Icons = {
    Copy: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
    Mail: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    Link2: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>,
    FileText: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>,
    Database: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/></svg>,
    Plus: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    Trash2: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>,
    ExternalLink: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>,
    AlertCircle: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
    Sparkles: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    Moon: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    Sun: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" x2="12" y1="1" y2="3"/><line x1="12" x2="12" y1="21" y2="23"/></svg>,
    Search: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    BarChart: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
    Languages: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="m5 8 6 6"/><path d="M2 5h12"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>,
    Zap: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Clock: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Download: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
    Upload: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
    Settings: ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/></svg>
};

// Default fallback data
const defaultTemplates = {
    'Test Template': {
        de: 'Guten Tag,\n\nDies ist eine Test-Vorlage.\n\nMit freundlichen Grüßen',
        en: 'Hello,\n\nThis is a test template.\n\nBest regards',
        category: 'Other',
        keywords: 'test'
    }
};

const defaultCategories = [
    { name: 'Other', color: '#6b7280' }
];

// Utility functions
function extractInfo(text) {
    const customerMatch = text.match(/customers\/edit\/(\d+)/);
    const bikeMatch = text.match(/bikes\/edit\/(\d+)/);
    const rentalMatch = text.match(/rentals\/edit\/(\d+)/);
    const errorReportMatch = text.match(/errorreport\/edit\/(\d+)/);
    const dateMatch = text.match(/Date: ([\d-]+ [\d:]+)/);
    const problemMatch = text.match(/Reportable_Problem description: (.+)/);

    // Better extraction of customer message
    // Look for text BEFORE the first "------" or "Date:"
    let customerMessage = null;
    let messageLanguage = null;

    const beforeDivider = text.split(/------|\nDate:/)[0].trim();
    if (beforeDivider && beforeDivider.length > 3) {
        customerMessage = beforeDivider;
        // Detect language by common German words
        const germanWords = ['ich', 'der', 'die', 'das', 'nicht', 'schloss', 'ist', 'hat', 'schließt', 'öffnet', 'geht'];
        const englishWords = ['the', 'not', 'lock', 'doesnt', "doesn't", 'cannot', 'can\'t', 'wont', "won't"];

        const lowerMsg = customerMessage.toLowerCase();
        const hasGerman = germanWords.some(w => lowerMsg.includes(w));
        const hasEnglish = englishWords.some(w => lowerMsg.includes(w));

        if (hasGerman) messageLanguage = 'de';
        else if (hasEnglish) messageLanguage = 'en';
        else messageLanguage = 'de'; // Default to German for Nextbike
    }

    const crashKeywords = ['crash', 'unfall', 'accident', 'collision', 'injured', 'verletzt'];
    const textLower = text.toLowerCase();
    const foundCrash = crashKeywords.some(k => textLower.includes(k));

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
        customerMessage: customerMessage,
        messageLanguage: messageLanguage,
        crashDetected: foundCfunction calculateMatchScore(emailText, template, rentalData = null) {
    if (!emailText || !template.keywords) return 0;
    
    // Combine email text with rental data for better matching
    let combinedText = emailText.toLowerCase();
    
    if (rentalData) {
        // Extract relevant text from rental data
        const rentalText = [
            rentalData.comment || '',
            rentalData.customer_name || '',
            rentalData.problem || '',
            rentalData.start_location || '',
            rentalData.end_location || '',
            rentalData.system || '',
            rentalData.city || ''
        ].filter(t => t).join(' ').toLowerCase();
        
        combinedText = combinedText + ' ' + rentalText;
    }
    
    const keywords = template.keywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
    if (keywords.length === 0) return 0;
    
    // Calculate matches - give more weight to exact matches
    let matches = 0;
    let exactMatches = 0;
    
    keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        // Exact word match (with word boundaries)
        const exactRegex = new RegExp('\\b' + lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
        if (exactRegex.test(combinedText)) {
            exactMatches++;
            matches++;
        } else if (combinedText.includes(lowerKeyword)) {
            matches++;
        }
    });
    
    // Weighted scoring: exact matches count more
    const baseScore = Math.round((matches / keywords.length) * 100);
    const bonusScore = Math.round((exactMatches / keywords.length) * 30); // Up to 30% bonus
    
    return Math.min(baseScore + bonusScore, 100);
}r.includes(k)).length;
    return Math.min(Math.round((matches / keywords.length) * 100), 100);
}

function generateSimpleSummary(text) {
    const issues = [];
    const lower = text.toLowerCase();
    if (lower.includes('refund') || lower.includes('rückerstattung')) issues.push('💰 Refund request');
    if (lower.includes('bike') && (lower.includes('broken') || lower.includes('defekt'))) issues.push('🔧 Technical issue');
    if (lower.includes('accident') || lower.includes('unfall')) issues.push('⚠️ URGENT: Accident');
    if (lower.includes('login') || lower.includes('password')) issues.push('🔐 Account issue');
    if (issues.length === 0) issues.push('📧 General inquiry');
    return issues.join('\n');
}

function extractBlanks(text) {
    const blanks = text.match(/<[^>]+>/g) || [];
    return [...new Set(blanks)];
}

function getMatchColor(score) {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
}

// Main Component
function NextbikeEmailHelper() {
    const [emailContent, setEmailContent] = useState('');
    const [extractedData, setExtractedData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('de');
    const [filledTemplate, setFilledTemplate] = useState('');
    const [copiedField, setCopiedField] = useState('');
    const [showTemplateManager, setShowTemplateManager] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
      const [translatedText, setTranslatedText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recentTemplates, setRecentTemplates] = useState([]);
    const [rentalData, setRentalData] = useState(null);
    const [nextbikeCredentials, setNextbikeCredentials] = useState({ username: '', password: '' });te('');
    const [suggestions, setSuggestions] = useState([]);
    const [recentTemplates, setRecentTemplates] = useState([]);

    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDE, setNewTemplateDE] = useState('');
    const [newTemplateEN, setNewTemplateEN] = useState('');
    const [newTemplateKeywords, setNewTemplateKeywords] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#3b82f6');

    const [deeplApiKey, setDeeplApiKey] = useState(() => localStorage.getItem('nextbike_deepl_key') || '');
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('nextbike_darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [templates, setTemplates] = useState(() => {
        const saved = localStorage.getItem('nextbike_templates');
        return saved ? JSON.parse(saved) : defaultTemplates;
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('nextbike_categories');
        return saved ? JSON.parse(saved) : defaultCategories;
    });

    const [statistics, setStatistics] = useState(() => {
        const saved = sessionStorage.getItem('nextbike_statistics');
        return saved ? JSON.parse(saved) : {
            emailsProcessed: 0,
            templateUsage: {},
            categoryUsage: {}
        };
    });

    // Load templates from JSON
    useEffect(() => {
        fetch('templates.json')
            .then(res => res.json())
            .then(data => {
                if (!localStorage.getItem('nextbike_templates') && data.templates) {
                    setTemplates(data.templates);
                    localStorage.setItem('nextbike_templates', JSON.stringify(data.templates));
                }
                if (!localStorage.getItem('nextbike_categories') && data.categories) {
                    setCategories(data.categories);
                    localStorage.setItem('nextbike_categories', JSON.stringify(data.categories));
                }
            })
            .catch(err => console.log('Templates will be loaded from localStorage or defaults'));
    }, []);

    useEffect(() => {
        localStorage.setItem('nextbike_templates', JSON.stringify(templates));
    }, [templates]);

    useEffect(() => {
        localStorage.setItem('nextbike_categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('nextbike_darkMode', JSON.stringify(darkMode));
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    useEffect(() => {
        sessionStorage.setItem('nextbike_statistics', JSON.stringify(statistics));
    }, [statistics]);

    useEffect(() => {
        localStorage.setItem('nextbike_deepl_key', deeplApiKey);
    }, [deeplApiKey]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.key === 'Enter' && emailContent) {
                e.preventDefault();
                handleExtract();
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'C' && filledTemplate) {
                e.preventDefault();
                copyToClipboard(filledTemplate, 'template');
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [emailContent, filledTemplate]);

    const handleExtract = async () => {
        if (!emailContent || emailContent.trim().length < 10) {
            alert('Please paste valid email content');
            return;
        }

        const data = extractInfo(emailContent);
        setExtractedData(data);
        setStatistics(prev => ({ ...prev, emailsProcessed: prev.emailsProcessed + 1 }));

        if (data.messageLanguage) {
            setSelectedLanguage(data.messageLanguage);
        }

        // Try to fetch rental data if rental ID is found
        let rentalInfo = null;
        if (data.rentalId) {
            try {
                rentalInfo = await fetchNextbikeRental(data.rentalId);
                if (rentalInfo) {
                    setRentalData(rentalInfo);
                }
            } catch (error) {
                console.log('Could not fetch rental data:', error);
            }
        }

        setAiSummary(generateSimpleSummary(emailContent, rentalInfo));

        // Enhanced template matching with rental data
        const scored = Object.entries(templates).map(([name, template]) => ({
            name,
            template,
            score: calculateMatchScore(emailContent, template, rentalInfo)
        })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

        setSuggestions(scored);

        if (scored.length > 0 && scored[0].score >= 50) {
            setSelectedCategory(scored[0].template.category);
            setSelectedTemplate(scored[0].name);
            let templateText = data.messageLanguage === 'de' ? scored[0].template.de : scored[0].template.en;
            // Auto-fill template with rental data if available
            if (rentalInfo) {
                templateText = fillTemplateWithRentalData(templateText, rentalInfo);
            }
            setFilledTemplate(templateText);
        }
    };

    const fillTemplateWithRentalData = (template, rental) => {
        let filled = template;
        // Replace common placeholders
        const replacements = {
            '<System>': rental.system || '<System>',
            '<Stadt>': rental.city || '<Stadt>',
            '<City>': rental.city || '<City>',
            '<Bike>': rental.start_location || rental.rental_number || '<Bike>',
            '<Datum>': rental.start_time ? rental.start_time.split(' ')[0] : '<Datum>',
            '<Date>': rental.start_time ? rental.start_time.split(' ')[0] : '<Date>',
            '<Uhrzeit>': rental.start_time ? rental.start_time.split(' ')[1] : '<Uhrzeit>',
            '<Time>': rental.start_time ? rental.start_time.split(' ')[1] : '<Time>',
            '<Distanz>': rental.distance_km || '<Distanz>',
            '<Distance>': rental.distance_km || '<Distance>',
            '<Betrag>': rental.adjusted_base_price || rental.base_price || '<Betrag>',
            '<Amount>': rental.adjusted_base_price || rental.base_price || '<Amount>',
            '<Kundenname>': rental.customer_name || '<Kundenname>',
            '<Customer>': rental.customer_name || '<Customer>',
        };
        
        Object.keys(replacements).forEach(placeholder => {
            filled = filled.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacements[placeholder]);
        });
        
        return filled;
    };) {
            setSelectedCateg    const translateToPolish = async (text, sourceLang) => {
        if (!text || !text.trim()) {
            alert('No text to translate');
            return;
        }
        
        if (!deeplApiKey) {
            alert('Please set your DeepL API key in Settings!');
            return;
        }
        
        setIsTranslating(true);
        try {
            // Try both free and paid API endpoints
            const apiUrl = deeplApiKey.includes('free') || deeplApiKey.startsWith('free') 
                ? 'https://api-free.deepl.com/v2/translate'
                : 'https://api.deepl.com/v2/translate';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'auth_key': deeplApiKey.trim(),
                    'text': text,
                    'source_lang': sourceLang ? sourceLang.toUpperCase() : 'AUTO',
                    'target_lang': 'PL'
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            if (data.translations && data.translations[0]) {
                setTranslatedText(data.translations[0].text);
            } else {
                throw new Error('Translation response format error: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Translation error:', error);
            alert('Translation error: ' + error.message + '\n\nPlease check your DeepL API key and ensure it is valid.');
        } finally {
            setIsTranslating(false);
        }
    };            } else {
                alert('Translation failed');
            }
        } catch (error) {
            alert('Translation error: ' + error.message);
        } finally {
            setIsTranslating(false);
        }
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const handleTemplateSelect = (templateName) => {
        setSelectedTemplate(templateName);
        const template = templates[templateName];
        setFilledTemplate(selectedLanguage === 'de' ? template.de : template.en);
        setRecentTemplates(prev => [templateName, ...prev.filter(t => t !== templateName)].slice(0, 5));
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
            alert('Template added!');
        } else {
            alert('Please fill all fields');
        }
    };

    const deleteTemplate = (templateName) => {
        if (confirm(`Delete "${templateName}"?`)) {
            const newTemplates = { ...templates };
            delete newTemplates[templateName];
            setTemplates(newTemplates);
        }
    };

    const addCategory = () => {
        if (newCategoryName && newCategoryColor) {
            setCategories([...categories, { name: newCategoryName, color: newCategoryColor }]);
            setNewCategoryName('');
            setNewCategoryColor('#3b82f6');
            alert('Category added!');
        }
    };

    const deleteCategory = (categoryName) => {
        if (confirm(`Delete "${categoryName}"?`)) {
            setCategories(categories.filter(cat => cat.name !== categoryName));
        }
    };

    const exportTemplates = () => {
        const dataStr = JSON.stringify({ templates, categories }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nextbike-templates.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const importTemplates = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.templates) setTemplates(data.templates);
                if (data.categories) setCategories(data.categories);
                alert('Imported successfully!');
            } catch (error) {
                alert('Import error: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    const getTemplatesByCategory = (category) => {
        return Object.entries(templates).filter(([_, t]) => t.category === category).map(([name, _]) => name);
    };

    return (
        <div className={`min-h-screen p-6 pb-24 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <Icons.Mail className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                            <div>
                                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nextbike Email Assistant</h1>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enhanced with AI</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowStatistics(!showStatistics)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2">
                                <Icons.BarChart className="w-5 h-5" /> Stats
                            </button>
                            <button onClick={() => setShowTemplateManager(!showTemplateManager)} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2">
                                <Icons.Database className="w-5 h-5" /> Templates
                            </button>
                            <button onClick={() => setShowSettings(!showSettings)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
                                <Icons.Settings className="w-5 h-5" /> Settings
                            </button>
                            <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800">
                                {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className={`block mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>DeepL API Key</label>
                                <input type="password" value={deeplApiKey} onChange={(e) => setDeeplApiKey(e.target.value)} placeholder="Enter DeepL API key" className={`w-full p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <p className="text-xs mt-1 text-gray-500">Get free key at: https://www.deepl.com/pro-api</p>
                            </div>
                            <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Import/Export</h3>
                                <div className="flex gap-3">
                                    <button onClick={exportTemplates} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2">
                                        <Icons.Download className="w-4 h-4" /> Export
                                    </button>
                                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                                        <Icons.Upload className="w-4 h-4" /> Import
                                        <input type="file" accept=".json" onChange={importTemplates} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics */}
                {showStatistics && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Session Statistics</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-xl">
                                <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">Emails Processed</div>
                                <div className="text-4xl font-bold mt-2 text-blue-900 dark:text-white">{statistics.emailsProcessed}</div>
                            </div>
                            <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-xl">
                                <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">Templates Used</div>
                                <div className="text-4xl font-bold mt-2 text-purple-900 dark:text-white">{Object.keys(statistics.templateUsage).length}</div>
                            </div>
                            <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl">
                                <div className="text-sm font-semibold text-green-800 dark:text-green-200">Categories</div>
                                <div className="text-4xl font-bold mt-2 text-green-900 dark:text-white">{Object.keys(statistics.categoryUsage).length}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Email Input */}
                <div className={`rounded-2xl shadow-xl p-8 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Paste Email Content <span className="text-xs opacity-70">(Ctrl+Enter)</span>
                    </label>
                    <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        className={`w-full h-48 p-4 border-2 rounded-lg focus:outline-none font-mono text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        placeholder="Paste email here..."
                    />
                    <div className="mt-4">
                        <button onClick={handleExtract} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-2">
                            <Icons.Sparkles className="w-5 h-5" /> Extract & Analyze
                        </button>
                    </div>
                </div>

                {/* Translation Section */}
                {extractedData?.customerMessage && (
                    <div className={`rounded-xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                        <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Icons.Languages className="w-6 h-6" />
                            Customer Message (Original)
                        </h3>
                        <div className={`p-4 rounded-lg border-2 mb-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {extractedData.messageLanguage === 'de' ? '🇩🇪 German' : extractedData.messageLanguage === 'en' ? '🇬🇧 English' : 'Language detected'}
                                </span>
                                <button onClick={() => copyToClipboard(extractedData.customerMessage, 'original-msg')} className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    {copiedField === 'original-msg' ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <p className={`${darkMode ? 'text-white' : 'text-gray-800'} text-lg`}>{extractedData.customerMessage}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => translateToPolish(extractedData.customerMessage, extractedData.messageLanguage || 'de')}
                                disabled={isTranslating}
                                className={`px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2 ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Icons.Languages className="w-5 h-5" />
                                {isTranslating ? 'Translating...' : 'Translate to Polish (DeepL)'}
                            </button>
                            <button
                                onClick={() => window.open(`https://www.deepl.com/translator#${extractedData.messageLanguage || 'de'}/pl/${encodeURIComponent(extractedData.customerMessage)}`, '_blank')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Icons.ExternalLink className="w-5 h-5" />
                                Open in DeepL
                            </button>
                        </div>
                        {!deeplApiKey && (
                            <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    💡 <strong>Tip:</strong> Add your DeepL API key in Settings for one-click translation, or use "Open in DeepL" button above!
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Translation Result */}
                {translatedText && (
                    <div className="rounded-xl shadow-lg p-6 mb-6 bg-gradient-to-r from-green-500 to-teal-500">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Icons.Languages className="w-6 h-6" /> Polish Translation
                            </h3>
                            <button onClick={() => copyToClipboard(translatedText, 'translation')} className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-semibold">
                                <Icons.Copy className="w-4 h-4 inline mr-2" />
                                {copiedField === 'translation' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-gray-800">{translatedText}</p>
                        </div>
                    </div>
                )}

                {/* AI Summary */}
                {aiSummary && (
                    <div className="rounded-xl shadow-lg p-6 mb-6 bg-gradient-to-r from-purple-500 to-pink-500">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Icons.Zap className="w-6 h-6" /> AI Summary
                            </h3>
                            <button onClick={() => copyToClipboard(aiSummary, 'summary')} className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-semibold">
                                <Icons.Copy className="w-4 h-4 inline mr-2" />
                                {copiedField === 'summary' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <pre className="whitespace-pre-wrap text-gray-800 font-sans">{aiSummary}</pre>
                        </div>
                        {extractedData && extractedData.customerMessage && (
                            <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
                                <div className="text-sm font-semibold text-white mb-2">Customer Message:</div>
                                <div className="text-white italic">"{extractedData.customerMessage}"</div>
                                <div className="text-xs text-white mt-2 opacity-80">Language: {extractedData.messageLanguage === 'de' ? '🇩🇪 German' : extractedData.messageLanguage === 'en' ? '🇬🇧 English' : 'Unknown'}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Crash Warning */}
                {extractedData && extractedData.crashDetected && (
                    <div className="bg-red-600 rounded-xl shadow-2xl p-6 mb-6 border-4 border-red-800 animate-pulse">
                        <div className="flex items-start gap-4">
                            <Icons.AlertCircle className="w-12 h-12 text-white flex-shrink-0" />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">⚠️ SERIOUS INCIDENT DETECTED</h2>
                                <p className="text-white text-lg mb-3">This email mentions a <strong>BIKE CRASH or ACCIDENT</strong>. Immediate attention required!</p>
                                <div className="bg-red-800 rounded-lg p-4">
                                    <div className="text-red-100 font-semibold mb-2">Keywords found:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {extractedData.crashKeywords.map((keyword, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-red-900 text-white rounded-full text-sm font-bold uppercase">{keyword}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Smart Suggestions */}
                {suggestions.length > 0 && (
                    <div className="rounded-xl shadow-lg p-6 mb-6 bg-gradient-to-r from-pink-500 to-orange-500">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Icons.Sparkles className="w-6 h-6" /> AI-Suggested Templates
                        </h2>
                        <div className="space-y-3">
                            {suggestions.map((suggestion, idx) => (
                                <div key={idx} onClick={() => {
                                    setSelectedCategory(suggestion.template.category);
                                    setSelectedTemplate(suggestion.name);
                                    setFilledTemplate(selectedLanguage === 'de' ? suggestion.template.de : suggestion.template.en);
                                    document.getElementById('template-section')?.scrollIntoView({ behavior: 'smooth' });
                                }} className="rounded-lg p-4 bg-white cursor-pointer hover:shadow-xl transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                {idx === 0 && suggestion.score >= 70 && (
                                                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">BEST MATCH</span>
                                                )}
                                                <div className="font-bold text-lg text-gray-800">{suggestion.name}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                                    <div className={`${getMatchColor(suggestion.score)} h-4 rounded-full flex items-center justify-end pr-2`} style={{ width: `${suggestion.score}%` }}>
                                                        <span className="text-white text-xs font-bold">{suggestion.score}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="ml-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold">Use This</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Links */}
                {extractedData && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Icons.Link2 className="w-6 h-6 text-indigo-600" /> Quick Access Links
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {extractedData.customerId && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border-2 border-blue-200">
                                    <div>
                                        <div className="text-xs text-blue-600 font-semibold">Customer</div>
                                        <div className="font-mono text-blue-900 dark:text-blue-100">{extractedData.customerId}</div>
                                    </div>
                                    <button onClick={() => window.open(extractedData.customerLink, '_blank')} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center gap-2">
                                        <Icons.ExternalLink className="w-4 h-4" /> Open
                                    </button>
                                </div>
                            )}
                            {extractedData.bikeId && (
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg border-2 border-green-200">
                                    <div>
                                        <div className="text-xs text-green-600 font-semibold">Bike</div>
                                        <div className="font-mono text-green-900 dark:text-green-100">{extractedData.bikeId}</div>
                                    </div>
                                    <button onClick={() => window.open(extractedData.bikeLink, '_blank')} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center gap-2">
                                        <Icons.ExternalLink className="w-4 h-4" /> Open
                                    </button>
                                </div>
                            )}
                            {extractedData.rentalId && (
                                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900 rounded-lg border-2 border-purple-200">
                                    <div>
                                        <div className="text-xs text-purple-600 font-semibold">Rental</div>
                                        <div className="font-mono text-purple-900 dark:text-purple-100">{extractedData.rentalId}</div>
                                    </div>
                                    <button onClick={() => window.open(extractedData.rentalLink, '_blank')} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 flex items-center gap-2">
                                        <Icons.ExternalLink className="w-4 h-4" /> Open
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Recent Templates */}
                {recentTemplates.length > 0 && extractedData && (
                    <div className={`rounded-xl shadow-lg p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Icons.Clock className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recently Used</h3>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {recentTemplates.map((tName, idx) => (
                                <button key={idx} onClick={() => handleTemplateSelect(tName)} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">
                                    {tName}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category Selection */}
                {extractedData && (
                    <div className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Icons.Database className="w-6 h-6 text-indigo-600" /> Select Category
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {categories.map(cat => (
                                <button key={cat.name} onClick={() => {
                                    setSelectedCategory(cat.name);
                                    setSelectedTemplate('');
                                    setFilledTemplate('');
                                }} className={`p-4 rounded-xl font-semibold transition-all ${selectedCategory === cat.name ? 'text-white shadow-lg scale-105' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`} style={selectedCategory === cat.name ? { backgroundColor: cat.color } : {}}>
                                    <div className="flex items-center justify-between">
                                        <span>{cat.name}</span>
                                        {selectedCategory === cat.name && <span>✓</span>}
                                    </div>
                                    <div className={`text-xs mt-1 ${selectedCategory === cat.name ? 'text-white opacity-90' : 'text-gray-500'}`}>
                                        {getTemplatesByCategory(cat.name).length} templates
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Template Selection */}
                {selectedCategory && (
                    <div id="template-section" className={`rounded-2xl shadow-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Icons.FileText className="w-6 h-6 text-indigo-600" /> Select Template
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => handleLanguageSwitch('de')} className={`px-4 py-2 rounded-lg font-semibold ${selectedLanguage === 'de' ? 'bg-indigo-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>DE</button>
                                <button onClick={() => handleLanguageSwitch('en')} className={`px-4 py-2 rounded-lg font-semibold ${selectedLanguage === 'en' ? 'bg-indigo-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>EN</button>
                            </div>
                        </div>
                        <select value={selectedTemplate} onChange={(e) => handleTemplateSelect(e.target.value)} className={`w-full p-3 border-2 rounded-lg mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}>
                            <option value="">Choose template...</option>
                            {Object.entries(templates).filter(([_, t]) => t.category === selectedCategory).map(([name, _]) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>

                        {filledTemplate && (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Email Response <span className="text-xs opacity-70">(Ctrl+Shift+C)</span>
                                    </label>
                                    <button onClick={() => copyToClipboard(filledTemplate, 'template')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2">
                                        <Icons.Copy className="w-4 h-4" />
                                        {copiedField === 'template' ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <textarea value={filledTemplate} onChange={(e) => setFilledTemplate(e.target.value)} className={`w-full h-64 p-4 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                {extractBlanks(filledTemplate).length > 0 && (
                                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border-2 border-yellow-200">
                                        <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                                            <Icons.AlertCircle className="w-4 h-4" /> Fields to fill:
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {extractBlanks(filledTemplate).map((blank, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-full text-sm font-mono">{blank}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Template Manager */}
                {showTemplateManager && (
                    <div className="space-y-6 mb-6">
                        {/* Add Category */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Category</h2>
                            <div className="space-y-4">
                                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category Name" className={`w-full p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <div className="flex items-center gap-4">
                                    <input type="color" value={newCategoryColor} onChange={(e) => setNewCategoryColor(e.target.value)} className="w-20 h-12 rounded-lg cursor-pointer" />
                                    <div className="flex-1 p-4 rounded-xl text-white font-semibold text-center" style={{ backgroundColor: newCategoryColor }}>Preview</div>
                                </div>
                                <button onClick={addCategory} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Add Category</button>
                            </div>
                        </div>

                        {/* Manage Categories */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Manage Categories</h2>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <div key={cat.name} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded" style={{ backgroundColor: cat.color }}></div>
                                            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cat.name}</div>
                                        </div>
                                        <button onClick={() => deleteCategory(cat.name)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                                            <Icons.Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add Template */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Template</h2>
                            <div className="space-y-4">
                                <input type="text" value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} placeholder="Template Name" className={`w-full p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={`w-full p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                                </select>
                                <input type="text" value={newTemplateKeywords} onChange={(e) => setNewTemplateKeywords(e.target.value)} placeholder="Keywords (comma separated)" className={`w-full p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <textarea value={newTemplateDE} onChange={(e) => setNewTemplateDE(e.target.value)} placeholder="German template" className={`w-full h-32 p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <textarea value={newTemplateEN} onChange={(e) => setNewTemplateEN(e.target.value)} placeholder="English template" className={`w-full h-32 p-3 border-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                                <button onClick={addTemplate} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">Add Template</button>
                            </div>
                        </div>

                        {/* All Templates */}
                        <div className={`rounded-2xl shadow-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>All Templates</h2>
                            <input type="text" value={templateSearch} onChange={(e) => setTemplateSearch(e.target.value)} placeholder="Search templates..." className={`w-full p-3 border-2 rounded-lg mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
                            <div className="space-y-2">
                                {Object.entries(templates).filter(([name, t]) => !templateSearch || name.toLowerCase().includes(templateSearch.toLowerCase()) || t.category.toLowerCase().includes(templateSearch.toLowerCase())).map(([name, t]) => (
                                    <div key={name} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div>
                                            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{name}</div>
                                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.category}</div>
                                        </div>
                                        <button onClick={() => deleteTemplate(name)} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                                            <Icons.Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                         // Fetch rental data from Nextbike
async function fetchNextbikeRental(rentalId) {
    if (!rentalId) return null;
    
    try {
        const response = await fetch(`nextbike-fetcher.php?action=fetch_rental&id=${rentalId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.rental) {
            return data.rental;
        } else {
            console.error('Failed to fetch rental:', data.error || 'Unknown error');
            return null;
        }
    } catch (error) {
        console.error('Network error fetching rental:', error);
        return null;
    }
}) | Ctrl+Shift+C (Copy)
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Add these functions to your existing app.js

// Fetch rental data from Nextbike
async function fetchNextbikeRental(rentalId) {
    try {
        const response = await fetch(`nextbike-fetcher.php?action=fetch_rental&id=${rentalId}`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            return data.rental;
        } else {
            console.error('Failed to fetch rental:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Network error fetching rental:', error);
        return null;
    }
}

// Auto-fill template with Nextbike data
async function autoFillFromNextbike(rentalId) {
    if (!rentalId) return;

    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-4';
    loadingDiv.innerHTML = '<p class="text-sm text-blue-700">🔄 Fetching rental data from Nextbike...</p>';
    document.querySelector('.bg-white.rounded-2xl').prepend(loadingDiv);

    const rental = await fetchNextbikeRental(rentalId);

    // Remove loading indicator
    loadingDiv.remove();

    if (rental) {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'p-4 bg-green-50 border-2 border-green-200 rounded-lg mb-4';
        successDiv.innerHTML = `
            <p class="text-sm text-green-700 font-semibold">✅ Rental data loaded!</p>
            <p class="text-xs text-green-600 mt-1">
                System: ${rental.system} | City: ${rental.city} | Bike: ${rental.start_location}
            </p>
        `;
        document.querySelector('.bg-white.rounded-2xl').prepend(successDiv);

        // Auto-remove success message after 5 seconds
        setTimeout(() => successDiv.remove(), 5000);

        // Update template with rental data
        if (filledTemplate) {
            let updatedTemplate = filledTemplate;

            // Replace placeholders with actual data
            updatedTemplate = updatedTemplate.replace(/<System[^>]*>/gi, rental.system || '<System>');
            updatedTemplate = updatedTemplate.replace(/<Stadt[^>]*>/gi, rental.city || '<Stadt>');
            updatedTemplate = updatedTemplate.replace(/<Bike[^>]*>/gi, rental.start_location || '<Bike>');
            updatedTemplate = updatedTemplate.replace(/<Datum[^>]*>/gi, rental.start_time?.split(' ')[0] || '<Datum>');
            updatedTemplate = updatedTemplate.replace(/<Uhrzeit[^>]*>/gi, rental.start_time?.split(' ')[1] || '<Uhrzeit>');
            updatedTemplate = updatedTemplate.replace(/<Distanz[^>]*>/gi, rental.distance_km || '<Distanz>');
            updatedTemplate = updatedTemplate.replace(/<Betrag[^>]*>/gi, rental.adjusted_base_price || '<Betrag>');

            setFilledTemplate(updatedTemplate);
        }

        return rental;
    } else {
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4';
        errorDiv.innerHTML = '<p class="text-sm text-red-700">❌ Failed to fetch rental data. Please check credentials.</p>';
        document.querySelector('.bg-white.rounded-2xl').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);

        return null;
    }
}

// Update the extractInfo function to detect rental URLs
const extractInfoOriginal = extractInfo; // Save original function

extractInfo = (text) => {
    const data = extractInfoOriginal(text); // Call original

    // Also try to extract Nextbike rental URL
    const nextbikeMatch = text.match(/nextbike\.net\/office\/rentals\/edit\/(\d+)/);
    if (nextbikeMatch) {
        data.nextbikeRentalId = nextbikeMatch[1];
    }

    return data;
};

// Update handleExtract to auto-fetch Nextbike data
const handleExtractOriginal = handleExtract; // Save original

handleExtract = async () => {
    handleExtractOriginal(); // Call original extraction

    // If Nextbike rental ID detected, fetch data
    if (extractedData?.nextbikeRentalId) {
        const rental = await autoFillFromNextbike(extractedData.nextbikeRentalId);

        // Add rental info to extracted data display
        if (rental) {
            // You can add a special section showing Nextbike data
            console.log('Nextbike rental data loaded:', rental);
        }
    }
};

// Add a manual "Fetch Rental" button to the UI
function addFetchRentalButton() {
    const buttonHTML = `
        <div class="mt-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nextbike Rental ID</label>
            <div class="flex gap-2">
                <input 
                    type="text" 
                    id="manual-rental-id" 
                    placeholder="e.g., 311515929"
                    class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
                <button 
                    onclick="manualFetchRental()"
                    class="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Fetch Data
                </button>
            </div>
        </div>
    `;

    // Add to email input section
    const emailSection = document.querySelector('.bg-white.rounded-2xl.shadow-xl.p-8.mb-6');
    if (emailSection) {
        emailSection.insertAdjacentHTML('beforeend', buttonHTML);
    }
}

// Manual fetch function
window.manualFetchRental = async function() {
    const rentalId = document.getElementById('manual-rental-id')?.value;
    if (rentalId) {
        await autoFillFromNextbike(rentalId);
    }
};

// Initialize when app loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for React to render
    setTimeout(addFetchRentalButton, 1000);
});

// Render
ReactDOM.render(<NextbikeEmailHelper />, document.getElementById('root'));