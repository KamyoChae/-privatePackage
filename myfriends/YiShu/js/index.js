var dog = {
    // 奔跑的狗 动画
    ele: document.querySelector(".dog"),
    timer: null,
    run: function (flag) {
        var index = 0
        var that = this
        var count = 85 // 默认大小
        if (!flag) {
            clearInterval(this.timer)
        } else {
            this.timer = setInterval(function () {
                index++
                that.ele.style.backgroundPosition = count * index + "px 0px"
                if (index == 5) {
                    index = 0
                }
            }, 100)
        }

    },
}
dog.run(true)

var bg = {
    // 轮播图思想
    // 背景轮播
    num: 10,
    timer: null,
    ele: document.querySelector(".randombg"),
    init: function (sec) {
        clearTimeout(this.timer)
        var wid
        if (!sec || sec < 10) {
            wid = 1000
            sec = 3
        } else {
            wid = sec * 100
        }
        this.ele.style.width = wid + "vw"
        this.ele.style.animationDuration = sec + "s"

        this.timer = setTimeout(function () {
            // 时间到了 把狗暂停
            document.querySelector(".friends").className = "friends"
            dog.run(false)
        }, sec * 1000);
    },
    swrap: function () {
        // 这里尝试使用随机生成的dom节点实现背景图片的滚动 借用的是轮播图的原理 
        // 但是实际生成过程出现了白边抖动（定时器动画不够流畅 改成css3依旧出现白边抖动） 不知道是什么原因 有待思考
        // var _this = this
        // setInterval(function(){
        //     _this.num -= 12
        //     _this.ele.style.left = _this.num  +"px"
        //     console.log(_this.ele.clientWidth + _this.num)
        //     if(_this.ele.clientWidth + _this.num  <= 510){
        //         _this.ele.style.left = 0 +"px"
        //         _this.num = 10
        //     }
        // },1000/16)

    },
}
bg.init(50)

var dop = {
    // 跳动
    ele: document.querySelector(".friends"),
    target: document.querySelector(".randombg"),
    count: 0,
    timer: null,
    timeo: null,
    doDop: function () {
        var that = this
        that.target.addEventListener("click", function () {
            clearInterval(this.timer)
            clearTimeout(this.timeo)
            that.count += 10
            that.ele.style.bottom = that.count + "vh"
            this.timeo = setTimeout(function () {
                clearTimeout(that.timer)
                that.timer = setInterval(function () {
                    var line = that.ele.style.bottom

                    if (line !== "0vh") {
                        that.count -= 5
                        that.ele.style.bottom = that.count + "vh"
                    } else {
                        clearInterval(that.timer)
                    }

                }, 1000 / 60)
            }, 300)

        }, false)
        return this
    },
}
dop.doDop()

var stone = {
    // 障碍物随机

    // 障碍物检测 随机 
    timer: null,
    target: document.querySelector(".createBox"),
    createStone: function () {
        var that = this
        this.timer = setInterval(function () {
            var child = that.target.children
            var len = child.length
            console.log(len)
            if (len == 1) {
                var i = Math.ceil(Math.random() * 3)
                for (var key = 0; key < i; key++) {
                    var img = document.createElement("img")
                    img.src = that.randomImg()
                    img.style.top = that.randomPos() + "px"
                    img.style.left = 100 + 'vw'
                    that.target.appendChild(img)
                }

            }
            


        }, 1000 / 60)
    },
    randomImg: function () {
        // 随机生成照片
        var src = "./images/" + Math.ceil(Math.random() * 12) + ".jpg"
        return src
    },
    randomPos: function () {
        // 随机生成 障碍物纵坐标
        var that = this
        return Math.ceil(Math.random() * that.target.clientHeight)
    }


}
stone.createStone()