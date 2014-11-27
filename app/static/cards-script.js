$(document).ready(function() {

    // event listeners
    $('input').keydown(function(event){
        if (event.keyCode == 13) {
            getAnswer($(this));
            event.preventDefault();
            return false;
        }
    });

    $('input[name="start"]').click(function() {
        console.log($(this).attr('id'));
    });

    $('div.test-on input').click(function() {
        // reset last card (css) and make nothing currently disabled
        $('div.card').removeClass('currentLast');
        $('div.test-on input').removeAttr('disabled');

        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            $('div#' + id).removeClass('invisible');
        } else {
            $('div#' + id).addClass('invisible');
        }
        $('div.card-row').each(function() {
            $(this).children().children(':not(.invisible)').last().addClass('currentLast');
        })
        if ($('div.card-row.active div div.card:not(.invisible)').length < 3) {
            $('div.test-on input:checked').attr('disabled', 'disabled');
        }
    });

    $('button.submit-answer').click(function() {
        input = $(this).parent().prev().children();
        getAnswer(input, false);
    });

    $('button.reveal-answer').click(function() {
        input = $(this).parent().prev().children();
        getAnswer(input, true);
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
        var traditional = $('div.card-row.active div#traditional .btn:first');
        var pinyin = $('div.card-row.active div#pinyin .btn:first');
        var english = $('div.card-row.active div#english .btn:first');

        if (!(traditional).hasClass('correct')) {
            getAnswer(traditional, true);
        }
        if (!(pinyin).hasClass('correct')) {
            getAnswer(pinyin, true);        }
        if (!(english).hasClass('correct')) {
            getAnswer(english, true);        }
    });


    // jQuery helper functions
    getAnswer = function(element, reveal) {
        console.log("REVEAL " + reveal);
        var type = element.parent().parent().parent().attr('id');
        var wordId = element.parent().parent().parent().parent().attr('id');

        $.getJSON($SCRIPT_ROOT + '/words/',{
            data: wordId,
            parameter: 'id',
            returnTypes: type
        }, function(data) {
            if (reveal) {
                iffyInput(element, type, data.word);
            } else {
                checkAnswer(element, type, data.word);
            }
        });
    }

    checkAnswer = function(element, type, correctResponse) {
        // perform special check on english words, so that it is possible to get it right
        if (type != 'english') {
            if (element.val().toLowerCase() === correctResponse.toLowerCase()) {
                correctInput(element, type, correctResponse);
            } else {
                incorrectInput(element);
            }
        } else {
            if (englishInputCheck(element.val().trim().toLowerCase(), correctResponse.trim().toLowerCase())) {
                correctInput(element, type, correctResponse);
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

    correctInput = function(element, type, correctResponse) {
        element.parent().parent().parent().removeClass('wrong');
	    element.parent().parent().parent().addClass('correct');
        console.log(element.parent().parent());
        if (type === 'english') {
            element.parent().parent().html('<div class="col-xs-12"><p>'
                + correctResponse + '</p></div>');
        } else {
            element.parent().parent().html('<div class="col-xs-12"><h1>'
                + correctResponse + '</h1></div>');
        }
    }

    iffyInput = function(element, type, correctResponse) {
        element.parent().parent().parent().removeClass('wrong');
        element.parent().parent().parent().addClass('iffy');
        if (type === 'english') {
            element.parent().parent().html('<div class="col-xs-12"><p>'
                + correctResponse + '</p></div>');
        } else {
            element.parent().parent().html('<div class="col-xs-12"><h1>'
                + correctResponse + '</h1></div>');
        }
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
