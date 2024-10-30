const path=require("path");
// console.log(path.join("folder1","folder2","../folder3"));
// console.log(__dirname)
// console.log(__filename)

//The output of the path.basename(__dirname) is directory name
// console.log(path.basename(__dirname))
//The output of the path.basename(__filename) is file name name
// console.log(path.basename(__filename))

//The out of this is the extension name of the file or folder
// console.log(path.extname(__dirname))
// console.log(path.extname(__filename))


//The path.join() method joins the specified path segments into one path
//You can specify as many path segments as you like.
//The specified path segments must be strings, separated by comma.
//it has relative path
console.log(path.join("folder1","folder2","folder3"))
console.log(path.join("/folder1","folder2","folder3"))
console.log(path.join("folder1","/folder2","folder3"))
console.log(path.join("folder1","folder2","../folder3"))


//The path.resolve() method joins the specified path segments into one path
//but it has absolute path
// console.log(path.resolve("folder1","folder2","folder3"))
// console.log(path.resolve("/folder1","folder2","folder3"))
// console.log(path.resolve("folder1","/folder2","folder3"))
// console.log(path.resolve("folder1","folder2","../folder3"))



/////Events Creation//////////////
// const EventEmmiter=require("events");
// const eventemmiter=new EventEmmiter();
// //Every on is executed when emit is call
// eventemmiter.on("start",(a,b,c,obj)=>{
//     console.log("Hello Event");
//     console.log(a);
//     console.log(b);
//     console.log(c[0].Roll);
//     console.log(`${obj.name} and ${obj.Roll}`);
// })
// const Sagarde={
//     name:"Sagar",
//     Roll:2211985043,
//     Section:"V"
// }
// const array=[
//     {
//         name:"Ranjeet",
//         Roll:2211985039,
//         Section:"V"
//     }
// ]
// eventemmiter.emit("start",21,"Ranjeet",array,Sagarde);



