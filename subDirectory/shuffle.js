// Fisher-Yatesシャッフルアルゴリズム
shuffle = (array) =>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
};

// ランダムでかぶらないアイテムを取得する関数
exports.getRandomUniqueItems = (array, count)=>{
    if (count > array) {
        throw new Error('リクエストされた数が、利用可能なアイテムの数を超えています');
    }
    const shuffledArray = shuffle([...array]); // 配列をシャッフル
    return shuffledArray.slice(0, count); // 最初の`count`個を取得
};
// 2つのリストからランダムでかぶらないアイテムの組み合わせを取得する関数
exports.getRandomUniqueCombinations =(list1, list2, count)=> {
    const usedIndexes = new Set();
    const combinations = [];

    while (combinations.length < count) {
        const index1 = Math.floor(Math.random() * list1.length);
        const index2 = Math.floor(Math.random() * list2.length);
        const combination = [list1[index1], list2[index2]];
        const key = `${index1}-${index2}`;

        // 既に使用された組み合わせでないかを確認
        if (!usedIndexes.has(key)) {
            combinations.push(combination);
            usedIndexes.add(key);
        }
    }
    return combinations;
}

// 複数のリストからランダムでバランスよくアイテムを取得する関数
exports.getRandomUniqueItemsvalo = (arrays, count)=>{
    const combinedArray = arrays.flat();
    if (count > 5) {
        throw new Error('リクエストされた数が、利用可能なアイテムの数を超えています');
    }
    const shuffledArray = shuffle([...combinedArray]); // 配列をシャッフル
    return shuffledArray.slice(0, count); // 最初の`count`個を取得
};
