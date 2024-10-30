/////Events Creation//////////////

//Every action on a computer is an event. Like when a connection is made or a file is opened.
//Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file:
const EventEmmiter=require("events");
const eventemmiter=new EventEmmiter();
//Every on is executed when emit is call with enter the name of funtion

eventemmiter.on("start",(a,b,c,obj)=>{
    console.log("Hello Event");
    console.log(a);
    console.log(b);
    console.log(c[0].Roll);
    console.log(`${obj.name} and ${obj.Roll}`);
})
const Sagarde={
    name:"Sagar",
    Roll:2211985043,
    Section:"V"
}
const array=[
    {
        name:"Ranjeet",
        Roll:2211985039,
        Section:"V"
    }
]

eventemmiter.on("start",(a,c)=>{
    console.log("another Event");
    console.log(a);
    console.log(c);
})
eventemmiter.emit("start",21,"Ranjeet",array,Sagarde);
