var dog = {
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
                    console.log(line)
                    if (line !== "0vh") {
                        that.count -= 5
                        that.ele.style.bottom = that.count + "vh"
                    }else{
                        clearInterval(that.timer)
                    }

                }, 1000 / 16)
            }, 300)

        }, false)
        return this
    },
}
dop.doDop()