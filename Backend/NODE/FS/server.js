const fs=require("fs");
// fs.writeFile("./text.json","123",(err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("succesfully");
//     }
// })


// fs.appendFile("./text.json","12",(err)=>{
//            if(err)
//            console.log(err);
//         else
//         console.log("Succesfull");
// })


//  let Data=fs.writeFileSync("./text.json","789");
//  console.log(Data);
//  let Data1=fs.appendFileSync("./text.json","567");
//  console.log(Data1);


//  fs.copyFile("./text.json","./abc.json",(err)=>{
//     console.log("Copy");
//  })
//  var cp=fs.copyFileSync("./text.json","./abc.json");

//  fs.rename(".abc.json","./def.json",()=>{
//     console.log("rename");
//  })
//  var re=fs.renameSync("./abc.json","./def.json");

//  fs.readFile("./abc.json","utf-8",(err,data)=>{
//     if(err)
//     console.log(err);
// else
// console.log(data);
//  })

//  let rees=fs.readFileSync("./abc.json","utf-8");
//  console.log(rees)




 //30 jan 2024
 //Make directory and remove directory
 //The fs.rmdir() method is used to delete a directory at the given path. It can also be used recursively to remove nested directories.
 //fs.rmdir( path, options, callback )
  
// Get the current filenames 
// in the directory 
// getCurrentFilenames(); 
  
// fs.rmdir("./", () => { 
//   console.log("Folder Deleted!"); 
  
//   // Get the current filenames 
//   // in the directory to verify 
//   getCurrentFilenames(); 
// }); 
  
  
// // Function to get current filenames 
// // in directory 
// function getCurrentFilenames() { 
//   console.log("\nCurrent filenames:"); 
//   fs.readdirSync(__dirname).forEach(file => { 
//     console.log(file); 
//   }); 
//   console.log("\n"); 
// } 
 

//Make Directory
// const path = require('path');
 
// fs.mkdir(path.join(__dirname, 'test'),
//     (err) => {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('Directory created successfully!');
//     });

