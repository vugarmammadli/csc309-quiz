"use strict";

var totalScore = 0; //the total score of the user

function question1() {
  var firstAttempt = 0;
  var previousAnswer;
  
  $("input[name='answer']").click(function(){
    var answer = $("input[name='answer']:checked").val();
    
    if(answer == "ferut" && firstAttempt == 0)
      totalScore += 1;

    //display clicked answers explanation and hide other explanations.
    if(firstAttempt != 0){
      $("#" + previousAnswer).attr('hidden', 'hidden');
      $("#" + answer).removeAttr('hidden');
      previousAnswer = answer;
    } else{
      $("#" + answer).removeAttr('hidden');
      previousAnswer = answer;
    }
    
    // display show all explanation button.
    $('#explanations').removeAttr('hidden');
    
    firstAttempt = 1;
    displayTotalScore();
  });
  
  // display all explanations for each answer.
  $("#show_explanation").one("click", function(){
    $('#q1 #answers ul li p:nth-child(2)').attr('hidden', 'hidden');
    $('#q1 #answers ul li p:nth-child(2)').toggle('show');
    $('#show_explanation').attr('disabled', true);
  });
}

function displayTotalScore(){
  $('#score').text(totalScore);
}

$(document).ready(function () {
  question1();
  displayTotalScore();
});