let fs = require('fs')

download = (data,path) => {
    let data_str = JSON.stringify(data)
    fd = fs.openSync(path , 'w')
    fs.writeSync(fd,data_str)
    fs.closeSync(fd)
}
module.exports = {
    download
}