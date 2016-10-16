"use strict";

var totalScore = 0; //the total score of the user

function question1() {
  var firstAttempt = 0;
  var previousAnswer;
  
  $("#q1 input[name='answer']").click(function(){
    var answer = $("#q1 input[name='answer']:checked").val();
    
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
    $('#q1 .answers ul li p:nth-child(2)').attr('hidden', 'hidden');
    $('#q1 .answers ul li p:nth-child(2)').toggle('show');
    $('#show_explanation').attr('disabled', true);
  });
}

function question2(){
  var answers = [];
  $('#submit_q2').click(function(){
    $("#q2 input[name='answer']:checked").each(function(){
      answers.push($(this).val());
    });
    
    if(answers.length > 2){
     $('#message').text("Only two words can be selected. Please try again.");
      answers = [];
    } else if(answers.length < 2){
      $('#message').text("Your answer is incomplete.  Please select another word.");
      answers = [];
    } else{
      if(answers.indexOf('function') != -1 && answers.indexOf('variable') != -1){
        $('#message').text("Yes!  It is hard to believe that words we take for granted in computing were once so new.");
        totalScore += 2;
        displayTotalScore();
      } else if(answers.indexOf('function') != -1 || answers.indexOf('variable') != -1){
        if(answers[0] == "function" || answers[0] == "variable")
          $('#message').text("Incorrect: You picked " + answers[0] + " correctly, but " + answers[1] + " is one of the words that Professors Gotlieb and Hume got credit for.");
        else if(answers[1] == "function" || answers[1] == "variable")
          $('#message').text("Incorrect: You picked " + answers[1] + " correctly, but " + answers[0] + " is one of the words that Professors Gotlieb and Hume got credit for.");
      } else
        $('#message').text("Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED.");
      
      $('#submit_q2').attr('disabled', true);
    }
  });
}

function question3(){
  var profName;
  var claim;
  var selectedPairs = {};
  var allProfs = [];
  
  //gets all professor's names
  $('.q3_list td:first-child').each(function() {
    allProfs.push($(this).attr('class'));
  });
  
  //matching selected professor and selected claim
  $('.q3_list td:first-child').click(function(){
    profName = $(this).attr('class');
    $('.q3_list td:last-child').click(function(){
      claim = $(this).attr('class');
      $("." + claim + " span").text($('.' + profName).text());
      selectedPairs[claim] = profName;
      //enables submit button if all matches are done.
      if(Object.keys(selectedPairs).length == allProfs.length)
        $('#submit_q3').removeAttr('disabled');
      profName = "";
      claim = "";
    });
  });
  
//  $('.q3_list td:last-child').click(function(){
//    claim = $(this).attr('class');
//    $('.q3_list td:first-child').click(function(){
//      profName = $(this).attr('class');
//      $("." + claim + " span").text($('.' + profName).text());
//      selectedPairs[profName] = claim;
//      profName = "";
//      claim = "";
//    });
//  });
  
  //submit button for checking answers
  $('#submit_q3').click(function(){
    for(let pair in selectedPairs){
      if(pair.indexOf(selectedPairs[pair]) == -1){
        for(let p in allProfs){
          if(pair.indexOf(allProfs[p]) != -1){
            $('.' + pair).append(" (Correct answer: " + $('.' + allProfs[p]).text() + ")");
          }
        }
      }else{
        totalScore += 0.5;
        displayTotalScore();
      }
    }
  });
  
  
}

function displayTotalScore(){
  $('#score').text(totalScore);
}

$(document).ready(function () {
  question1();
  question2();
  question3();
  displayTotalScore();
});