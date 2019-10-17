let group = (list = null) => {
    // 加载拼音转换工具
    const pinyin = require('js-pinyin');
    // 模拟list
    list = list || Helper.mock({
        'list|100': [{
            'nick_name': '@cname()'
        }]
    }).list;

    // 在列表中添加 拼音首字母缩写 和 拼音首字母
    // 之后使用 拼音首字母缩写排序列表；
    list = list.map(x => {
        x.pinyin_nick_name = pinyin.getFullChars(x.nick_name);
        x.pinyin_first_alpha = x.pinyin_nick_name.substr(0, 1);
        return x;
    }).sort((a, b) => {
        return a.pinyin_nick_name > b.pinyin_nick_name ? 1 : -1;
    });
    console.log(list);
    // 提炼出存在的拼音首字母，并组合为列表
    let alphabets = list.reduce((t, x) => {
        if (!t.includes(x.pinyin_first_alpha)) {
            t.push(x.pinyin_first_alpha);
        }
        return t;
    }, []);
    console.log(alphabets);
    // 根据首字母进行归类的二维数组
    let groupList = alphabets.map(x => {
        return list.filter(item => {
            return item.pinyin_first_alpha === x;
        })
    });
    console.log(groupList);
}