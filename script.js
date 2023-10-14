const btn = document.querySelector(".btn button");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const page3 = document.querySelector(".page3")
const page1 = document.querySelector(".page1")
const timeline = document.querySelector(".questionheader .timeline")
const nextbtn = document.querySelector(".nxtbtn")
let timecount = document.querySelector(".seconds")
const resultpage = document.querySelector(".resultpage")
// const restartbtn = document.querySelector(".restart")
const quitbtn = document.querySelector(".quit")
const scoretag = document.querySelector(".scoretext")


var timevlaue = 15;
let quescount = 0;
let counter;
let countetline;
let widthvalue = 0;
let score = 0;

function showresult(){
    if (score >= 3) {
        scoretag.innerHTML = '<p>Congratulations 🎉✌ You got <br> <span>'+ score + '</span> Out of <span>'+ questions.length + '</span></p>'
    } else if(score >= 1 && score < 3){
        scoretag.innerHTML = '<p>Carry on 👍 You got <br> <span>'+ score + '</span> Out of <span>'+ questions.length + '</span></p>'
    }else{
        scoretag.innerHTML = '<p>Very Sad 😢 You got <br> <span>'+ score + '</span> Out of <span>'+ questions.length + '</span></p>'
    }

}



btn.addEventListener("click", function(){
    page1.style.display = "none";
    document.querySelector(".page2").style.display = "block";
})
btn2.addEventListener("click", function(){
    document.querySelector(".page1").style.display = "block";
    document.querySelector(".page2").style.display = "none";
})

//here i use a different method to dispaly another page. 
btn3.addEventListener("click", function(){
    document.querySelector(".page2").style.display = "none";
    page3.classList.add("activequiz")
    showQuestions(0);
    starttimer(15);
    starttimerline(0)
})


nextbtn.onclick = ()=>{
    if (quescount < questions.length - 1) {
        quescount ++;
        showQuestions(quescount);
        clearInterval(counter);
        starttimer(timevlaue)

        clearInterval(counterline);
        starttimerline(widthvalue)
    } else {
        console.log("You have complete your task");
        resultpage.classList.add("activequiz")
        page3.classList.remove("activequiz")
        // rs.textContent = resultcount;
        showresult();
    }
    nextbtn.style.display = "none"
}

// restartbtn.onclick =()=>{
//     resultpage.classList.remove("activequiz")
//     page3.classList.add("activequiz")
// }
quitbtn.onclick =()=>{
    window.location.reload();
}




function showQuestions(index) {
    const questext = document.querySelector(".question") 
    let questag = "<span>"+ questions[index].numb +". " + questions[index].question +"</span>";
    questext.innerHTML = questag;
    const optionlist = document.querySelector(".Quesoptions")

    let optiontag ='<div class="options"><span>'+ questions[index].option[0] +'</span></div>'
    + '<div class="options"><span>'+ questions[index].option[1] +'</span></div>'+ '<div class="options"><span>'+ questions[index].option[2] +'</span></div>' + '<div class="options"><span>'+ questions[index].option[3] +'</span></div>'
    optionlist.innerHTML = optiontag;

    const totalques = document.querySelector(".totalques p")
    let totaltag = questions[index].numb + " of 5 Questions";
    totalques.innerHTML = totaltag;
    const option = document.querySelectorAll(".Quesoptions .options")

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)")

    }

}

function optionSelected(answer) {
    clearInterval(counter)
    clearInterval(counterline);
    let userAns = answer.textContent;
    let correctAns = questions[quescount].answer;
    const optionlist = document.querySelector(".Quesoptions");
    let alloptions = optionlist.children.length

    let tickicon = '<div class="tickicon"><i class="ri-check-line"></i></div>'
    let crossicon = '<div class="crossicon"><i class="ri-close-line"></i></div>'

    if (userAns == correctAns) {
        console.log("Answer is Correct");
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickicon);
        score += 1;
    } else {
        console.log("Answer is Wrong");
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossicon)
        
        for (let i = 0; i < alloptions; i++) {
            if (optionlist.children[i].textContent == correctAns) {
                optionlist.children[i].classList.add("correct")
                optionlist.children[i].insertAdjacentHTML("beforeend", tickicon)
            }
            
        }
    }

    for (let i = 0; i < alloptions; i++) {
        optionlist.children[i].classList.add("disable")
    }
    nextbtn.style.display = "block"

}
function starttimer(time) {
    counter = setInterval(() => {
        timecount.textContent = time;
        time--;
        if (time < 9) {
            let addzero = timecount.textContent
            timecount.textContent = 0 + addzero;
        }
        if (time < 0) {
            clearInterval(counter)
            timecount.textContent = "00"
        }
    }, 1000);
}
function starttimerline(time) {
    counterline = setInterval(()=>{
        time += 1;
        timeline.style.width = time + "px"
        if (time > 319) {
            clearInterval(counterline)
        }
    }, 50)
}