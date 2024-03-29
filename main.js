const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const resume = document.querySelector("#resume");
const lap = document.querySelector("#lap");
const reset = document.querySelector("#reset");
const min = document.querySelector(".min .time");
const sec = document.querySelector(".sec .time");
const millisec = document.querySelector(".millisec .time");
const buttons = document.querySelector(".buttons")
const laps = document.querySelector(".laps")
const tbody = document.querySelector("tbody");

let interval;
let time=0;

function runtime(){
        interval = setInterval(()=>{    //in this function, first time runs then callback function executed
        time += 10;
        millisec.textContent=((time%1000)/10).toString().padStart(2,"0")
        sec.textContent=(Math.floor((time/1000))%60).toString().padStart(2,"0")
        min.textContent=Math.floor(time/60000).toString().padStart(2,"0")
    }, 10);
}
start.addEventListener("click",()=>{
    runtime();
    buttons.classList.remove("freshstate");
    buttons.classList.add("startstate");
});
pause.addEventListener("click", ()=>{
    clearInterval(interval);
    buttons.classList.remove("startstate");
    buttons.classList.add("pausestate");
});
resume.addEventListener("click",()=>{
    runtime();
    buttons.classList.remove("pausestate");
    buttons.classList.add("startstate");
});
reset.addEventListener("click",()=>{
    [millisec, sec, min].forEach((timeel)=>{
        timeel.textContent="00";
    })
    time=lapcount=preoveralltime=0;
    buttons.classList.remove("pausestate");
    buttons.classList.add("freshstate");
    laps.style.display="none";
    tbody.innerHTML="";
    pretotmin=pretotsec=pretotmillisec="0";
});

let lapcount = 0;
let overalltime, overallmin, overallsec, overallmillisec;
let laptime, lapmin, lapsec, lapmillisec;
let preoveralltime=0;
let tr;

lap.addEventListener("click",()=>{
    lapcount += 1;
    
    overalltime = time;
    overallmillisec=((overalltime%1000)/10).toString().padStart(2,"0")
    overallsec=(Math.floor((overalltime/1000))%60).toString().padStart(2,"0")
    overallmin=Math.floor(overalltime/60000).toString().padStart(2,"0")
    
    laptime = overalltime - preoveralltime;
    lapmillisec=((laptime%1000)/10).toString().padStart(2,"0")
    lapsec=(Math.floor((laptime/1000))%60).toString().padStart(2,"0")
    lapmin=Math.floor(laptime/60000).toString().padStart(2,"0")

    tr = document.createElement("tr");
    tr.innerHTML="<td>"+lapcount+"</td><td>"+lapmin+":"+lapsec+"."+lapmillisec+"</td><td>"+overallmin+":"+overallsec+"."+overallmillisec+"</td>";
    laps.style.display="block";
    tbody.appendChild(tr);
    preoveralltime =  overalltime;
})