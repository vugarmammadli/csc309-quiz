"use strict";

var totalScore = 0; //the total score of the user
var currentScore = 0; //current score for each question
var numOfQuestionsAnswered = 0;

function question1() {
    var firstAttempt = 0;
    var previousAnswer;
    var q1score = 0;

    $("#q1 input[name='answer']").click(function() {

        $("#ferut").css("border", "4px solid #5acf51");
        var answer = $("#q1 input[name='answer']:checked").val();

        if (answer == "ferut" && firstAttempt == 0) {
            totalScore += 1;
            q1score = 1;
            endQuiz();
        }

        //display clicked answers explanation and hide other explanations.
        if (firstAttempt != 0) {
            $("#" + previousAnswer).attr('hidden', 'hidden');
            $("#" + answer).removeAttr('hidden');
            previousAnswer = answer;
        } else {
            $("#" + answer).removeAttr('hidden');
            previousAnswer = answer;
        }

        // display show all explanation button.
        $('#explanations').removeAttr('hidden');

        currentScore = q1score;

        // display score for this question
        $("#q1 .question_header_score span").text(currentScore);
        $("#q1 .question_header_score").css('display', 'inline-block');

        firstAttempt = 1;
        displayTotalScore();
    });

    // display all explanations for each answer.
    $("#show_explanation").one("click", function() {
        $('#q1 .answers ul li p:nth-child(2)').attr('hidden', 'hidden');
        $('#q1 .answers ul li p:nth-child(2)').toggle('show');
        $('#show_explanation').attr('disabled', true);
    });
}

function question2() {
    var answers = [];

    $('#submit_q2').click(function() {
        currentScore = 0;

        //get all selected answers
        $("#q2 input[name='answer']:checked").each(function() {
            answers.push($(this).val());
        });

        //check the length of answers and print appropriate messages
        if (answers.length > 2) {
            $('#q2 .message').text(
                "Only two words can be selected. Please try again."
            );
            answers = [];
        } else if (answers.length < 2) {
            $('#q2 .message').text(
                "Your answer is incomplete.  Please select another word."
            );
            answers = [];
        } else {
            //correct answers
            if (answers.indexOf('function') != -1 && answers.indexOf(
                    'variable') != -1) {
                $('#q2 .message').text(
                    "Yes!  It is hard to believe that words we take for granted in computing were once so new."
                );
                totalScore += 2;
                currentScore = 2;
                displayTotalScore();
            } else if (answers.indexOf('function') != -1 || answers.indexOf(
                    'variable') != -1) {
                if (answers[0] == "function" || answers[0] ==
                    "variable")
                    $('#q2 .message').text("Incorrect: You picked " +
                        answers[0] + " correctly, but " + answers[1] +
                        " is one of the words that Professors Gotlieb and Hume got credit for."
                    );
                else if (answers[1] == "function" || answers[1] ==
                    "variable")
                    $('#q2 .message').text("Incorrect: You picked " +
                        answers[1] + " correctly, but " + answers[0] +
                        " is one of the words that Professors Gotlieb and Hume got credit for."
                    );
            } else
                $('#q2 .message').text(
                    "Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED."
                );

            // display score for this question
            $("#q2 .question_header_score span").text(currentScore);
            $("#q2 .question_header_score").css('display',
                'inline-block');

            $('#submit_q2').attr('disabled', true);
            endQuiz();
        }
    });
}

function question3() {
    var profName;
    var claim;
    var selectedPairs = {};
    var allProfs = [];

    //gets all professor's names
    $('.q3_list td:first-child').each(function() {
        allProfs.push($(this).attr('class'));
    });

    //matching selected professor and selected claim
    $('.q3_list td:first-child').click(function() {
        profName = $(this).attr('class');
        $('.q3_list td:last-child').click(function() {
            claim = $(this).attr('class');
            $("." + claim + " span.user_choice").text($('.' +
                profName).text());
            selectedPairs[claim] = profName;
            //enables submit button if all matches are done.
            if (Object.keys(selectedPairs).length == allProfs.length)
                $('#submit_q3').removeAttr('disabled');
            profName = "";
            claim = "";
        });
    });

    //submit button for checking answers
    $('#submit_q3').click(function() {
        currentScore = 0;
        for (let pair in selectedPairs) {
            if (pair.indexOf(selectedPairs[pair]) == -1) {
                for (let p in allProfs) {
                    if (pair.indexOf(allProfs[p]) != -1) {
                        $('.' + pair + " span.correct_answer").append(
                            " (Correct answer: " + $('.' + allProfs[
                                p]).text() + ")");
                    }
                }
            } else {
                currentScore += 0.5;
            }
        }
        $('#submit_q3').attr('disabled', 'disabled');
        // display score for this question
        $("#q3 .question_header_score span").text(currentScore);
        $("#q3 .question_header_score").css('display', 'inline-block');
        totalScore += currentScore;
        displayTotalScore();
        endQuiz();
    });


}

