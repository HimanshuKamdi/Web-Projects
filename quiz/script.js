const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    // console.log("clicked")
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");  //can use document in place of quiz_box
// const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart")
const quit_quiz = result_box.querySelector(".buttons .quit")

restart_quiz.oncick = ()=>{
    console.log("clicked")
    result_box.classList.remove("activeResult");
    result_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count)
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none'
    // window.location.reload();
}

// quit_quiz.oncick = () =>{
//     window.location.reload();
// }

next_btn.onclick = () => {
    // clearInterval(counter);
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count)
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = 'none'
    }
    else {
        console.log("Completed")
        showResultBox();
    }
}

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");    
    let que_tag = '<span>' + questions[index].numb + '.' + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
        
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    // console.log(userAns);
    clearInterval(counter);
    clearInterval(counterLine);
    if (userAns == correctAns){
        userScore ++;
        // console.log(userScore)
        answer.classList.add("correct");
        // console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        // console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        

        for(let i=0 ; i< allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('class',"option correct" )
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");    
    }
    next_btn.style.display = 'block'
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + que_numb + '</p> <p>Of</p ><p>5</p> </span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector('.score_text');
    if (userScore > 3){
        let scoreTag = '<span>Congratulation!!, You got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore == 3){
        let scoreTag = '<span>You got only <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore < 3){
        let scoreTag = '<span>Sorry!!, You got only <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval( timer , 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addzero = timeCount.textContent;
            timeCount.textContent = "0" + addzero;
        }
        if(time  < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(let i=0 ; i< allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class',"option correct" )
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show");
        
        }
        
    }
}
function startTimerLine(time){
    counterLine = setInterval( timer , 29   );
    function timer(){
        time +=1;
        timeLine.style.width = time + "px"
        if(time > 549){
            clearInterval(counterLine);            
        }
    }
}

