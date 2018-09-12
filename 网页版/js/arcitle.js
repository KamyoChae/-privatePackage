function $(ele){
 var doc = document.querySelector(ele)
 if(doc){
     return doc
 }else{
     return new Error("dom节点有误")
 }
}

var paybtn = $('.pay-btn')
var article = $('.article')
var recover = $('.recover')
paybtn.addEventListener("click",function(){
    article.className = "article"
    recover.style.display = 'none'
},false)