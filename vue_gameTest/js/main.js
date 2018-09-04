new Vue({
    el: "#app",
    data: {
        start: true,
        wuyao: 100,
        boss: 100,
        logs:[],
    },
    methods: {
        startshow: function () {
            this.boss = 100
            this.wuyao = 100
            this.start = !this.start
        },
        overGame: function () {
            alert("游戏结束")
            this.start = !this.start
        },
        nomarlAttact: function () {
            this.skill(20,3)
        },
        unnomarlAttact: function () { 
            this.skill(20,10)
        },
        help: function () {
            if(this.wuyao<=90){

                this.wuyao += 10;
                this.logs.unshift({green:10})
            }
            this.skill(20,3)
        },
        skill:function(s1, s2){
            if(this.boss &&this.wuyao){
                if (this.boss < 0) {
                    alert("游戏胜利")
                    return
                }
                if (this.wuyao < 0) {
                    alert("游戏失败")
                    return
                }
                this.boss -= this.attact(s1, s2);
                this.logs.unshift({blue:this.attact(s1, s2)})
                this.wuyao -= this.attact(15, 3);
                this.logs.unshift({red:this.attact(15, 3)})
            }
        },
        attact: function (max, min) {
            return Math.ceil(Math.random() * max) + min
        },
    }

})
