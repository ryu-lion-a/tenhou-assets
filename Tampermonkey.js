// ==UserScript==
// @name         Tenhou Furina Voice Changer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  天鳳のSEをフリーナの声に差し替える
// @author       Ryutaro Koyama
// @match        https://tenhou.net/3/*
// @match        https://tenhou.net/4/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- 設定: ファイル名とカスタムURLの対応表 ---
    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";
    const VOICE_MAP = {
        "start.mp3":"dannzai.mp3",
        "pon.mp3": "hokaha_nanimo.mp3",
        "chi.mp3": "hokaha_nanimo.mp3",
        "kan.mp3": "chest.mp3",
        "reach.mp3": "digoku.mp3",
        "ron.mp3": "omoibto.mp3",
        "tsumo.mp3": "omoibto.mp3"
    };

    // --- インターセプト処理 ---
    const OriginalAudio = window.Audio;

    window.Audio = function(src) {
        if (src) {
            // URLからファイル名（pon.mp3等）を抽出
            const fileName = src.split('/').pop();

            if (VOICE_MAP[fileName]) {
                const newSrc = BASE_URL + VOICE_MAP[fileName];
                console.log(`[TenhouMod] Redirecting: ${fileName} -> ${newSrc}`);
                return new OriginalAudio(newSrc);
            }
        }
        return new OriginalAudio(src);
    };

    // プロトタイプを継承させておく（互換性のため）
    window.Audio.prototype = OriginalAudio.prototype;

})();