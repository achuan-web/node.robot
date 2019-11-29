var fs = require('../public/javascripts/fs.js')
var [err, imgList] = fs.readFileSync('./public/data/img.json')
console.log(imgList.length)
let imgList_ = []


let ii = 0
fn = () => {
      ii++
      for (let i = (ii-1)*5; i <ii*5; i++) {
            imgList_[i] = imgList[i];
            console.log(i)
      }
      fs.down_img(imgList_)


}
setInterval(fn, 5000);