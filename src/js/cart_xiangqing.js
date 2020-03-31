
!function ($) {
    //获取到列表页传来的 sid
    let $sid = location.search.substring(1).split('=')[1]; //1
    // console.log(sid); //["sid", "1"]
    if (!$sid) {
        $sid = 1;
    }
    //根据传来的sid给后端查找相应的图
    $.ajax({
        url: 'http://localhost/PHP/project/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) {
        // console.log(d);
        let aa = d.urlarr.split(',');
        // console.log(aa);

        //渲染的小图
        $('#xt').attr('src', aa[0]);
        $('#xt').attr('sidurl', d.sid);


        //渲染的ul li
        let html = '';
        $.each(aa, function (index, value) {
            html += `
            <li>
                <img src="${aa[index]}" alt="">
            </li>
            `
        })
        $('.you_para ul').append(html);

        //渲染的标题 价格
        $('.xr_para h3').html(d.title);
        $('.xr_para .piac1').html(d.price);

        //渲染的套餐
        $('.meal_para a').html(d.title);

        $('#dt').attr('src', aa[0])


        //放大镜
        const xt = $('.zuo_para');//小图
        const xf = $('.xf_para'); //小放
        const df = $('#bf'); //大放
        const dt = $('#dt'); //大图
        const btnLi = $('.you_para ul');

        xt.hover(function (ev) {//鼠标移入
            xf.css('visibility', 'visible');
            df.css('visibility', 'visible');

            //小放的width 和 height 
            // 小放/大放 = 小图/大图
            xf.width(df.width() * xt.width() / dt.width());
            xf.height(df.height() * xt.height() / dt.height());
            let bili = dt.width() / xt.width();
            // let leftValue = 

            xt.on('mousemove', function (ev) {
                // console.log(777)
                let $leftValue = ev.pageX - xt.offset().left - xf.width() / 2;
                let $topValue = ev.pageY - xt.offset().top - xf.height() / 2;
                if ($leftValue < 0) {
                    $leftValue = 0;
                } else if ($leftValue > xt.width() - xf.width()) {
                    $leftValue = xt.width() - xf.width();
                }
                if ($topValue < 0) {
                    $topValue = 0;
                } else if ($topValue > xt.height() - xf.height()) {
                    $topValue = xt.height() - xf.height();
                }
                xf.css({
                    left: $leftValue,
                    top: $topValue
                });
                dt.css({
                    left: -$leftValue * bili,
                    top: -$topValue * bili
                });
            })
        }, function () {//鼠标移除
            xf.css('visibility', 'hidden');
            df.css('visibility', 'hidden');
        });
        btnLi.on('click', 'li', function () {
            let imgSrc = $(this).find('img').attr('src');
            xt.find('img').attr('src', imgSrc);
            df.find('img').attr('src', imgSrc);
        });
    });




    //点击购物测存储 sid  和  num(商品数量)
    const $num = $('#inp_num');
    const $leftBtn = $('.icon-jianhao'); // 左边的减号
    const $rightBtn = $('.icon-iconfontadd'); // 右边的加号
    let numVaule = 1;
    $num.val(numVaule);
    $rightBtn.on('click', function () {
        numVaule = $num.val();
        numVaule++;
        $num.val(numVaule);
    });

    $leftBtn.on('click', function () {
        numVaule = $num.val();
        numVaule--;
        if (numVaule <= 1) {
            numVaule = 1
        }
        $num.val(numVaule);
    });



    let arrsid = []; // 存储 商品的编号 - sid
    let arrnum = []; // 存储 商品的数量 - $num

    function cookiearr() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',');//获取到cookie里面的sid
            arrnum = jscookie.get('cookienum').split(',');//获取到cookie里面的num
        } else {
            arrsid = [];
            arrnum = [];
        }

    }


    //点击加入购物车
    let cart_num = null;
    $('#cart_join').on('click', function () {
        // console.log($num.val())

        let sids = $(this).parents('.xq_part').find('#xt').attr('sidurl');

        cookiearr();

        // $.inArray(值，数组) - 与原生的 indexOf 相似
        if ($.inArray(sids, arrsid) != -1) {//cookie已经存在sid的值，只需要相加数量
            let numZhi = parseInt(arrnum[$.inArray(sids, arrsid)]) + parseInt($num.val()); // 取到 cookie 中已经存在的商品数量 在 加上我们新增的

            arrnum[$.inArray(sids, arrsid)] = numZhi;//赋值 
            jscookie.add('cookienum', arrnum, 7);
        } else {//cookie不存在 说明是第一次点击加入购物车
            arrsid.push(sids);
            jscookie.add('cookiesid', arrsid, 7);
            arrnum.push($num.val());
            jscookie.add('cookienum', arrnum, 7);
            console.log(arrnum);
            console.log(arrsid)
        }

        //判断是否用户登入 没登入则不能添加购物车

        if (jscookie.get('user') == undefined) {//并没有用户登入

            if (window.confirm('你确定去登入?')) {
                location.href = 'http://localhost/PHP/project/src/html/register.html'
            }

            return;
        }

        // 购物车头上的数量
        cart_num++;
        $('.cart_num').show();

        console.log(cart_num)
        jscookie.add("num", cart_num, 7);
        let $cart_num = jscookie.get('num');
        console.log($cart_num);
        if ($cart_num >= 1) {
            $('.cart_num').html($cart_num);
            $('.cart_num').show();
        }







        //加入购物车成功的提示
        const cgBtn = $('.gc_cart');
        cgBtn.show();
        let time = setTimeout(function () {
            cgBtn.hide()
            clearTimeout(time)
        }, 2000)




    });


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


    // if (jscookie.get('num') >= 1) {
    //     $('.cart_num').html(jscookie.get('num'));
    //     $('.cart_num').show();
    // }
    // cart_num = jscookie.get('num');
    $('.cart_num').html(jscookie.get('num'));
    $('.cart_num').show();
    cart_num = jscookie.get('num');
}(jQuery)