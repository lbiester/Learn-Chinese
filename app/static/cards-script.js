$(document).ready(function() {
    var currentPos = 0;
    $('input').keydown(function(event){
        if (event.keyCode == 13) {
            if ($(this).val() == $(this).parent().parent().prev().html()) {
                correctInput($(this));
            } else {
                incorrectInput($(this));
            }
            event.preventDefault();
            return false;
        }
    });
    $('button.submit-answer').click(function() {
        input = $(this).parent().prev().children();
        if (input.val() == $(this).parent().parent().prev().html()) {
            correctInput(input);
        } else {
            incorrectInput(input);
        }
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
    })
    $('div.card-row#1').removeClass('invisible');
    $('div.card-row#1').addClass('active');
    correctInput = function(element) {
        element.parent().parent().parent().removeClass('wrong');
	    element.parent().parent().parent().addClass('correct');
        element.parent().parent().addClass('invisible');
        element.parent().parent().prev().removeClass('invisible');
    };
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
    activateButtons();
})
