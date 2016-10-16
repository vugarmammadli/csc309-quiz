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

function question4(){
  
  //Some codes are taken from https://www.html5rocks.com/en/tutorials/dnd/basics/
  var dragSource;
  var allColumns = $('#q4 .answers .column');
  
  function handleDragStart(e){
    // this / e.target is the source node.
    $(this).css('opacity', '0.4');
    
    dragSource = $(this);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  function handleDragOver(e){
    if(e.preventDefault)
      e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  
  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    $(this).addClass('over');
  }
  
  function handleDragLeave(e) {
    // this / e.target is previous target element.
    $(this).removeClass('over');
  }
  
  function handleDrop(e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    // Don't do anything if dropping the same column we're dragging.
    if (dragSource != $(this)) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      dragSource.html($(this).html());
      $(this).html(e.dataTransfer.getData('text/html'));
      // Change ids of replaced choices
      var itemToChangeId = $(this).attr('id');
      var itemReplaced = dragSource.attr('id');
      $(this).attr('id', itemReplaced);
      dragSource.attr('id', itemToChangeId);
    }
    
    return false;
  }
  
  function handleDragEnd(e) {
    // this/e.target is the source node.

    allColumns.each(function(index, column) {
      $(column).removeClass('over');
    });
    
    $(this).css('opacity', '1.0');
  }
  
  allColumns.each(function(index, column) {
    column.addEventListener('dragstart', handleDragStart, false);
    column.addEventListener('dragenter', handleDragEnter, false);
    column.addEventListener('dragover', handleDragOver, false);
    column.addEventListener('dragleave', handleDragLeave, false);
    column.addEventListener('drop', handleDrop, false);
    column.addEventListener('dragend', handleDragEnd, false);
  });
  
}

function displayTotalScore(){
  $('#score').text(totalScore);
}

$(document).ready(function () {
  question1();
  question2();
  question3();
  question4();
  displayTotalScore();
});