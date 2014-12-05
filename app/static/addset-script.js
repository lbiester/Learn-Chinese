/*jshint multistr: true */

// initial variables
var table_row = '<tr><td><input name="input-word" class="form-control" \
    /></td><td></td><td></td><td></td><td><button class="btn btn-danger btn-100 remove-row" \
    type="button"><i class="fa fa-times"></i></button></td></tr>';
var error_message = '<div class="alert alert-danger" role="alert"> \
  <i class="fa fa-exclamation-circle"></i> \
  <span class="sr-only">Error:</span>';
var chosen_words = [null, null, null, null, null];
var input_row = null;
var valueSelected = false;

$(document).ready(function() {

    //event listneners
    $(window).keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
        if (event.keyCode === 9) {
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

        // perform POST of form data
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

    $('#wordModal').on('hidden.bs.modal', function() {
        if (valueSelected) {
            valueSelected = false;
        }
    });



    // jQuery helper functions
    var ajax_input = function() {
      $('input[name="input-word"]').bind('blur', function() {
          input = $(this);
          if (input.val() !== "") {
              $.getJSON($SCRIPT_ROOT + '/wordsMultiple/',{
                data: input.val(),
                parameter: 'simplified',
                returnTypes: 'all'
            }, function(data) {
                if (data.error) {
                    process_input(input, '', '', '', null);
                } else {
                    if (data.length === 1) {
                        data = data[0];
                        process_input(input, data.traditional, data.pinyin,
                            data.english, data.id);
                    } else {
                        input_row = input;
                        create_options(data);
                        $('#wordModal').modal('show');
                    }
                }
              });
          } else {
              process_input(input, '', '', '', null);
          }
          return false;
        });
    };


    var create_options = function(wordList) {
        $('table#selection-table tr').remove();
        $('span#wordModalTitleCharacter').html(wordList[0].simplified);
        wordList.forEach(function(word) {
            $('table#selection-table tbody').append(create_table_row(word));
        });
        $('button.btn-word-id').click(function() {
            valueSelected = true;
            $('#wordModal').modal('hide');
            // simplified = $('span#wordModalTitleCharacter').html();
            traditional = $(this).parent().prev().prev().prev().html();
            pinyin = $(this).parent().prev().prev().html();
            english = $(this).parent().prev().html();
            id = Number($(this).attr('id'));
            process_input(input_row, traditional, pinyin, english, id);
        });
    };


    var create_table_row = function(word) {
        return '<tr><td>' + word.traditional + '</td><td>' + word.pinyin + '</td><td>' +
            word.english + '</td><td><button class="btn btn-success btn-100 btn-word-id"' +
            'type="button" id="' + word.id + '"><i class="fa fa-check"></i></button></td></tr>';
    };


    var process_input = function(input, traditional, pinyin, english, id) {
        define_table(input, traditional, pinyin, english);
        index = $('table#input-table tbody tr').index(input.parent().parent());
        chosen_words[index] = id;
    };


    var show_error = function(message) {
        $('div.row:first').before(error_message + message + '</div>');
    };


    var define_table = function(input, traditional, pinyin, english) {
        input.parent().next().html(traditional);
        input.parent().next().next().html(pinyin);
        input.parent().next().next().next().html(english);
    };


    var remove_rows = function(row) {
        index = $('table#input-table tbody tr').index($(row).parent().parent());
        chosen_words.splice(index, 1);
        $(row).parent().parent().remove();
        if ($('input[name="input-word"]').length === 1) {
            $('button.remove-row').addClass('invisible');
            $('thead tr th:last').html("");
        }
    };



    // function calls on page load
    ajax_input();
    $('li#addset').addClass('active');
});
