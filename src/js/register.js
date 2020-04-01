!function () {
    $('.btn_reg').on('click', function () {
        let $userName = $('.user_reg');
        let $passWord = $('.pass_reg');
        if ($userName.val() !== '' && $passWord.val() !== '') {
            $.ajax({
                url: `http://${location.hostname}/PHP/project/php/login.php`,
                // url: `http://${location.hostname}/php/login.php`,
                type: 'post',
                data: {
                    username: $userName.val(),
                    password: $passWord.val()
                }
            }).done(function (d) {
                if (d) { // 存在
                    location.href = '../../index.html';
                    jscookie.add('user', $userName.val(), 7)
                } else {
                    $userName.val('用户或者密码错误，请重新输入')
                    $userName.css('color', 'red');
                }
            })
        } else {
            $userName.val('用户和密码不能为空');
            $userName.css('color', 'red');

        }
        $userName.on('focus', function () {
            $userName.val('');
            $passWord.val('');
            $userName.css('color', '#000');

        })
    })
}()