function a (age){
    console.log(age)
    var age = 20;
    console.log(age)
    function age() {
        age = 10
    }
    console.log(age)
}
// function 预编译结果
// 20  按顺序 var age= 20
// 20 
// age一定是函数 函数内没有就向外查找
a(18)
// AO{
//     age:undefined
// }
// AO上如果有与函数同名的变量 则会被函数覆盖
