const fs=require("fs");
const path=require("path")
// fs.mkdir("./Backend",(err)=>{
//     if(err)
//     console.log(err);
//    else
//    {
//     func();
//    }
//  })

path1=("./")


 function func(race){
    fs.readdir(race,(err,files)=>{
        if(err)
        console.log("Error Arises");
    else
    {
     // console.log(files);
        for(let i of files)
        {
          let state=fs.statSync(race+i); 
          if(state.isDirectory())
          {
            console.log("its is direction secrion")
            console.log(i);  
            func(race+i+"/");
          }
          if(state.isFile())
          {
            console.log(i);
            let ex=path.extname(i);
            // if(ex==".js")
            // {
            //   console.log(i);
            // }
          }
          }
        }
    })
    }
 func(path1);