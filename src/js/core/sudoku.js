//生成数独游戏

//1.生成完成的解决方案：Generator
//2.随机取出部分数据： 按比例

const Generator = require("./generator");

module.exports = class Sudoku {
    constructor() {
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    make(level = 3) {
        const shouldRid = Math.random() * 9 < level;
        //生成谜盘
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        })
    }
}
