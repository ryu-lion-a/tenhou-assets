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
        "start": "dannzai.mp3",
        "pon": "hokaha_nanimo.mp3",
        "chi": "hokaha_nanimo.mp3",
        "kan": "chest.mp3",
        "reach": "digoku.mp3",
        "ron": "omoibto.mp3",
        "tsumo": "omoibto.mp3"
    };

const OriginalAudio = window.Audio;
    window.Audio = function(src) {
        if (src) {
            // 天鳳が呼ぼうとしているすべての音をコンソールに表示
            const fileNameWithExt = src.split('/').pop();
            const fileName = fileNameWithExt.split('.')[0]; // 拡張子を無視
            
            console.log("【天鳳の要求】:", fileNameWithExt);

            if (VOICE_MAP[fileName]) {
                const newSrc = BASE_URL + VOICE_MAP[fileName];
                console.log(`【★差し替え成功★】: ${fileNameWithExt} -> ${newSrc}`);
                return new OriginalAudio(newSrc);
            }
        }
        return new OriginalAudio(src);
    };
    window.Audio.prototype = OriginalAudio.prototype;
})();