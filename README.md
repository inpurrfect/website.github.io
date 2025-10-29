# Nextbike Email Assistant

A web application for processing and responding to Nextbike customer emails with AI-powered template suggestions and translation capabilities.

## Features

- **Email Content Extraction**: Automatically extracts customer IDs, bike IDs, rental IDs, and other relevant information from emails
- **Smart Template Matching**: AI-powered template suggestions based on email content and keywords
- **Bilingual Support**: Templates available in German (DE) and English (EN)
- **DeepL Translation**: Integrated DeepL API for translating customer messages to Polish
- **Rental Data Fetching**: Optionally fetches rental data from Nextbike API (requires PHP backend)
- **Dark Mode**: Toggle between light and dark themes
- **Template Management**: Create, edit, delete, and organize email templates by category
- **Statistics Tracking**: Track emails processed, templates used, and categories
- **Quick Links**: Direct links to Nextbike office pages for customers, bikes, and rentals

## Deployment

This application is designed to work on GitHub Pages (static hosting). 

### Important Notes:

1. **PHP Backend**: The `nextbike-fetcher.php` file is included for local development, but **GitHub Pages does not support PHP**. The rental data fetching feature will gracefully fail on GitHub Pages without errors.

2. **For PHP Features**: If you need the PHP-based rental fetching functionality, you'll need to:
   - Host the PHP file on a server that supports PHP (not GitHub Pages)
   - Update the `fetchNextbikeRental` function in `app.js` to point to your PHP server

## Files

- `index.html` - Main HTML file
- `app.js` - React application code (all functionality)
- `styles.css` - Custom CSS styles
- `templates.json` - Default templates and categories (optional)
- `nextbike-fetcher.php` - PHP backend for fetching rental data (for non-GitHub Pages hosting)

## Setup

1. Simply host these files on a web server (or GitHub Pages)
2. The app will work immediately with default templates
3. To use DeepL translation, add your API key in Settings
4. Templates are stored in browser localStorage

## Recent Fixes

- Fixed critical syntax errors in `calculateMatchScore` function
- Added graceful handling for missing PHP backend on GitHub Pages
- Fixed missing React state variables (showStatistics, isTranslating, aiSummary, templateSearch)
- Corrected duplicate code fragments from merge conflicts

## Usage

1. Paste email content into the text area
2. Click "Extract & Analyze" or press Ctrl+Enter
3. Review extracted information and AI suggestions
4. Select a category and template
5. Choose language (DE/EN)
6. Copy the generated response
7. (Optional) Translate customer message to Polish using DeepL

## Keyboard Shortcuts

- `Ctrl+Enter`: Extract and analyze email
- `Ctrl+Shift+C`: Copy filled template to clipboard
