// ==UserScript==
// @name         Tenhou_Furina_V49_Stable
// @match        *://*.tenhou.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('%c--- フリーナMod V49 (卓画安定固定版) ---', 'color:#00ffff;font-size:14px;font-weight:bold;');

    const BASE_URL_SE = 'https://ryu-lion-a.github.io/tenhou-assets/se/';
    const BASE_URL_IMG = 'https://ryu-lion-a.github.io/tenhou-assets/se/img/';
    const MY_NEW_BG = 'anime-is_it_wrong_to_try_to_pick_up_girls_in_a_dungeon-aiz_wallenstein-bell_cranel-freya_danmachi-hestia_danmachi-liliruca_arde-syr_flova-welf_crozzo-369675.jpeg';
    const FULL_IMG_URL = BASE_URL_IMG + MY_NEW_BG;
    const REPLACED_BG_URL = `url("${FULL_IMG_URL}?v=${Date.now()}")`;

    const VOICE_MAP = {
        '01': '教育の時間だ.mp3',
        '25': '分からない.mp3',
        '27': '勝負だ.mp3',
        '31': '勝負だ.mp3',
        '33': 'ありがとうございます.mp3',
        '35': '横恋慕.mp3'
    };

    function getModifiedUrl(url) {
        if (!url || typeof url !== 'string') return url;

        const fileName = url.split('/').pop().split('?')[0];
        const nameOnly = fileName.split('.')[0];

        if (VOICE_MAP[nameOnly]) {
            return BASE_URL_SE + VOICE_MAP[nameOnly];
        }

        if (fileName.includes('bglogow')) {
            return FULL_IMG_URL + '?v=' + Date.now();
        }

        return url;
    }

    // img src hook
    const srcDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    if (srcDesc && srcDesc.set) {
        Object.defineProperty(HTMLImageElement.prototype, 'src', {
            get: srcDesc.get,
            set: function(url) {
                srcDesc.set.call(this, getModifiedUrl(url));
            },
            configurable: true,
            enumerable: srcDesc.enumerable
        });
    }

    // XHR hook
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        arguments[1] = getModifiedUrl(url);
        return originalOpen.apply(this, arguments);
    };

    // fetch hook
    if (window.fetch) {
        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
            try {
                if (typeof input === 'string') {
                    input = getModifiedUrl(input);
                } else if (input && typeof input.url === 'string') {
                    input = new Request(getModifiedUrl(input.url), input);
                }
            } catch (e) {}
            return originalFetch.call(this, input, init);
        };
    }

    function forceTableBg() {
        const table = document.querySelector('.nosel.tbl');
        if (!table) return;

        table.style.setProperty('background-image', REPLACED_BG_URL, 'important');
        table.style.setProperty('background-size', 'cover', 'important');
        table.style.setProperty('background-position', 'center center', 'important');
        table.style.setProperty('background-repeat', 'no-repeat', 'important');
    }

    function start() {
        forceTableBg();

        // DOM更新時に再適用
        const observer = new MutationObserver(() => {
            forceTableBg();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // 天鳳側の再描画に負けないよう定期再適用
        setInterval(forceTableBg, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();