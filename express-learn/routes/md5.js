let crypto = require('crypto')

 const getMD5=  function getMD5(id) {
    const md5 = crypto.createHash('md5')
    const token_before = id + '123456'
    return md5.update(token_before).digest('hex')
}
module.exports = getMD5
