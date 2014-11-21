$(document).ready(function() {

    // event listeners
    $('input').keydown(function(event){
        if (event.keyCode == 13) {
            checkInput($(this));
            event.preventDefault();
            return false;
        }
    });

    $('button.submit-answer').click(function() {
        input = $(this).parent().prev().children();
        checkInput(input);
    });

    $('button.reveal-answer').click(function() {
        input = $(this).parent().prev().children();
        iffyInput(input);
    });

    $('button#next-card').click(function() {
        var next = $('div.card-row.active').next();
        $('div.card-row.active').addClass('invisible');
        $('div.card-row.active').removeClass('active');
        next.removeClass('invisible');
        next.addClass('active');
        activateButtons();
    });

    $('button#prev-card').click(function() {
        var prev = $('div.card-row.active').prev();
        $('div.card-row.active').addClass('invisible');
        $('div.card-row.active').removeClass('active');
        prev.removeClass('invisible');
        prev.addClass('active');
        activateButtons();
    });

    $('button#revealAll').click(function() {
        var traditional = $('div.card-row.active div#traditional');
        var pinyin = $('div.card-row.active div#pinyin');
        var english = $('div.card-row.active div#english');

        if (!(traditional).hasClass('correct')) {
            traditional.removeClass('wrong');
            traditional.addClass('iffy');
            traditional.children().first().removeClass('invisible');
            traditional.children().first().next().addClass('invisible');
        }
        if (!(pinyin).hasClass('correct')) {
            pinyin.removeClass('wrong');
            pinyin.addClass('iffy');
            pinyin.children().first().removeClass('invisible');
            pinyin.children().first().next().addClass('invisible');
        }
        if (!(english).hasClass('correct')) {
            english.removeClass('wrong');
            english.addClass('iffy');
            english.children().first().removeClass('invisible');
            english.children().first().next().addClass('invisible');
        }
    });


    // jQuery helper functions
    checkInput = function(element) {
        type = element.parent().parent().parent().attr('id');
        correctResponse = element.parent().parent().prev().html();
        // perform special check on english words, so that it is possible to get it right
        if (type != 'english') {
            if (element.val() === correctResponse) {
                correctInput(element);
            } else {
                incorrectInput(element);
            }
        } else {
            if (englishInputCheck(element.val().trim().toLowerCase(), correctResponse.trim().toLowerCase())) {
                correctInput(element);
            } else {
                incorrectInput(element);
            }
        }
    }

    englishInputCheck = function(input, correctAnswer) {
        // normalize input, split into array
        correctAnswer = removeNonAlphaNum(correctAnswer).split(" ");
        input = removeNonAlphaNum(input).split(" ");

        // require perfect answer if answer is short
        if (correctAnswer.length <= 2) {
            if (correctAnswer.sort().join(" ") === input.sort().join(" ")) {
                return true;
            } return false;
        }

        // do not allow very short answers for longer definitions
        if (input.length < 2) {
            return false;
        }

        // check if all words in input are in definition
        for (var i = 0; i < input.length; i++) {
            if (correctAnswer.indexOf(input[i]) == -1) {
                return false;
            }
        }
        return true;
    }

    removeNonAlphaNum = function(string) {
        newString = "";

        // keep characters necessary for words
        for (var i = 0; i < string.length; i++) {
            chr = string.charCodeAt(i);
            if ((97 <= chr && chr <= 122) || (48 <= chr && chr <= 57)
                || chr === 45 || chr === 39 ) {
                newString += string[i];
            } else if (chr === 32) {
                // does not allow two spaces in a row
                if (string.charCodeAt(i - 1) != 32) {
                    newString += string[i];
                }
            } else if (chr == 47) {
                // replace "/" with " "
                newString += " ";
            }
        }
        return newString;
    }

    correctInput = function(element) {
        element.parent().parent().parent().removeClass('wrong');
	    element.parent().parent().parent().addClass('correct');
        element.parent().parent().addClass('invisible');
        element.parent().parent().prev().removeClass('invisible');
    }

    iffyInput = function(element) {
        element.parent().parent().parent().removeClass('wrong');
        element.parent().parent().parent().addClass('iffy');
        element.parent().parent().addClass('invisible');
        element.parent().parent().prev().removeClass('invisible');
    }

    incorrectInput = function(element) {
        element.parent().parent().parent().addClass('wrong');
    }

    activateButtons = function() {
        if ($('div.card-row.active').attr('id') == 1) {
            $('button#prev-card').attr('disabled', 'disabled');
        } else {
            $('button#prev-card').removeAttr('disabled');
        }
        if ($('div.card-row.active').attr('id') == $('div.card-row').length) {
            $('button#next-card').attr('disabled', 'disabled');
        } else {
            $('button#next-card').removeAttr('disabled');
        }
    }


    // function calls on page load
    $('div.card-row#1').removeClass('invisible');
    $('div.card-row#1').addClass('active');
    activateButtons();
})
