let arrtask=[];
document.body.style.background="ivory"
let divtask=document.createElement("div");
let outputdiv=document.createElement("div");
let inputtask=document.createElement("input");
inputtask.setAttribute('placeholder','Add Task Here');
inputtask.setAttribute("type",'text');
let addtaskbtn=document.createElement("button");
addtaskbtn.innerHTML="&plus;";

divtask.append(inputtask,addtaskbtn);
document.body.append(divtask,outputdiv);
divtask.style.marginLeft="500px";
divtask.style.marginTop="50px"
divtask.style.border="3px solid black"
divtask.style.width="300px";
divtask.style.height="100px";
divtask.style.background="dimgrey";
divtask.style.borderRadius="7px"
inputtask.style.margin="35px"


outputdiv.style.marginLeft="400px";
outputdiv.style.marginTop="50px"
outputdiv.style.border="3px solid black"
outputdiv.style.width="500px";
outputdiv.style.height="auto";
outputdiv.style.background="dimgrey";
outputdiv.style.borderRadius="7px"



addtaskbtn.addEventListener('click',(e)=>
{
  let data=inputtask.value.trim();
    if(data!='')
    {
      addtask();
     inputtask.value='';
    }
    else
    {
    alert("input bar is empty....");
    inputtask.value='';
    }

})



function addtask()
{
    let divtemp=document.createElement('div');
    divtemp.style.border='2px solid white';
    divtemp.style.borderRadius="5px";
    divtemp.style.margin="5px";
    divtemp.style.padding="3px";
    divtemp.style.background="khaki"
    let span =document.createElement('span');
    let checkbox=document.createElement('input');
    let checkbox1=document.createElement('input');
    //let checkbox2=document.createElement('input');

    checkbox.setAttribute('type','button');
    checkbox1.setAttribute('type','button');    
    checkbox1.setAttribute('value','delete');
    checkbox.setAttribute('value','tick');
    span.innerText=inputtask.value;
    span.style.margin='10px';
    checkbox.style.marginRight='10px';

    divtemp.append(span);
    divtemp.append(checkbox);
    divtemp.append(checkbox1);
    outputdiv.append(divtemp);

    arrtask.push(inputtask.value);
    console.log(arrtask);
    checkbox1.addEventListener('click',()=>
    {
      // let l=arrtask.length;
      // for(let i=0;i<l;i++)
      // {
      //   if(inputtask.value==arrtask[i])
      //   {
      //     alert(arrtask[i]);
      //     arrtask.splice(i,1);
          
      //   }
      // }
      divtemp.style.display="none";
      
  
    })
    checkbox.addEventListener('click',()=>{
      span.style.textDecoration="line-through";
      divtemp.style.backgroundColor='greenyellow';
      savdata()
    })
    
    //css line decoram
    ///parentnode
    
}


function savdata() {
  localStorage.setItem('arrtask', JSON.stringify(arrtask));
}

function showdata() {
  let storedTasks = localStorage.getItem('arrtask');
  if (storedTasks) {
    arrtask = JSON.parse(storedTasks);
    arrtask.forEach(task => {
      inputtask.value = task;
      addtask();
    });
  }
}

window.onload = showdata();
document.body.append(outputdiv);




