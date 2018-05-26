//生成数独解决方案
const Toolkit = require("./toolkit.js");
module.exports = class Generator {

    generate() {
        while (!this.internalGenerate()) {
            console.warn("try again!");
        }
    }

    //洗牌得到的数组只是用来随机取列的，究竟能否在一个位置放数字要通过checkFillable来判断
    //1-9填充的数组洗牌以后就能保证既能让位置随机，又能遍历整行
    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let n = 1; n <= 9; n++) {
            //逐个填充数字
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }

    fillNumber(n) {
        //将数字n填充到第0行，开始递归，这个函数作用是告诉填哪个数n
        return this.fillRow(n, 0);
    }

    //这个函数作用是告诉填哪，以及将某个数字填满所有行
    fillRow(n, rowIndex) {
        //这是填充结束的条件
        if (rowIndex > 8) {
            return true;
        }
        const row = this.matrix[rowIndex];

        // TODO 随机选择列
        const orders = this.orders[rowIndex];

        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            //如果这个位置有值，跳过到下一个位置，每次都是用的同一个order，所有读取顺序一致，需要判断
            if (row[colIndex]) {
                continue;
            }

            //检查这个位置是否填写n，如果这个位置填不了，跳到下个位置啦
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            row[colIndex] = n;

            //如果下一个行不能找到能填写的，将刚才填写的复制为0，接着遍历
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;

        }
        return false;
    }
};