function question4() {

    //Some codes are taken from https://www.html5rocks.com/en/tutorials/dnd/basics/
    var dragSource;
    var allColumns = $('#q4 .answers .column');

    function handleDragStart(e) {
        // this / e.target is the source node.
        $(this).css('opacity', '0.4');
        dragSource = $(this);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault)
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

    //corect sequence of answers
    var answers = {
        'col2': '1971',
        'col7': '1967',
        'col3': '1957',
        'col4': '1953',
        'col5': '1951',
        'col1': '1940',
        'col6': '1841'
    };

    $('#submit_q4').click(function() {
        currentScore = 0;
        var submittedAnswers = [];
        var numberOfWrongAnswers = 0;

        //get answers of users
        $('#q4 .answers').find("div").each(function() {
            submittedAnswers.push(this.id);
        })

        for (let i = 0; i < submittedAnswers.length; i++) {
            // define correct and wrong aswers
            if (submittedAnswers[i] != Object.keys(answers)[i]) {
                $("#q4 .answers #" + submittedAnswers[i]).css(
                    'box-shadow', 'inset 0 0 5px #cf5151');
                numberOfWrongAnswers++;
            } else {
                $("#q4 .answers #" + submittedAnswers[i]).css(
                    'box-shadow', 'inset 0 0 5px #029b17');
            }

            $("#q4 .answers #" + submittedAnswers[i] +
                " span.correct_answer").text(" (" + answers[
                submittedAnswers[i]] + ")");
        }

        if (numberOfWrongAnswers == 0) {
            $("#q4 .message").text(
                "You arranged it correctly. Congratulations!");
            currentScore = 1;
            totalScore += 1;
            displayTotalScore();
        } else {
            $("#q4 .message").text(
                "You did not arrange all of them correctly. Sorry :("
            );
        }

        $("#q4 .question_header_score span").text(currentScore);
        $("#q4 .question_header_score").css('display', 'inline-block');
        $('#submit_q4').attr('disabled', true);
        endQuiz();
    });

}

function pagination() {
    var prevQuestion = 1;
    var nextQuestion = 1;

    // disable previous button at the beginning
    $('.prev').css('cursor', 'not-allowed');

    $('.next').click(function() {
        if (nextQuestion != 4) {
            prevQuestion = nextQuestion;
            nextQuestion++;
            $("#q" + prevQuestion).attr('style', "display: none");
            $("#q" + nextQuestion).removeAttr('style');
        }

        // disable next button at the end
        if (nextQuestion == 4)
            $('.next').css('cursor', 'not-allowed');

        $('.question_header_text span').text(nextQuestion);
        $('.prev').css('cursor', 'pointer');
    });

    $('.prev').click(function() {
        if (prevQuestion != 0) {
            nextQuestion = prevQuestion;
            prevQuestion--;
            $("#q" + (nextQuestion + 1)).attr('style', "display: none");
            $("#q" + nextQuestion).removeAttr('style');
        }

        if (prevQuestion == 0) {
            $('.prev').css('cursor', 'not-allowed');
        }

        $('.question_header_text span').text(nextQuestion);
        $('.next').css('cursor', 'pointer');
    });
}

function reset() {
    $('#reset_quiz').click(function() {
        location.reload();
    });
}

function displayTotalScore() {
    $('#score').text(totalScore);
}

function endQuiz() {
    numOfQuestionsAnswered++;

    //enable result button if all questions are answered.
    if (numOfQuestionsAnswered == 5) {
        $('.show_result').removeAttr('style');
        alert("Quiz finished. Total score: " + totalScore);
    }

    $('.show_result').click(function() {
        //display result window and hide others
        $('.show_result').css('display', 'none');
        $('#q1').css('display', 'none');
        $('#q2').css('display', 'none');
        $('#q3').css('display', 'none');
        $('#q4').css('display', 'none');
        $('#final').removeAttr('style');
        $('.tasks').css('display', 'none');

        //get points for each answer
        $('#q1score span.correct_answer').text($(
            "#q1 .question_header_score span").text());
        $('#q2score span.correct_answer').text($(
            "#q2 .question_header_score span").text());
        $('#q3score span.correct_answer').text($(
            "#q3 .question_header_score span").text());
        $('#q4score span.correct_answer').text($(
            "#q4 .question_header_score span").text());
        $('#finalscore span.correct_answer').text(totalScore);

        $('.question_header_text').text("Thank you!");
    });

    $('#start_again').click(function() {
        location.reload();
    });
}

$(document).ready(function() {
    question1();
    question2();
    question3();
    question4();
    pagination();
    reset();
    endQuiz();
    displayTotalScore();
});