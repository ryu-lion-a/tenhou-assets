// ==UserScript==
// @name         Tenhou_Furina_Ultimate_Hook_V3
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Tenhou Voice Changer (Updated Voice Map)
// @author       Ryutaro Koyama
// @match        *://*.tenhou.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("--- フリーナMod V3：監視開始 ---");

    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";
    
    // 龍太郎さん指定の新しいマッピング
    const VOICE_MAP = {
        "start": "dannzai.mp3",
        "pon": "hokaha_nanimo.mp3",
        "chi": "hokaha_nanimo.mp3",
        "kan": "chest.mp3",
        "reach": "digoku.mp3",
        "ron": "omoibto.mp3",
        "tsumo": "omoibto.mp3"
    };

    // 音声差し替えの核となる関数
    const getNewSrc = (url) => {
        const fileNameWithExt = url.split('/').pop();
        const fileName = fileNameWithExt.split('.')[0]; // 拡張子を除去
        
        // ログを出して天鳳が何を呼んでいるか可視化する
        console.log("【天鳳の要求】:", fileNameWithExt);

        if (VOICE_MAP[fileName]) {
            const newSrc = BASE_URL + VOICE_MAP[fileName];
            console.log(`【★差し替え実行★】: ${fileNameWithExt} -> ${newSrc}`);
            return newSrc;
        }
        return null;
    };

    // 1. Audio オブジェクトのフック
    const OriginalAudio = window.Audio;
    window.Audio = function(src) {
        const newSrc = src ? getNewSrc(src) : null;
        return new OriginalAudio(newSrc || src);
    };
    window.Audio.prototype = OriginalAudio.prototype;

    // 2. 通信 (fetch) のフック
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const url = args[0].toString();
        if (url.includes('.mp3') || url.includes('.wav')) {
            const newSrc = getNewSrc(url);
            if (newSrc) {
                return originalFetch(newSrc, args[1]);
            }
        }
        return originalFetch(...args);
    };

    console.log("監視の準備が整いました。対局または牌譜再生を開始してください。");
})();