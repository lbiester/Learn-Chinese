var table_row = '<tr><td><input name="input-word" class="form-control" /></td><td></td><td></td><td></td><td><button class="btn btn-danger btn-100 remove-row" type="button"><i class="fa fa-times"></i></button></td></tr>';
$(document).ready(function() {
    $(window).keydown(function(event){
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
        else if (event.keyCode == 9) {
            event.preventDevault();
            return false;
        }
    });
    $('button.add-rows').click(function() {
        for (var i = 0; i < 5; i++) {
            $('table#input-table tr:last').after(table_row);
            $('button.remove-row').click(function() {
                $(this).parent().parent().remove()
            });
            ajax_input();
        }
    });
    $('button.remove-row').click(function() {
        $(this).parent().parent().remove()
    });
    ajax_input = function() {
      $('input[name="input-word"]').bind('blur', function() {
          input = $(this);
          $.getJSON($SCRIPT_ROOT + '/words/' + input.val(), function(data) {
            input.parent().next().html(data.traditional);
            input.parent().next().next().html(data.pinyin);
            input.parent().next().next().next().html(data.english);
            console.log(input);
            console.log(data);
          });
          return false;
        });
    };
    ajax_input();
    $('li#addset').addClass('active');
})
