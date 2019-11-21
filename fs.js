let fs = require('fs')

download = (path, data) => {
    let data_str = JSON.stringify(data)
    fd = fs.openSync(path, 'w')
    fs.writeSync(fd, data_str)
    fs.closeSync(fd)
}
module.exports = {
    download
}