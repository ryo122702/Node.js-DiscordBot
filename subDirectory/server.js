const express = require('express');
const app = express();
const PORT = 3000;

let onoff = '';
// Botを起動するリクエスト
app.post('/start', (req, res) => {
    onoff = 'online';
    console.log('Botが起動されました');
    res.json(onoff);
});

// Botを停止するリクエスト
app.post('/stop', (req, res) => {
    onoff = 'invisible';
    console.log('Botが停止されました');
    res.json(onoff);
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});
