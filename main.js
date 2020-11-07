
// Whenever you see [insert api key], [insert handle], [insert secret] then insert the information you either want or got from the codeforces api page
const https = require('https'); 
var crypto = require('crypto'); 
const sound = require('sound-play'); 
const path  = require('path'); 

setInterval(dataCollection, 250); // You may repeat it faster than once every 250 milliseconds, but the codeforces api allows no faster than 200 milliseconds  
function dataCollection(){
var curtime = Math.floor(Date.now()/1000);
var in1 = Math.floor(Math.random() * 9); 
var in2 = Math.floor(Math.random() * 9); 
var in3 = Math.floor(Math.random() * 9); 
var in4 = Math.floor(Math.random() * 9); 
var in5 = Math.floor(Math.random() * 9); 
var in6 = Math.floor(Math.random() * 9); 
var StrtoHash = `${in1}${in2}${in3}${in4}${in5}${in6}/user.status?[insert api key]&count=1&handle=[insert handle]&time=${curtime}#[insert secret]`; 
var hashing = crypto.createHash('sha512').update(StrtoHash).digest('hex'); // this is your api Sig besides the random 6 characters

var url =  `https://codeforces.com/api/user.status?handle=[insert handle]&count=1&apiKey=[insert api key]&time=${curtime}&apiSig=${in1}${in2}${in3}${in4}${in5}${in6}${hashing}`;

let createTime; 
let ver; 
https
    .get(url, resp =>{
    let data = ""; 
    resp.on("data", chunk =>{
        data+=chunk; 
        console.log("request successful " + '\n'); // Can take it out, but it tells you if you've succcessfully connected to the server
        });
        resp.on('end', () =>{
            
           let stats = JSON.parse(data).result[0]; 
            ver = stats.verdict; 
           createTime = stats.creationTimeSeconds; 
           curtime = Math.floor(Date.now()/1000);
           
        
            if(Math.abs(curtime - createTime) <= 20 && ver == "OK"){                
               console.log("TRUE!!!"); // can take out but tells you if it successfully reads the data
               sound.play('questioncorrect.mp3'); // insert name of mp3 file
               process.exit(); // may change if you don't want it to quit everytime you submit

            }
            if(Math.abs(curtime - createTime) <= 20 && ver != "OK"){
                console.log("WRONG!!!"); 
                sound.play('wrongaudio.mp3'); // insert name of mp3 file
                process.exit();  // may change if you don't want it to quit everytime you submit
                }
        }); 
    }); 
}

// please email mathgeek145@gmail.com for any queries or comments.

