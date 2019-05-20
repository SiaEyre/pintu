//先做配置 
var plugin = {
    $wrapperDom: $(".wrapper"),
    backgroundImage: 'url(img/lol.png)',
    wrapperW: 600,
    wrapperH: 600,
    row: 3,
    col: 3
}
var newarr = [];
var boxW = parseInt(plugin.wrapperW / plugin.col);
var boxH = parseInt(plugin.wrapperH / plugin.row);
var blocks = [];
var isEmpty = false;
var emptyL, emptyT;
//生成一个小方块

function createOneBox(x, y, bgX, bgY, bool) {

    var divBox = $("<div></div>").css({
        height: boxH + "px",
        width: boxW + "px",
        position: "absolute",
        backgroundImage: plugin.backgroundImage,
        backgroundPositionX: -bgX + "px",
        backgroundPositionY: -bgY + "px",
        border: "1px solid #333",
        boxSizing: "border-box",
        left: x + "px",
        top: y + "px"
    })
    if (!isEmpty) {
        plugin.$wrapperDom.append(divBox);
    } else {
        empty = divBox;
    }
    blocks.push(divBox);
}

function init() {
    var arr = [];
    for (var i = 0; i < plugin.row; i++) {
        for (var j = 0; j < plugin.col; j++) {
            var x = j * boxW;
            var y = i * boxH;
            arr.push([x, y]);
            newarr.push([x, y])
        }
    }
    arr.sort(function() {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            isEmpty = true;
            emptyL = arr[i][0];
            emptyT = arr[i][1];
        }
        createOneBox(arr[i][0], arr[i][1], newarr[i][0], newarr[i][1], isEmpty);
        // createOneBox(arr[i][0], arr[i][1], isEmpty);
        blocks[i].click(function() {
            // if (Math.abs(emptyL - $(this).offset().left) +
            //     Math.abs(emptyT - $(this).offset().top) !== parseInt(boxW)) {
            //     return;
            // }
            switchPosition($(this));
        })
    }

}
init();

function switchPosition(block) {
    update(empty, block.offset().left, block.offset().top);
    update(block, emptyL, emptyT);
    var L = block.offset().left;
    var T = block.offset().top;
    block.offset().left = emptyL;
    block.offset().top = emptyT;
    emptyL = L;
    emptyT = T;
    if (isGameOver()) {
        alert("成功")
    }
}

function update(block, L, T) {
    block.css({
        transition: "all 1s",
        left: L + "px",
        top: T + "px",
    })
}

function isGameOver() {
    for (var i = 0; i < blocks.length - 1; i++) {
        if (!(blocks[i].offset().left === newarr[i][0] &&
                blocks[i].offset().top === newarr[i][1])) {
            return false;
        }
    }
    return true;
}