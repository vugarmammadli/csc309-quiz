# CSC309 - Programming on the Web, Fall 2016

## Assignment 1: Building a CS quiz

The purpose of this assignment is to get some practice building an HTML web page with CSS for layout and style, and JavaScript to make it dynamic. You will do this by implementing several different types of interactive quiz questions.

### Introduction

There are four different type of questions to implement in this assignment:

* multiple choice with expanding answers,
* multiple choice with more than one selection,
* matching,
* re-arranging elements.

### Multiple choice with expanding answers

When the user selects one of the answer options, the corresponding explanation will appear immediately below their selected option.  After they have selected an answer, they will also see a button that will allow them to display all explanations.

The user's first answer will be recorded in the total score, but they can click on other answers and see individual explanations after their first selection. This question is worth one point.

### Multiple choice with more than one selection

The answer to this question requires that two words be selected.  The user should be given a "submit answer" button.

The possible responses given below the question in the text file `quiz_questions.txt` include two responses where the user will be allowed to revise their selection and resubmit their answer.

Again only the first complete response (two answers selected)  will contribute to the total score. (2 points)

### Matching

This question has two lists displayed side by side.  The user selects one from one column and one from the next column to pair them up.  The pairing can be indicated in a variety of ways.  The simplest is probably to label the first column with letters and then when the user clicks on the second column, you can label that selection with the letter from column 1.

This question will be scored out of 4, one half mark for each correct pairing.

The user can change answers until they have selected the final pairing.  At that point there should be an indication of which ones are correct.  They should still be able to see their selections as well as the correct answers.

### Re-arranging elements
In this question the user is asked to re-order the elements in the list. When this questions is displayed, the dates will not be shown to the user.  It should be obvious to the user (with instructions) how to rearrange the inventions from oldest to newest.

This question will also need a submit button.  After they have submitted their answer, display the dates.  If all the dates are in the correct order they get one point.

## Scoring

After each question is complete, a score for that question should be displayed.

A running score for the four questions should be updated each time the user completes a question.  When they have completed all four questions, an alert should be displayed with their final score.  There should also be an option to reset and start the whole quiz over again.

The running score should be displayed in the top right corner of the page (possibly as part of a title bar), and should always be kept visible as the page scrolls.

## Extra details

To get extra details about the specifications of the assignment, please read [Assignment Handout](Instructions.md).
