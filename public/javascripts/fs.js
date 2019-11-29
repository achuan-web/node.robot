let fs = require("fs");
const superagent = require("superagent");
//保存到本地
let writeFileSync = (path, data) => {
    try {
        let data_str = JSON.stringify(data, null, 2);
        fs.writeFileSync(path, data_str);
        return [null, true];
    } catch (error) {
        return [error];
    }
};
/**调用示例**/
// let [err, result] = writeFileSync('./public/data/data.json', {id :1})
// if(err) return console.log(err)
// console.log(result)
/**调用示例**/
//读取文件
let readFileSync = path => {
    try {
        let result = fs.readFileSync(path);
        result = JSON.parse(result)
        return [null, result];
    } catch (error) {
        return [error];
    }
};
//日志
let log = (str, name = 1) => {
    str = str + "\n";
    try {
        fs.appendFileSync(`./public/log/${name}.log`, str);
        return [null, true];
    } catch (error) {
        return [error];
    }
};
let unlinkSync = path => {
    try {
        fs.unlinkSync(path);
        return [null, result];
    } catch (error) {
        return [error];
    }
};
//判断是还是目录文件
let statSync = path => {
    try {
        let type = "";
        let stats = fs.statSync(path);
        switch (true) {
            case stats.isFile():
                type = "文件";
                break;
            case stats.isDirectory():
                type = "目录";
                break;
            case stats.isBlockDevice():
                type = "块设备";
                break;
            case stats.isCharacterDevice():
                type = "字符设备";
                break;
            case stats.isSymbolicLink():
                type = "软链接";
                break;
            case stats.isFIFO():
                type = "FIFO"; //FIFO是UNIX中的一种特殊类型的命令管道。
                break;
            case stats.isSocket():
                type = "Socket ";
                break;
        }
        return [null, type, stats];
    } catch (error) {
        return [err];
    }
};
// 调用示例
// let [err,type,stats] = statSync('./public')
// if(err) console.log(err)
// else console.log(type,stats)

let down_img = (arr,callback = () => {}) => {
    let arr_log = []
    arr.forEach((e, i) => {
        try {
            let imgName =  i+'.jpg' ||e.alt + '.jpg';
            //下载图片存放到指定目录
            let stream =  fs.createWriteStream(`./public/images/${imgName}`);
            let req =  superagent.get(e.src); //响应流
            req.pipe(stream); //将刘输入文件
            arr_log[i] = `${i} is ok`
            console.log(`${i} is ok`)
        } catch (error) {
            arr_log[i] = `${i} is err =>${error}`
        }
        //获取图片名

    });
    callback(arr_log)
}
//调用方法
// down(arr, (log) => {
//     log.forEach(e => console.log(e))
// })
module.exports = {
    writeFileSync,
    readFileSync,
    unlinkSync,
    statSync,
    down_img,
    log
};