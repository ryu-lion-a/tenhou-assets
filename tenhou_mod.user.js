// ==UserScript==
// @name         Tenhou_Furina_Mod_V2
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Tenhou Voice Changer (Fixed Match and Names)
// @author       Ryutaro Koyama
// @match        *://*.tenhou.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 起動した瞬間にアラートを出して「更新されたか」を即座に確認
    console.log("--- Furina Mod Loading ---");
    alert("フリーナModが正常に読み込まれました！");

    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";

    // 左側：天鳳が呼ぶ名前 / 右側：GitHubに上げた半角のファイル名
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
            // 天鳳が何の音を鳴らそうとしたかコンソールに出す
            console.log("Tenhou sound request:", fileName);

            if (VOICE_MAP[fileName]) {
                const newSrc = BASE_URL + VOICE_MAP[fileName];
                console.log(`[Redirect Success] ${fileName} -> ${newSrc}`);
                return new OriginalAudio(newSrc);
            }
        }
        return new OriginalAudio(src);
    };
    window.Audio.prototype = OriginalAudio.prototype;
})();