// ==UserScript==
// @name         Steam Curator Game Manager
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Manages checkboxes for Steam Curator accepted games with toggle, review status, and import/export functionality, now with language switching.
// @author       zelda & Grok3 & Gemini 2.5  Pro
// @match        https://store.steampowered.com/curator/*/admin/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('Steam Curator Game Manager is running');

    // --- Language Configuration ---
    const languages = {
        'en': {
            showAllGames: 'Show All Games',
            showHiddenGames: 'Show Hidden Games',
            showUnhiddenGames: 'Show Unhidden Games',
            reviewedAndUnreviewed: 'Reviewed & Unreviewed',
            reviewed: 'Reviewed',
            unreviewed: 'Unreviewed',
            export: 'Export',
            import: 'Import',
            selectAll: 'Select All',
            deselectAll: 'Deselect All'
        },
        'zh-TW': {
            showAllGames: '顯示所有遊戲',
            showHiddenGames: '顯示隱藏的遊戲',
            showUnhiddenGames: '顯示未隱藏的遊戲',
            reviewedAndUnreviewed: '已評論與尚未評論',
            reviewed: '已評論',
            unreviewed: '尚未評論',
            export: '匯出',
            import: '匯入',
            selectAll: '全選',
            deselectAll: '取消全選'
        },
        'zh-CN': {
            showAllGames: '显示所有游戏',
            showHiddenGames: '显示隐藏的游戏',
            showUnhiddenGames: '显示未隐藏的游戏',
            reviewedAndUnreviewed: '已评论与尚未评论',
            reviewed: '已评论',
            unreviewed: '尚未评论',
            export: '导出',
            import: '导入',
            selectAll: '全选',
            deselectAll: '取消全选'
        }
    };

    let currentLang = localStorage.getItem('curatorScriptLang') || 'en';
    let i18n = languages[currentLang];

    // Hide the app_filter div and style controls wrapper
    const style = document.createElement('style');
    style.textContent = `
        .app_filter { display: none !important; }
        #curator-controls-wrapper {
            display: flex !important;
            align-items: center;
            padding: 10px;
            background-color: #171a21;
            margin-bottom: 10px;
            z-index: 1000;
            flex-wrap: wrap;
            gap: 10px;
        }
        .curator-checkbox {
            display: inline-block !important;
            visibility: visible !important;
            margin-right: 10px;
            vertical-align: middle;
        }
    `;
    document.head.appendChild(style);

    // Function to load saved checkbox states from localStorage
    function loadCheckboxStates() {
        try {
            const savedStates = localStorage.getItem('steamCuratorCheckboxes');
            return savedStates ? JSON.parse(savedStates) : {};
        } catch (e) {
            console.error('Error loading checkbox states:', e);
            return {};
        }
    }

    // Function to save checkbox states to localStorage
    function saveCheckboxStates(states) {
        try {
            localStorage.setItem('steamCuratorCheckboxes', JSON.stringify(states));
        } catch (e) {
            console.error('Error saving checkbox states:', e);
        }
    }

    // Function to toggle visibility of games based on toggle state and review state
    function toggleCheckedGames(toggleState, reviewState) {
        const appBlocks = document.querySelectorAll('.app_ctn.app_block, [id^="app-ctn-"]');

        requestAnimationFrame(() => {
            appBlocks.forEach(block => {
                const checkbox = block.querySelector('.curator-checkbox');
                if (!checkbox) return;

                const isChecked = checkbox.checked;
                const isReviewed = block.classList.contains('app_reviewed');
                const isUnreviewed = block.classList.contains('app_unreviewed');

                let reviewMatch = (reviewState === 'BOTH') ||
                                  (reviewState === 'app_reviewed' && isReviewed) ||
                                  (reviewState === 'app_unreviewed' && isUnreviewed);

                let shouldShow = false;
                if (reviewMatch) {
                    if (toggleState === 'all') {
                        shouldShow = true;
                    } else if (toggleState === 'hidden') {
                        shouldShow = isChecked;
                    } else if (toggleState === 'unhidden') {
                        shouldShow = !isChecked;
                    }
                }

                block.style.display = shouldShow ? '' : 'none';
            });
        });

        localStorage.setItem('steamCuratorToggleState', toggleState);
        localStorage.setItem('steamCuratorReviewState', reviewState);
    }

    // Function to update checkbox states on the page
    function updateCheckboxes(newStates) {
        const appBlocks = document.querySelectorAll('.app_ctn.app_block, [id^="app-ctn-"]');
        appBlocks.forEach(block => {
            const appId = block.id.replace(/^app-ctn-/, '');
            const checkbox = block.querySelector('.curator-checkbox');
            if (checkbox && newStates.hasOwnProperty(appId)) {
                checkbox.checked = newStates[appId];
            }
        });
    }

    // Function to add checkboxes to new game blocks
    function addCheckboxesToNewBlocks(blocks, checkboxStates) {
        blocks.forEach(block => {
            const appId = block.id.replace(/^app-ctn-/, '');
            if (!block.querySelector('.curator-checkbox')) {
                const imgElement = block.querySelector('img');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'curator-checkbox';
                checkbox.style.marginRight = '10px';
                checkbox.style.verticalAlign = 'middle';
                checkbox.style.display = 'inline-block';
                checkbox.checked = checkboxStates[appId] || false;

                checkbox.addEventListener('change', () => {
                    checkboxStates[appId] = checkbox.checked;
                    saveCheckboxStates(checkboxStates);
                });

                if (imgElement && imgElement.parentNode) {
                    imgElement.parentNode.insertBefore(checkbox, imgElement);
                } else {
                    block.insertBefore(checkbox, block.firstChild);
                }
            }
        });
    }

    // Initialize checkbox states
    let checkboxStates = loadCheckboxStates();

    // Function to create and insert controls
    function createControls() {
        let wrapper = document.getElementById('curator-controls-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '';
        } else {
            wrapper = document.createElement('div');
            wrapper.id = 'curator-controls-wrapper';
        }

        const langSelect = document.createElement('select');
        langSelect.id = 'lang-select';
        langSelect.style.cssText = `margin: 0 10px; padding: 8px 16px; background-color: #1b2838; color: #ffffff; border: 2px solid #66c0f4; cursor: pointer; border-radius: 4px;`;
        const langOptions = {'en': 'English', 'zh-TW': '正體中文', 'zh-CN': '简体中文'};
        for (const [value, text] of Object.entries(langOptions)) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            if (value === currentLang) option.selected = true;
            langSelect.appendChild(option);
        }
        langSelect.addEventListener('change', () => {
            currentLang = langSelect.value;
            localStorage.setItem('curatorScriptLang', currentLang);
            i18n = languages[currentLang];
            initializeScript();
        });
        wrapper.appendChild(langSelect);

        const controlStyles = `margin: 0 10px; padding: 8px 16px; background-color: #1b2838; color: #ffffff; border: 2px solid #66c0f4; cursor: pointer; border-radius: 4px; font-weight: bold;`;

        const toggleSelect = document.createElement('select');
        toggleSelect.id = 'toggle-select';
        toggleSelect.style.cssText = controlStyles;
        const toggleOptions = [
            { value: 'all', text: i18n.showAllGames },
            { value: 'hidden', text: i18n.showHiddenGames },
            { value: 'unhidden', text: i18n.showUnhiddenGames }
        ];
        toggleOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            toggleSelect.appendChild(option);
        });

        const reviewSelect = document.createElement('select');
        reviewSelect.id = 'review-select';
        reviewSelect.style.cssText = controlStyles;
        const reviewOptions = [
            { value: 'BOTH', text: i18n.reviewedAndUnreviewed },
            { value: 'app_reviewed', text: i18n.reviewed },
            { value: 'app_unreviewed', text: i18n.unreviewed }
        ];
        reviewOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            reviewSelect.appendChild(option);
        });

        const createButton = (text) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.style.cssText = controlStyles;
            button.addEventListener('mouseover', () => button.style.backgroundColor = '#2a475e');
            button.addEventListener('mouseout', () => button.style.backgroundColor = '#1b2838');
            return button;
        };

        const exportButton = createButton(i18n.export);
        const importButton = createButton(i18n.import);
        const selectAllButton = createButton(i18n.selectAll);
        const deselectAllButton = createButton(i18n.deselectAll);

        exportButton.addEventListener('click', () => {
            try {
                const data = JSON.stringify(checkboxStates, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'steam_curator_checkboxes.json';
                a.click();
                URL.revokeObjectURL(url);
            } catch (e) {
                console.error('Error exporting states:', e);
            }
        });

        const importInput = document.createElement('input');
        importInput.type = 'file';
        importInput.accept = '.json';
        importInput.style.display = 'none';
        importButton.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        checkboxStates = JSON.parse(e.target.result);
                        saveCheckboxStates(checkboxStates);
                        updateCheckboxes(checkboxStates);
                        toggleCheckedGames(toggleSelect.value, reviewSelect.value);
                    } catch (err) {
                        console.error('Error importing states:', err);
                    }
                };
                reader.readAsText(file);
            }
        });

        const toggleAllCheckboxes = (checked) => {
            document.querySelectorAll('.app_ctn.app_block:not([style*="display: none"]) .curator-checkbox').forEach(checkbox => {
                const block = checkbox.closest('.app_ctn');
                const appId = block.id.replace(/^app-ctn-/, '');
                checkbox.checked = checked;
                checkboxStates[appId] = checked;
            });
            saveCheckboxStates(checkboxStates);
        };

        selectAllButton.addEventListener('click', () => toggleAllCheckboxes(true));
        deselectAllButton.addEventListener('click', () => toggleAllCheckboxes(false));

        wrapper.appendChild(toggleSelect);
        wrapper.appendChild(reviewSelect);
        wrapper.appendChild(exportButton);
        wrapper.appendChild(importButton);
        wrapper.appendChild(importInput);
        wrapper.appendChild(selectAllButton);
        wrapper.appendChild(deselectAllButton);

        const targetNode = document.querySelector('.admin_content') || document.body;
        targetNode.insertBefore(wrapper, targetNode.firstChild);

        toggleSelect.value = localStorage.getItem('steamCuratorToggleState') || 'all';
        reviewSelect.value = localStorage.getItem('steamCuratorReviewState') || 'BOTH';

        const debouncedToggle = debounce(() => toggleCheckedGames(toggleSelect.value, reviewSelect.value), 100);
        toggleSelect.addEventListener('change', debouncedToggle);
        reviewSelect.addEventListener('change', debouncedToggle);

        return { toggleSelect, reviewSelect };
    }

    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function initializeScript() {
        // Only run on the 'accepted' page
        if (window.location.href.includes('/admin/accepted')) {
            const { toggleSelect, reviewSelect } = createControls();
            const appBlocks = document.querySelectorAll('.app_ctn.app_block, [id^="app-ctn-"]');
            addCheckboxesToNewBlocks(appBlocks, checkboxStates);
            toggleCheckedGames(toggleSelect.value, reviewSelect.value);
        } else {
            // Remove controls if they exist on other admin pages
            const wrapper = document.getElementById('curator-controls-wrapper');
            if (wrapper) {
                wrapper.remove();
            }
        }
    }

    function retryInitializeScript(attempts = 10, delay = 200) {
        if (window.location.href.includes('/admin/accepted') && document.querySelector('.app_ctn.app_block, [id^="app-ctn-"]')) {
            initializeScript();
        } else if (attempts > 0) {
            setTimeout(() => retryInitializeScript(attempts - 1, delay), delay);
        }
    }

    // [FIXED] Listen for admin navigation clicks to re-initialize
    function setupAdminNavListener() {
        document.body.addEventListener('click', (event) => {
            if (event.target.closest('a.icon_item')) {
                // Use a timeout to allow the page content to update after the click
                setTimeout(() => {
                    console.log('Admin nav link clicked, attempting to re-initialize script.');
                    retryInitializeScript();
                }, 500);
            }
        });
    }

    // Initial setup
    retryInitializeScript();
    setupAdminNavListener();

})();
