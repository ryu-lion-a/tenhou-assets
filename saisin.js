// ==UserScript==
// @name         Tenhou_Furina_V15_Final
// @match        *://*.tenhou.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 見やすいログに変更（errorを使わない）
    console.log("%c--- フリーナMod V15：最終デバッグ開始 ---", "color: #00ffff; font-size: 14px; font-weight: bold;");

    const BASE_URL = "https://ryu-lion-a.github.io/tenhou-assets/se/";
    const VOICE_MAP = {//
        "01": "教育の時間だ.mp3",
        "02": "digoku.mp3",
        "25": "分からない.mp3", // ポン　確定
        "26": "分からない.mp3",//　ポンかみしも確定
        "27": "勝負だ.mp3",        //カン　確定
        "28": "勝負だ.mp3",        //カンかみしも　確定
        "29": "分からない.mp3",// チー　確定
        "30": "分からない.mp3",// チー裃　確定
        "31": "勝負だ.mp3", //リーチ　確定
        "32": "勝負だ.mp3",       // リーチ上下 確定
        "33": "ありがとうございます.mp3",//ろん確定
        "34": "ありがとうございます.mp3",//ろんかみしも
        "35": "横恋慕.mp3", // ツモ　確定
        "36": "横恋慕.mp3", // ツモ裃　確定
    };

    const originalOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url) {
        if (typeof url === 'string') {
            const fileNameWithExt = url.split('/').pop();
            const fileName = fileNameWithExt.split('.')[0];

            if (VOICE_MAP[fileName]) {
                // キャッシュを避けつつ、天鳳の読み込みを上書き
                const newUrl = BASE_URL + VOICE_MAP[fileName];
                console.log(`%c【置換成功】: ${fileName}.wav -> ${VOICE_MAP[fileName]}`, "color: #00ff00;");
                arguments[1] = newUrl;
            } else if (url.includes('.wav')) {
                console.log(`【未登録の音】: ${fileNameWithExt}`);
            }
        }
        return originalOpen.apply(this, arguments);
    };
})();