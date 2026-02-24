// ==UserScript==
// @name         Tenhou_Furina_Omni_Hook_V4
// @match        *://*.tenhou.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("--- フリーナMod V4：全方位監視（XHR対応）開始 ---");

    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";
// 天鳳の内部番号とフリーナ音声の対応
    const VOICE_MAP = {
        "01": "dannzai.mp3",        // 対局開始
        "24": "hokaha_nanimo.mp3",   // ポン
        "25": "hokaha_nanimo.mp3",   // チー
        "26": "chest.mp3",           // カン
        "27": "digoku.mp3",          // リーチ
        "32": "omoibto.mp3",         // ロン
        "33": "omoibto.mp3"          // ツモ
    };

    // 音声差し替え判定関数
    const getNewSrc = (url) => {
        const fileNameWithExt = url.split('/').pop();
        const fileName = fileNameWithExt.split('.')[0];
        console.log("【通信検出】:", fileNameWithExt);

        if (VOICE_MAP[fileName]) {
            const newSrc = BASE_URL + VOICE_MAP[fileName];
            console.log(`【★差し替え実行★】: ${fileNameWithExt} -> ${newSrc}`);
            return newSrc;
        }
        return null;
    };

    // --- 網1: XMLHttpRequest (天鳳がよく使う通信方式) ---
    const originalXHR = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url) {
        if (typeof url === 'string' && (url.includes('.mp3') || url.includes('.wav'))) {
            const newSrc = getNewSrc(url);
            if (newSrc) {
                url = newSrc;
            }
        }
        return originalXHR.apply(this, arguments);
    };

    // --- 網2: window.Audio (標準再生) ---
    const OriginalAudio = window.Audio;
    window.Audio = function(src) {
        const newSrc = src ? getNewSrc(src) : null;
        return new OriginalAudio(newSrc || src);
    };
    window.Audio.prototype = OriginalAudio.prototype;

    // --- 網3: fetch (モダンな通信方式) ---
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const url = args[0].toString();
        if (url.includes('.mp3') || url.includes('.wav')) {
            const newSrc = getNewSrc(url);
            if (newSrc) return originalFetch(newSrc, args[1]);
        }
        return originalFetch(...args);
    };

    console.log("すべての通信網にフックをかけました。");
})();