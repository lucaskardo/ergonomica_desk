//REGISTER AND CONTACT FORM
$(function(){
    $('#contactus-form').submit(function(e){
        e.preventDefault();
        var formdata = toJSONString(this);
        console.log(formdata);
        $.ajax({
            type: "POST",
            url: URL,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify( {"firstname": $('#firstname').val(), "lastname": $('#lastname').val(), "phone": $('#contact_phone').val(), "email": $('#contact_email').val(), "frame": $('#product_frame').val(), "finish": $('#product_finish').val(), "size": $('#product_size').val(), "qty": $('#product_qty').val(), "specs": $('#product_specs').val(), "desk": $('#product_model').val(), "type": $('#product_type').val()} ),
            beforeSend: function(data) {
                $('#contact-btn').prop('disabled', true);
                $('#contactus-form :input').prop('disabled', true);
                $('#contact-status').html('<i class="fa fa-refresh fa-spin"></i> Enviando...').show();
            },
            success: function(data) {
                console.log(data);
                $('#contact-status').text('Gracias por contactarnos.').show();
                $('#contactus-form :input').removeProp('disabled');
                $('#contact-btn').removeProp('disabled');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#contact-status').text('Error de envío.').show();
                $('#contactus-form :input').removeProp('disabled');
                $('#contact-btn').removeProp('disabled');
            }
        });
    }); 


    function toJSONString (form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for(var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;
      if(name) {
        obj[name] = value;
      }
        }
        return JSON.stringify(obj);
    }
});

$("select").on("change", function() {    
    if($('#product_type').val() == "custom"){
        $(".notshown").each(function() {
          $(this).removeClass("d-none");
        });
        $(".hideinput").each(function() {
          $(this).find('input').prop('required', true);
        });
        $('#model_options').addClass("d-none");
        $('.showinput').prop('required', false);  
    }
    else {
        $(".notshown").each(function() {
          $(this).addClass("d-none");
        });
        $(".hideinput").each(function() {
          $(this).find('input').prop('required', true);
        });
        $('#model_options').removeClass("d-none");
        $('.showinput').prop('required', false);
    }

});


