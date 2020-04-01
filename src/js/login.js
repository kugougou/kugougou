!function () {
    let btn = true;
    const $user = $('.username');
    const $userSpan = $('.userSpan');
    // 用户聚焦时
    $user.on('focus', function () {
        $userSpan.html('请输入字母和数字3-16位');
        $userSpan.css('color', '#333');
    });
    //用户失去焦点
    $user.on('blur', function () {
        $.ajax({
            url: `http://${location.hostname}/PHP/project/php/res.php`,
            // url: `http://${location.hostname}/php/res.php`,

            data: {
                xingming: $user.val()
            },
            type: 'post'
        }).done(function (d) {
            if (!d) {//姓名不存在 可以注册
                let reg = /^[a-z0-9A-Z]{3,16}$/;
                console.log($user.val())
                if ($user.val() !== '') {
                    if (reg.test($user.val())) {
                        $userSpan.html('√');
                        $userSpan.css('color', 'green');
                        btn = true;

                    } else {
                        $userSpan.html('用户名输入错误');
                        $userSpan.css('color', 'red');
                        btn = false;
                    }
                } else {
                    $userSpan.html('用户名不能为空');
                    $userSpan.css('color', 'red');
                    btn = false;
                }
            } else {
                $userSpan.html('用户名已存在');
                $userSpan.css('color', 'red');
                btn = false;
            }
        });
    });


    const $pass = $('.password');
    const $passSpan = $('.passSpan');
    //密码聚焦
    $pass.on('focus', function () {
        $passSpan.html('请输入字母和数字6-18位');
        $passSpan.css('color', '#333');
        $pass.val('');
    });
    //密码文本改变
    $pass.on('input', function () {
        let sReg = /[0-9]/; //数字
        let xReg = /[a-z]/; //小写字母
        let dReg = /[A-Z]/; //大写字母
        let a = 0;
        let b = 0;
        let c = 0;

        if (sReg.test($pass.val())) {//如果有数字
            a = 1;
        }
        if (xReg.test($pass.val())) {//如果有小写字母
            b = 1;
        }
        if (dReg.test($pass.val())) {//如果有大写字母
            c = 1;
        }
        let sum = a + b + c;
        if (sum == 1) {
            $passSpan.html('弱');
            $passSpan.css('color', 'red');
        }
        if (sum == 2) {
            $passSpan.html('中');
            $passSpan.css('color', 'green')
        }
        if (sum == 3) {
            $passSpan.html('强');
            $passSpan.css('color', 'green')
        }


        //密码失去焦点
        $pass.on('blur', function () {
            let reg = /^[a-z0-9A-Z]{6,18}$/; //密码的正则
            if ($pass.val() !== '') {
                if (reg.test($pass.val())) {
                    $passSpan.html('√');
                    $passSpan.css('color', 'green');
                    btn = true;
                } else {
                    // alert(123)
                    $passSpan.html('密码输入错误请重新输入');
                    $passSpan.css('color', 'red');
                    // $pass.val('');
                    btn = false;
                }
            } else {
                $passSpan.html('密码不能为空');
                $passSpan.css('color', 'red');
                btn = false;
            }
        });
    });

    //确认密码
    const $afPass = $('.affirm');
    const $afSpan = $('.amSpan');
    //确认密码失去焦点
    $afPass.on('blur', function () {

        if ($afPass !== '') {
            if ($afPass.val() === $pass.val()) {
                $afSpan.html('√');
                $afSpan.css('color', 'green');
                btn = true;
            } else {
                $afSpan.html('输入有误请，请重新输入密码');
                $afSpan.css('color', 'red');
                $afPass.val('');
                btn = false;
            }
        } else {
            $afSpan.html('确认密码不能为空');
            $afSpan.css('red');
            btn = false;
        }

    });

    //验证码
    const vCode = $('.vCode');
    const yzmSpan = $('#yzm');  //验证码
    authCode();
    yzmSpan.on('click', function () {
        authCode();
        yzmSpan.css('color', '#333');
    });
    //失去焦点
    vCode.on('blur', function () {
        // console.log(yzmSpan.html());
        // console.log(444);
        if (vCode.val() !== '') {
            if (vCode.val() === yzmSpan.html()) {
                yzmSpan.html('√');
                yzmSpan.css('color', 'green');
                btn = true;
            } else {
                yzmSpan.html('验证码错误');
                yzmSpan.css('color', 'red');
                btn = false;
            }
        } 
        // else {
        //     yzmSpan.html('验证码不能为空');
        //     yzmSpan.css('color', 'red');
        //     btn = false;
        // }
    });
    vCode.on('focus', function () {
        if (yzmSpan.html() === '验证码错误') {
            vCode.val('');
            yzmSpan.css('color', '#333');
            authCode();
        };
    });
    function authCode() {//验证码的函数
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let res = '';
        for (let i = 0; i < 4; i++) {
            res += arr[parseInt(Math.random() * arr.length)]
        };
        return yzmSpan.html(res);
    };
    //提交表单

    const form = $('.yh_login form');
    form.on('submit', function () {
        if ($user.val() === '' && $pass.val() === '' && vCode.val() === '') {
            $userSpan.html('用户名不能为空');
            $userSpan.css('color', 'red');
            $passSpan.html('密码不能为空');
            $passSpan.css('color', 'red');
            yzmSpan.html('验证码不能为空');
            yzmSpan.css('color', 'red');
            btn = false;
        };
        if (!btn) {
            return false;//阻止跳转。
        }
    })
}();