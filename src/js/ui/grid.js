//生成九宫格
const Toolkit = require("../core/toolkit");
const Sudoku = require("../core/sudoku");
const Checker = require("../core/checker")

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        //首先生成一个矩阵
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        //        const generator = new Generator();
        //        generator.generate();
        //        const matrix = generator.matrix;

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_middle", "col_g_right"]

        //矩阵的每一行为一个div，每一个格子为cell------处理每行->处理单行中的每格->将格子的值装到span中
        //二维数组循环
        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? "fixed" : "empty")
                .text(cellValue);
        }));

        //一维数组循环
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width(); //这个不懂啥意思
        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ""
            });
    }

    //检查用户解密结果，成功则提示，失败显示错误位置的标识
    check() {
        const data = this._$container.children()
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => parseInt($(span).text()) || 0);
            })
            .toArray()
            .map($data => $data.toArray());

        console.log(data);
        const checker = new Checker(data);
        if (checker.check()) {
            return true;
        }

        //检查不成功如何标记
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children().each((colIndex, span) => {
                    const $span = $(span)
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass('error');
                    } else {
                        $(span).addClass('error');
                    }

                })
            })
    }

    //重置当前谜盘到初始状态
    reset() {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }

    //清理错误标记
    clear() {
        this._$container.find("span.error")
            .removeClass("error");
    }

    //重建新的谜盘，开始新一局
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }

    bindPopup(popupNumbers) {
        //jquery的事件代理
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
            popupNumbers.popup($cell);
        })
    }
}

module.exports = Grid
