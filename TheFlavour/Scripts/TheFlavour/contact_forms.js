var _form;
var _captcha_arr = [];
var _theme_index = tf_script.TF_THEME_PREFIX;
jQuery(document).ready(function () {
    $("#Email").on("click", function () {
        $(this).css('borderColor', 'black');
    });
    jQuery('.contactForm .btn-submit').click(function () {
        _form = jQuery(this).closest('form');

    })
    jQuery('.contactForm').each(function () {
        var _id = jQuery(this).find('#this_form_id').val();
        jQuery(this).ajaxForm({
            type: "POST",
            url: window.location.href,
            dataType: 'json',
            data: { form_id: _id },
            beforeSubmit: check_fields,
            success: function (isSent, statusText, xhr) {
                if (isSent != 1) {
                    $("#Email").css('borderColor', 'red');
                } else {
                    showSuccessMessage("Thank you, we will answer you soon!");
                }
            }
        });
    });
    jQuery('.tfuse_captcha_reload').live('click', function (event) {
        _form = jQuery(this).closest('form');
        _captcha = _form.find('.tfuse_captcha_img');
        _captcha_src = _captcha.attr('src');
        _url = _captcha_src.split('&');
        _r = _url[_url.length - 1].split('=');
        if (_r[0] == 'time')
            _url.pop(_url[_url.length - 1]);
        _url = _url.join('&');
        _captcha.attr('src', _url + '&time=' + event.timeStamp);
    });
});


function showErrorMessage(textMessage) {
    _messages = _form.closest('.contact-form').find('.submit_message');
    _message = _messages.html('<h2>' + textMessage + '</h2>').addClass('error_submiting_form').show();
    _form.hide();
}
function showSuccessMessage(textMessage) {
    _messages = _form.closest('.contact-form').find('.submit_message');
    _message = _messages.html('<h2>' + textMessage + '</h2>').addClass('success_submited_form').show();
    _form.hide();
}
function check_fields() {
    _return_val = true;
    if (_form.find('.' + _theme_index + '_email').length > 0) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        _form.find('.' + _theme_index + '_email').each(function () {
            if (!pattern.test(jQuery(this).val())) {
                _return_val = false;
                jQuery(this).css('borderColor', 'red');
            } else {
                jQuery(this).css('borderColor', '#ccc');
            }
        });
    }

    if (_return_val) {
        _form.find('#submit').hide();
        _form.closest('.contact-form').find('#header_message').hide();
        _form.find('.sending,#sending_img').css('display', 'inline-block');
    }
    return _return_val;
}
function resetFields(obj, evt) {
    evt.preventDefault();
    _form = jQuery(obj).closest('form');
    _form.get(0).reset();
    return false;
}