// OOP: Nesne Tabanlı Programlama


const ui =new UI()


const quiz = new Quiz(sorular);

ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    StartTimer(10);
    StartTimeLine();
    ui.soruGoster(quiz.soruGetir());
    ui.SoruSayisiniGoster(quiz.soruIndex + 1,quiz.sorular.length);
    ui.btn_next.classList.remove("show");
})

ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter);
        StartTimer(10);
        clearInterval(counterLine);
        StartTimeLine();
        ui.soruGoster(quiz.soruGetir());
        ui.SoruSayisiniGoster(quiz.soruIndex + 1,quiz.sorular.length);
        ui.btn_next.classList.remove("show");
    } else {
        console.log("quiz bitti");
        clearInterval(counterLine);
        clearInterval(counter);
        ui.score_box.classList.add("active");
        ui.quiz_box.classList.remove("active");
        ui.skoruGoster(quiz.sorular.length,quiz.dogruCevapSayisi);
    }
});
ui.btn_Quit.addEventListener("click",function(){
    window.location.reload();
});
ui.btn_Replay.addEventListener("click",function(){
     quiz.soruIndex=0;
     quiz.dogruCevapSayisi=0;
     ui.btn_start.click();
     ui.score_box.classList.remove("active");
});

// const option_list = document.querySelector(".option_list");
// const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
// const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';



function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi+=1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }
    
    ui.btn_next.classList.add("show");
}


let counter;
function StartTimer(time)
{
    counter= setInterval(timer,1000);

     function timer(){
        ui.time_second.textContent=time;
        time--;
        if(time<0)
        {

             clearInterval(counter);
             ui.time_text.textContent="Süre Doldu !";
             let cevap = quiz.soruGetir().dogruCevapSayisi;

             for(let option of ui.option_list.children)
             {   
               if(option.querySelector("span b").textContent == cevap){
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", ui.correctIcon);
            }
               option.classList.add("disabled");
                
            }

            ui.btn_next.classList.add("show");
        }
     }
}

let counterLine;
function StartTimeLine()
{
     let line_Width=0;
     counterLine=setInterval(timer,100);
     function timer(){
         line_Width+=5;
         ui.time_line.style.width=line_Width+"px";
         if(line_Width>549)
         {
             clearInterval(counterLine);
         }
     }
}