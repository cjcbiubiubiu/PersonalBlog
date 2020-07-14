// 成功之后的回调
writeResult = (status, msg, data) => {
    return JSON.stringify({
        status,
        msg,
        data
    });
}

module.exports.writeResult = writeResult;