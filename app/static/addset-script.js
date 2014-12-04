var table_row = '<tr><td><input name="input-word" class="form-control" \
    /></td><td></td><td></td><td></td><td><button class="btn btn-danger btn-100 remove-row" \
    type="button"><i class="fa fa-times"></i></button></td></tr>';
var error_message = '<div class="alert alert-danger" role="alert"> \
  <i class="fa fa-exclamation-circle"></i> \
  <span class="sr-only">Error:</span>';
chosen_words = [null, null, null, null, null];
$(document).ready(function() {
    $(window).keydown(function(event){
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
        else if (event.keyCode === 9) {
            event.preventDevault();
            return false;
        }
    });
    $('button.add-rows').click(function() {
        if ($('input[name="input-word"]').length === 1) {
            $('button.remove-row').removeClass('invisible');
            $('thead tr th:last').html("Remove Item");
        }
        for (var i = 0; i < 5; i++) {
            $('table#input-table tr:last').after(table_row);
            chosen_words.push(null);
            $('button.remove-row').click(function() {
                $(this).parent().parent().remove();
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
    $('button.submit').click(function() {
        var title = $('input.set-name').val();
        // client-side error handling
        $('div.alert').remove();
        var allEmpty = true;

        chosen_words.forEach(function(word) {
            if (word !== null) {
                allEmpty = false;
                return;
            }
        });
        if (allEmpty) {
            event.preventDefault();
            show_error('You cannot leave all fields blank');
            return;
        }
        if (title.trim() === "") {
            event.preventDefault();
            show_error('You must include a title');
            return;
        }

        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          url: $SCRIPT_ROOT + '/addset/',
          data: JSON.stringify({title: title, data: chosen_words}),
          success: function(data) {
              window.location.replace(data.url);
          },
          error: function(data) {
            show_error(data.responseJSON.error);
          },
          dataType: "json"
          });
    });
    ajax_input = function() {
      $('input[name="input-word"]').bind('blur', function() {
          input = $(this);
          if (input.val() !== "") {
              $.getJSON($SCRIPT_ROOT + '/words/',{
                data: input.val(),
                parameter: 'simplified',
                returnTypes: 'all'
            }, function(data) {
                if (data.error) {
                    define_table(input, '', '', '');
                    index = $('table#input-table tbody tr').index(input.parent().parent());
                    chosen_words[index] = null;
                } else {
                    define_table(input, data.traditional, data.pinyin, data.english);
                    index = $('table#input-table tbody tr').index(input.parent().parent());
                    chosen_words[index] = data.id;
                }
              });
          } else {
              define_table(input, '', '', '');
              index = $('table#input-table tbody tr').index(input.parent().parent());
              chosen_words[index] = null;
          }
          return false;
        });
    }
    
    show_error = function(message) {
        $('div.row:first').before(error_message + message + '</div>');
    }    

    define_table = function(input, traditional, pinyin, english) {
        input.parent().next().html(traditional);
        input.parent().next().next().html(pinyin);
        input.parent().next().next().next().html(english);
    }

    remove_rows = function(row) {
        index = $('table#input-table tbody tr').index($(row).parent().parent());
        chosen_words.splice(index, 1);
        $(row).parent().parent().remove();
        if ($('input[name="input-word"]').length === 1) {
            $('button.remove-row').addClass('invisible');
            $('thead tr th:last').html("");
        }
    }
    ajax_input();
    $('li#addset').addClass('active');
})
