const { Client,GatewayIntentBits,Status } = require('discord.js');
const axios = require('axios');
const { getRandomUniqueItems,getRandomUniqueCombinations,getRandomUniqueItemsvalo} = require('./shuffle.js');
const { pokemontype,ygo,valo,Dcommand } = require('./list.js');
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,] });
const statusHandler = require('./status.js')(client);

const TOKEN = 'MTI4MjQwNTcwNjI4MDA3NTMwNA.GuLsoX.D9SCwz3SWTErdjSTlxSNZqobGWKCyfpGsUX9LQ';
const GUILD_ID = '1225964275072503919';
const CLIENT_ID = 'kyo7944';
const SERVER_URL = 'http://localhost:3000';
let sta = '';
// ステータス変更の関数
const Statuschenge= (sta,message) => {
    statusHandler.setStatus(sta,message);
};
// clientの初期化
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    sta = 'invisible';
    Statuschenge(sta,null);
});

client.on('messageCreate',async message => {
    // ボットへのメッセージでない場合は無視
    if (message.author.bot) return;

    const x = message.content.split(' '); // ユーザーの入力を取得
    const title = x[0]; // タイトルを取得
    const member = x[1]; // 人数を取得

    // メッセージが '!' で始まるかを確認
    if (message.content.startsWith('!')) {
        // ステータスをオンラインにする
        if (message.content === '!startgameR') {
            try {
                const res = await axios.post(`${SERVER_URL}/start`);
                console.log(res);
                sta = res.data;
                Statuschenge(sta,message);
                message.channel.send('Botが起動しました！');
            } catch (error) {
                message.channel.send('Botの起動に失敗しました。');
                console.error(error.message);
            }
        }
        // ステータスをオフラインにする
        if (message.content === '!stopgameR') {
            try {
                const res = await axios.post(`${SERVER_URL}/stop`);
                console.log(res);
                sta = res.data;
                Statuschenge(sta,message);
                message.channel.send('Botが停止しました！');
            } catch (error) {
                message.channel.send('Botの停止に失敗しました。');
                console.error(error.message);
            }
        }
       // 有効なタイトルかを確認
        if(!(Dcommand.includes(title))){
            message.channel.send('登録されたゲームは「ポケモン」「遊戯王」「VALORANT」のいずれかです！\n');
            message.channel.send('新しいゲームの登録は管理者に申請してください！\n');
        if (x.length < 2) {
            message.channel.send('タイトルとメンバー数の間にスペースを空けてください。例：!pokemon 3');
            return;
        }}
        // 結果を取得
        let result = '';
        // ポケモンの人数分のタイプをかぶりなしにランダムに取得
        if (title === '!pokemon') {
            try {
                result = getRandomUniqueItems(pokemontype, member);
                // 結果をメッセージとして送信
                message.channel.send(`ポケモンタイプ統一戦\n`);
                for(let i = 0;i<member;i++){
                    message.channel.send(`${i+1}:${result[i]}\n`);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        // 遊戯王の人数分の組み合わせをかぶりなしにランダムに取得
        if (title === '!ygo'){
            try {
                result = getRandomUniqueCombinations(ygo.type, ygo.race, member);
                // 結果をメッセージとして送信
                message.channel.send(`遊戯王統一戦\n`);
                for(let i = 0;i<member;i++){
                    message.channel.send(`${i+1}:${result[i]}\n`);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        // ヴァロラントの人数分の組み合わせをかぶりなし、バランス考慮なしでランダムに取得
        if (title === '!valoA') {
            try {
                // 6人以上の人数を指定するとエラー
                if (member >= 6) {
                    message.channel.send('VALORANTの人数は5人以下に設定してください');
                    return;
                }
                result = getRandomUniqueItemsvalo([valo.initiator,valo.sentinel,valo.controller,valo.duelist], member);
                // 結果をメッセージとして送信
                message.channel.send(`valorantお祭り構成\n`);
                for(let i = 0;i<member;i++){
                    message.channel.send(`${i+1}:${result[i]}\n`);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        // ヴァロラントの人数分の組み合わせをかぶりなし、バランス考慮ありでランダムに取得
        if (title === '!valoB') {
            try {
                // 6人以上の人数を指定するとエラー
                if (member >= 6||member <= 2) {
                    message.channel.send('メンバーは3人以上6人未満にしてください');
                    return;
                }
                let valoresult = Array.from({length:member});
                const balance = Math.floor(Math.random() * 3) + 1;
                // 人数ごとのバランスの良い結果を取得
                if(member == 3){
                    valoresult[0] = getRandomUniqueItems(valo.initiator,1);
                    valoresult[1] = getRandomUniqueItems(valo.duelist,1);
                    valoresult[2] = getRandomUniqueItems(valo.controller,1);
                }else if(member == 4){
                    valoresult[0] = getRandomUniqueItems(valo.initiator,1);
                    valoresult[1] = getRandomUniqueItems(valo.duelist,1);
                    valoresult[2] = getRandomUniqueItems(valo.controller,1);
                    valoresult[3] = getRandomUniqueItems(valo.sentinel,1);
                }else{
                    switch(balance){
                        case 1:
                            valoresult = getRandomUniqueItems(valo.initiator,2);
                            valoresult[2] = getRandomUniqueItems(valo.duelist,1);
                            valoresult[3] = getRandomUniqueItems(valo.controller,1);
                            valoresult[4] = getRandomUniqueItems(valo.sentinel,1);
                            break;
                        case 2:
                            valoresult = getRandomUniqueItems(valo.duelist,2);
                            valoresult[2] = getRandomUniqueItems(valo.initiator,1);
                            valoresult[3] = getRandomUniqueItems(valo.controller,1);
                            valoresult[4] = getRandomUniqueItems(valo.sentinel,1);
                            break;
                        case 3:
                            valoresult = getRandomUniqueItems(valo.sentinel,2);
                            valoresult[2] = getRandomUniqueItems(valo.duelist,1);
                            valoresult[3] = getRandomUniqueItems(valo.controller,1);
                            valoresult[4] = getRandomUniqueItems(valo.initiator,1);
                            break;
                    }
                }
                // 結果をメッセージとして送信
                message.channel.send(`valorant構成\n`);
                for(let i = 0;i<member;i++){
                    message.channel.send(`${i+1}:${valoresult[i]}\n`);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }
});
// Botが停止する際に呼ばれる処理
process.on('SIGINT', async () => {
    try {
        await client.user.setStatus('invisible'); // ステータスをinvisibleに変更
        console.log('Botのステータスをinvisibleに設定しました。');
        process.exit(); // プロセスを終了
    } catch (error) {
        console.error('ステータス変更中にエラーが発生しました:', error);
        process.exit(1); // エラー発生時に異常終了
    }
});
// ボットをDiscordにログイン
client.login(TOKEN);
