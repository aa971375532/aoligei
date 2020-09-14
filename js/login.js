$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '俩次密码不一样';
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        e.preventDefault();
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            $('#link-login').click();
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function(reg) {
            if (reg.status !== 0) {
                return layer.msg('登录失败');
            }
            layer.msg('登录成功');
            localStorage.setItem('token', reg.token);
            location.href = 'index.html'
        })
    })
})