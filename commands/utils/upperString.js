module.exports = function (str) {
    return str
        .match(/[0-9a-z]+/ig)
        .map(item =>
            item.substring(0, 1).toUpperCase() + item.substring(1)
        )
        .join("")
}