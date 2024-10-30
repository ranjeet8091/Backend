let bank =[
    {Question:"The age of Ranjeet Tiwari",
    Mcq:[12,17,25,22],
    Ans:"12"
    },
    {Question:"vivek age",
    Mcq:[12,17,25,22],
    Ans:"12"
    },
    {Question:"Sagar age",
    Mcq:[12,17,25,22],
    Ans:"12"
    },
    {Question:"Mahi age",
    Mcq:[12,17,25,22],
    Ans:"12"
    },
    {Question:"Rohit age121",
    Mcq:[12,17,25,22],
    Ans:"12"
    }

];
var count=0;
let body=document.getElementById('div');
let len=bank.length;
for(let i=0;i<len;i++)
{
    function sagar()
{
   
    let p=document.createElement("p");
    p.innerHTML=bank[i].Question;
    body.appendChild(p);

     let span =document.createElement("span");
    let len=bank[i].Mcq.length;
     for(let j=0;j<len;j++)
     {
        let input=document.createElement("input");
        input.value=bank[i].Mcq[j];
        input.setAttribute('type','radio');
        input.setAttribute('name','ran');
        input.setAttribute('id',j);
        let label=document.createElement("label");
        label.setAttribute('for','va');
        label.innerHTML=bank[i].Mcq[j];
        span.appendChild(input); 
        span.appendChild(label);
        let br=document.createElement("br");
        span.appendChild(br);
     }
     div.appendChild(span);
     let but=document.createElement('button');
     but.innerHTML="Submit";
     div.appendChild(but);

     but.addEventListener('click',sub);
    
     

}
function sub()
{
        let ans=bank[i].Ans;
        console.log(ans);
        var input1=document.getElementById("0");
        console.log(input1.checked);
    if(input1.checked&&input1.value==ans){
        count++;
      
    }
    console.log(count);
}

}

