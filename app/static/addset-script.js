var table_row = '<tr><td><input name="input-word" class="form-control" /></td><td></td><td></td><td></td><td><button class="btn btn-danger btn-100 remove-row" type="button"><i class="fa fa-times"></i></button></td></tr>';
var error_message = '<div class="alert alert-danger" role="alert"> \
  <i class="fa fa-exclamation-circle"></i> \
  <span class="sr-only">Error:</span>'
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
        if ($('input[name="input-word"]').length == 1) {
            $('button.remove-row').removeClass('invisible');
            $('thead tr th:last').html("Remove Item");
        }
        for (var i = 0; i < 5; i++) {
            $('table#input-table tr:last').after(table_row);
            $('button.remove-row').click(function() {
                $(this).parent().parent().remove()
            });
            ajax_input();
        }
        $('button.remove-row').click(function() {
            remove_rows(this);
        });
    });
    $('button.remove-row').click(function() {
        remove_rows(this);
    });
    $('button[type="submit"]').click(function() {
        $('div.alert').remove();
        var allEmpty = true;
        $('input[name="input-word"]').each(function() {
            if ($(this).val() !== "") {
                allEmpty = false;
                return;
            }
        });
        if (allEmpty) {
            event.preventDefault();
            $('div.row:first').before(error_message + 'You cannot leave all fields blank</div>');
            return;
        }
        if ($('input.set-name').val().trim() === "") {
            event.preventDefault();
            $('div.row:first').before(error_message + 'You must include a title</div>');
        }
    });
    ajax_input = function() {
      $('input[name="input-word"]').bind('blur', function() {
          input = $(this);
          if (input.val() !== "") {
              $.getJSON($SCRIPT_ROOT + '/words/' + input.val(), function(data) {
                input.parent().next().html(data.traditional);
                input.parent().next().next().html(data.pinyin);
                input.parent().next().next().next().html(data.english);
              });
          }
          return false;
        });
    };
    remove_rows = function(row) {
        $(row).parent().parent().remove();
        if ($('input[name="input-word"]').length == 1) {
            $('button.remove-row').addClass('invisible');
            $('thead tr th:last').html("");
        }
    }
    ajax_input();
    $('li#addset').addClass('active');
})
