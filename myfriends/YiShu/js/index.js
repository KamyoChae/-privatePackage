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
    getPos: function () {
        // 通过style获取bottom 通过getcomp获取cssleft，返回一个对象
        var el = this.ele
        var left = window.getComputedStyle(el, null).getPropertyValue("left")
        var bottom = this.ele.style.bottom
        return {
            left: left,
            bottom: bottom
        }
    }
}


var stone = {
    // 障碍物随机

    // 障碍物检测 随机  
    timer: null,
    timerPos: null,
    flag: true,
    getPos: function () {
        // 获取位置
        // 通过getcomputedStyle获取css属性 
        // 通过style获取top
        // 给每一个img都绑定一个检测 如果left <= 头像left 并且 头像的bottom < 图片bottom+图片height 同时头像bottom > 图片bottom-图片heiht 提示游戏失败

        var arr = this.target.children
        
        arr = Array.prototype.slice.call(arr)
         
        this.timerPos = setInterval(function () {
            // console.log(that.stoneArr)
            arr.forEach(function (ele, index) {
                var oImg = ele.getAttribute("data-node")
                if (oImg == "img") {
                    var bottom = ele.style.bottom
                    var left = window.getComputedStyle(ele, null).getPropertyValue("left")
                    var height = window.getComputedStyle(ele, null).getPropertyValue("height")
                    //                console.log(ele)
                    return {
                        bottom: bottom,
                        left: left,
                        height: height
                    }
                }

            })

        }, 1000 / 1)

    },
    width: function () {
        // 用于初始化 移动到达左侧 隐藏判断
        var img = document.querySelector("img")
        try {
            return window.getComputedStyle(img, null).getPropertyValue("width")
        } catch (e) {
        }
    },
    target: document.querySelector(".createBox"),
    createStone: function () {
        var that = this
        this.timer = setInterval(function () {
            var child = that.target.children

            var len = child.length
            if (len <= 2) {
                let i = Math.ceil(Math.random() * 3)
                for (let key = 0; key < i; key++) {
                    var img = document.createElement("img")
                    img.src = that.randomImg()
                    img.style.bottom = that.randomPos() + "px"
                    img.style.left = 100 + 'vw'
                    img.setAttribute("data-node", "img") // 用于标记筛选
                    that.target.appendChild(img)
                }
            }
            that.createAgain()

        }, 2000)
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
    },

    createAgain: function () {
        // 用于移除障碍物节点
        var that = this
        var child = that.target.children // Array
        //  console.log(child)
        //  var arr = Array.prototype.slice.call(child)

        for (var i = 0; i < child.length; i++) {
            //   console.log(arr[prop].getAttribute(("data-node")))
            var oImg = child[i].getAttribute("data-node")

            if (oImg == "img") {

                var eleLeft = window.getComputedStyle(child[i], null).getPropertyValue("left")

                if (eleLeft == "-64px") {

                    that.target.removeChild(child[i])

                }

            }
        }
        /*
        下面这个写法 会导致一次移除掉所有子节点
        arr.forEach(function (ele, index) {
            var node = ele.getAttribute(("data-node"))

            if (node == "img") {
                var thisImg = window.getComputedStyle(ele, null).getPropertyValue("left")
             //   console.log(thisImg)
             var deline = parseInt(thisImg) + parseInt(that.width())
                if (deline == 0) {
                  //   console.log("移除节点"+index+"了")
                    // if(that.flag){
                    //     that.flag = false
                    //     clearTimeout(that.timeo)
                    //     that.timeo = setTimeout(function(){
                             that.target.removeChild(ele)
                    //         console.log(ele)
                    //         that.flag = true
                    //     },1000)
                    // }
                     
                    
                }
            }
        });
        */
    },
    timeo: null,
    reDom: ""
}


var init = {
    timer: null,
    start: function () {
        dog.run(true)
        bg.init(50)
        dop.doDop()
        stone.createStone()
        init.limtOver()
    },
    limtOver: function () {


        this.timer = setInterval(function () {
            var st = stone.getPos()
            var dr = dop.getPos()
            console.log(dr)
            // console.log(dr)
            // // 如果left <= 头像left 并且 头像的bottom < 图片bottom+图片height 同时头像bottom > 图片bottom-图片heiht 提示游戏失败
            // if (st.left <= dr.left && dr.bottom < st.bottom + st.height && dr.bottom > st.bottom - st.height) {
            //     console.log("游戏失败")
            // }
        }, 1000 / 2)
    }
}
init.start()