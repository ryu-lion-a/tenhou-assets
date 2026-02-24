// ==UserScript==
// @name         Tenhou_Furina_Mod
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Tenhou Voice Changer
// @author       Ryutaro Koyama
// @match        *://*.tenhou.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 起動確認用のログ
    console.log("--- Furina Mod Loading Start ---");
    alert("フリーナModが起動しました！");

    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";
    const VOICE_MAP = {
        "start.mp3": "danzai.mp3",
        "pon.mp3": "irany.mp3",
        "chi.mp3": "irany.mp3",
        "kan.mp3": "chest.mp3",
        "reach.mp3": "jigoku.mp3",
        "ron.mp3": "omoibito.mp3",
        "tsumo.mp3": "omoibito.mp3"
    };

    const OriginalAudio = window.Audio;
    window.Audio = function(src) {
        if (src) {
            const fileName = src.split('/').pop();
            console.log("Tenhou is calling:", fileName);
            if (VOICE_MAP[fileName]) {
                const newSrc = BASE_URL + VOICE_MAP[fileName];
                console.log(`[TenhouMod] Redirecting: ${fileName} -> ${newSrc}`);
                return new OriginalAudio(newSrc);
            }
        }
        return new OriginalAudio(src);
    };
    window.Audio.prototype = OriginalAudio.prototype;
})();