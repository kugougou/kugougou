!function () {
    // 获取cookie 渲染对应选择的商品
    // 获取全部的接口数据 判断取值
    function randererList(sid, num) {
        $.ajax({
            url: 'http://localhost/PHP/project/php/xiangqing.php',
            dataType: 'json'
        }).done(function (d) {
            let html = '';
            $.each(d, function (index, value) {
                if (sid == value.sid) {
                    //     html += `
                    // <div class="list_message cl">
                    //     <input type="checkbox" checked="checked" class="checkbox_catr checkbox_message">
                    //     <img src="${value.url}"
                    //     alt="">
                    //     <p class="comm_message">${value.title}</p>
                    //     <div class="pirce_message">
                    //         <i class="iconfont icon-qian"></i>${value.price}
                    //     </div>
                    //     <div class="btn_message">
                    //         <i class="iconfont icon-jianhao" id="leftBtn"></i>
                    //         <input type="text" value="${num}" id="inp_num">
                    //         <i class="iconfont icon-iconfontadd" id="rightBtn"></i>
                    //     </div>
                    //     <p class="figure_message">${value.price * num}</p>
                    //     <span class="handle_message">X</span>
                    // </div>

                    //     `
                    let $clonebox = $('.list_message:hidden').clone(true, true);//克隆隐藏元素
                    $clonebox.find('img').attr('src', value.url);  //地址
                    $clonebox.find('img').attr('sid', value.sid);  //sid
                    $clonebox.find('.comm_message').html(value.title); //标题
                    $clonebox.find('.pirce_message').html(value.price);//价格
                    $clonebox.find('.btn_message').find('input').val(num);//数量
                    $clonebox.find('.figure_message').html(value.price);// 金额
                    $clonebox.find('.figure_message').html((value.price * num).toFixed(2))
                    $clonebox.css('display', 'block');
                    $('.catrmessage').append($clonebox);
                }
            });
            calcprice();
        })
    };


    //获取cookie渲染数据
    if (jscookie.get('cookiesid') && (jscookie.get('cookienum'))) {
        let s = jscookie.get('cookiesid').split(',');
        let n = jscookie.get('cookienum').split(',');
        $.each(s, function (index, value) {
            randererList(s[index], n[index]);
        })
    }




    //计算总价 -- 封装的函数
    function calcprice() {
        let $count = 0;
        let $target = $('.message_w').find('.list_message');
        $target.each(function (index, elsem) {
            if ($(elsem).find(':checkbox').prop('checked')) {
                $count += parseFloat($(elsem).find('.figure_message').html());
            }
        });
        // console.log($target)
        $('.pirce_total').html($count);
    };

    //全选
    $('.checked_total').on('change', function () {
        $('.list_message:visible').find(':checkbox').prop('checked', $(this).prop('checked'));//让下面的复选框跟随着我这个全选框的状态。
        $('.checked_total').prop('checked', $(this).prop('checked'));
        calcprice();
    })

    //部分选者
    let $input = $('.list_message:visible').find(':checkbox');
    $('.catrmessage').on('change', $input, function () {
        // console.log($(this))
        if ($('.list_message:visible').find(':checkbox').size() === $('.list_message:visible').find('input:checked').size()) {
            $('.checked_total').prop('checked', true);
        } else {
            $('.checked_total').prop('checked', false);
        }
        calcprice();
    });

    //数量的改变
    $('#rightBtn').on('click', function () {
        // alert(123)
        let $num = $(this).parents('.list_message').find('.btn_message input').val();
        $num++;
        console.log($num)
        $(this).parents('.list_message').find('#inp_num').val($num);
        $(this).parents('.list_message').find('.figure_message').html(calcFigure($(this)))
        calcprice();
        setcookie($(this))
    })
    $("#inp_num").on('click', function () {
        let $reg = /^\d$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) {
            $(this).val(1);
        }
        $(this).parents('.list_message').find('.figure_message').html(calcFigure($(this)))
        calcprice();
        setcookie($(this))
    });
    $("#leftBtn").on('click', function () {
        let $num = $(this).parents('.list_message').find('.btn_message input').val();
        $num--;
        if ($num <= 1) {
            $num = 1;
        }
        $(this).parents('.list_message').find('#inp_num').val($num);
        $(this).parents('.list_message').find('.figure_message').html(calcFigure($(this)))
        calcprice();
        setcookie($(this))
    });


    //计算金额
    function calcFigure(obj) {
        let $figure = parseFloat(obj.parents('.list_message').find('.pirce_message').html());
        let $num = parseInt(obj.parents('.list_message').find('#inp_num').val());
        return $figure * $num
    };

    //将改变后的数量存放到cookie中
    let arrsid = [];//存储商品的编号。
    let arrnum = [];//存储商品的数量。
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');//获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = jscookie.get('cookienum').split(',');//获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    };

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.list_message').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.list_message').find('#inp_num').val();
        jscookie.add('cookienum', arrnum, 7);
    };



    //删除 -- 删除当前的sid  arrsid:存放sid的数组
    function delcookie(sid, arrsid) {
        let $index = -1;//删除的索引位置
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        jscookie.add('cookiesid', arrsid, 10);
        jscookie.add('cookienum', arrnum, 10);
    };

    $('.handle_message').on('click', function () {
        cookietoarray(); //取到 arrsid
        if (window.confirm('你确定删除?')) {
            $(this).parents('.list_message').remove();// 删除当项
            delcookie($(this).parents('.list_message').find('img').attr('sid'), arrsid);
            calcprice();//计算总价
        }
    });


    //购物车上的数字
    let cartNum = jscookie.get('num');
    if (cartNum >= 1) {
        $('.cart_num').show();
        $('.cart_num').html(cartNum);
    };




    //登入注册
    if (jscookie.get('user') !== undefined) {
        $('.mr_hear').hide();
        $('.cg_hear').show();
        $('#login_cg').html(jscookie.get('user'));
    } else {
        $('.mr_hear').show();
        $('.cg_hear').hide();
    }
    $('#tuichu').on('click', function () {
        $('.mr_hear').show();
        $('.cg_hear').hide();
        jscookie.del('user')
    });



    // 回到顶部
    $('.db_index').on('click', function () {
        $('html').animate({
            scrollTop: 0
        })
    });
}()
