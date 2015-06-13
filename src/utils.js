var utils = {};

utils.getRandomColor = function () {
    //return '#'+Math.floor(Math.random()*16777215).toString(16);
    var colors = [
        "#e674f5",
        "#55c2ec",
        "#6aeb4c",
        "#fa9b5c",
        "#3deda5",
        "#b17dbe",
        "#1095c8",
        "1645cc"
    ];
    return colors[Math.floor(utils.getRandomFromRange(0,colors.length))];
};

utils.getRandomFromRange = function (min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = utils;
