$(document).ready(function() {
    var currentPos = 0;
    $('input').keydown(function(event){
        if (event.keyCode == 13) {
            if ($(this).val() == $(this).parent().parent().prev().html()) {
                correctInput($(this));
            } else {
                incorrectInput($(this));
            }
            console.log(this);
            console.log('hello');
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
        $('div.card-row:nth-child(' + currentPos + ')').addClass('invisible');
        currentPos++;
        $('div.card-row:nth-child(' + currentPos + ')').removeClass('invisible');
        // if (currentPos == $('div.card-row').length - 1) {
        //      $("button#next-card").attr("disabled", "disabled");
        // } else {
        //     $("button#next-card").removeAttr("disabled");
        // }
    });
    $('button#prev-card').click(function() {
        $('div.card-row:nth-child(' + currentPos + ')').addClass('invisible');
        currentPos--;
        $('div.card-row:nth-child(' + prev_card + ')').removeClass('invisible');
    })
    $('div.card-row:first').removeClass('invisible');
    correctInput = function(element) {
        element.parent().parent().parent().addClass('correct');
        element.parent().parent().addClass('invisible');
        element.parent().parent().prev().removeClass('invisible');
        console.log('correct');
    };
    iffyInput = function(element) {
        element.parent().parent().parent().removeClass('wrong');
        element.parent().parent().parent().addClass('iffy');
        element.parent().parent().addClass('invisible');
        element.parent().parent().prev().removeClass('invisible');
    }
    incorrectInput = function(element) {
        element.parent().parent().parent().addClass('wrong');
        console.log('wrong');
    }

})
