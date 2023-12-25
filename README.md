<!-- ## js小技巧 -->
forEach 跳出循环 try catch 或者 splice
let list = [1,2,3,4,5]
list.forEach((item,i,arr)=>{
    console.log(item)
    if(item==3){
        arr.splice(i)
    }
})