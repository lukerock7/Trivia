var score = 0;
var gameCount = 0;

function run() {

    var amount = $("#amount").val();
    var category = $("#category").val();
    var difficulty = $("#difficulty").val();
    var type = $("#type").val();
    
    console.log(amount);

    $.ajax({
        url: 'https://opentdb.com/api.php?amount='+ amount + '&category=' + category + '&difficulty=' + difficulty + '&type='+ type,
        dataType: "json",
        success: process
    });

}

function process(data){
console.log(data);
var questions = data.results;
console.log(questions);
questions.forEach(generateQuestion);
$("#score").append("Your current score is: " + score + "/" + $("#amount").val());

}

function generateQuestion(x , i){
    var tAns = $("<div class = 'question'id = " + i +">" + x.question + "</div>");
    $("#quiz").append(tAns);
    console.log(x.incorrect_answers);
    var rightAns = $("<button class ="+i+">" + x.question+"</button>");
    var rightAns = $("<button class =" + i + "> " + x.correct_answer + "</button>");

    var pos = Math.floor((Math.random() * 4) + 0);
    if(pos ==1){
        rightAns.addClass("rightAns");
        rightAns.attr("onclick", "rightAnswer(this)");
        $("#quiz").append(rightAns);

        x.incorrect_answers.forEach(function (ans) {
            var incorAns = $("<button class+" + i + "> " + ans + "</button>");
            incorAns.attr("onclick", "wrongAnswer(this)");
            $("#quiz").append(incorAns);
        });

    } if(pos ==2 || pos==0){

        x.incorrect_answers.forEach(function (ans) {
            var incorAns = $("<button class+" + i + "> " + ans + "</button>");
            incorAns.attr("onclick", "wrongAnswer(this)");
            rightAns.addClass("rightAns");
            rightAns.attr("onclick", "rightAnswer(this)");
            $("#quiz").append(incorAns);
            $("#quiz").append(rightAns);
        });

    }if(pos == 3){
        x.incorrect_answers.forEach(function (ans) {
            var incorAns = $("<button class+" + i + "> " + ans + "</button>");
            incorAns.attr("onclick", "wrongAnswer(this)");
            rightAns.addClass("rightAns");
            rightAns.attr("onclick", "rightAnswer(this)");
            $("#quiz").append(rightAns);
            $("#quiz").append(incorAns);

        });
    }if( pos==4){
        x.incorrect_answers.forEach(function (ans) {
            var incorAns = $("<button class+" + i + "> " + ans + "</button>");
            incorAns.attr("onclick", "wrongAnswer(this)");
            $("#quiz").append(incorAns);
        });
        rightAns.addClass("rightAns");
        rightAns.attr("onclick", "rightAnswer(this)");
        $("#quiz").append(rightAns);

    }
}

function wrongAnswer(x){
    console.log(x.className);
  x.style.backgroundColor="red";
  var a=x.className
  $("."+a).attr("disabled",true);
  var b= a+" correct";
  console.log(b)
  document.getElementsByClassName(b)[0].style.backgroundColor="green";
  gameCount++
//   gameOver()
  }
  
  function rightAnswer(x){
    x.style.backgroundColor="green";
    console.log(x.className);
    var b=x.className;
    var a=b.split(' ')[0]
  $("."+a).attr("disabled",true);
    score++
    gameCount++
    $("#score").empty();
    $("#score").append("Your current score is: " + score + "/" + $("#amount").val());
    console.log(score);
    // gameOver()
  }

  function reset(){
    $("#quiz").empty();
    $("#score").empty();
    score = 0;
    gameCount = 0;
  }
