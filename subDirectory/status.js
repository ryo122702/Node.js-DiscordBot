module.exports = (client) => {
    return {
        setStatus: (status, message) => {
            const presenceOptions = {
                activities: [{ name: '活動中', type: 'PLAYING' }], // 状態に応じて表示する活動を設定
                status: status // ステータスを設定
            };

            switch (status) {
                case 'online':
                    presenceOptions.status = 'online';
                    client.user.setPresence(presenceOptions);
                    break;
                case 'idle':
                    presenceOptions.status = 'idle';
                    client.user.setPresence(presenceOptions);
                    message.channel.send('ボットを退席中に設定しました！');
                    break;
                case 'dnd':
                    presenceOptions.status = 'dnd';
                    client.user.setPresence(presenceOptions);
                    message.channel.send('ボットを「通知拒否」に設定しました！');
                    break;
                case 'invisible':
                    presenceOptions.status = 'invisible';
                    client.user.setPresence(presenceOptions);
                    break; 
                default:
                    message.channel.send('不正なステータスが指定されました。');
                    break;
            }
        }
    };
};
