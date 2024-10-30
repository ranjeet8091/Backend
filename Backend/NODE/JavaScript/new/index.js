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

let div=document.getElementById("main")
let len=bank.length
function sagar()
{alert("rxcvh")
  for(let i=0;i<len;i++)
  {
    let p=document.createElement("p");
    p.innerHTML=bank[i].Question;
    div.appendChild(p);
  }
}