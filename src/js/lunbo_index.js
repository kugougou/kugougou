; !function () {
    function LunBo() {
        this.Lunbo = document.querySelector('.right_index');
        this.Img = document.querySelectorAll('.right_index img');
        this.Btn = document.querySelectorAll('.circle li');
        this.rightBtn = document.querySelector('.right');
        this.leftBtn = document.querySelector('.left');
        this.index = 0;
    };
    LunBo.prototype.init = function () {
        let _this = this;
        for (let i = 0; i < _this.Btn.length; i++) {
            _this.Btn[i].onclick = () => {
                _this.index = i;
                _this.tab();
            };
        }

        _this.rightBtn.onclick = function () {
            _this.index++;
            if (_this.index > _this.Img.length - 1) {
                _this.index = 0;
            }
            _this.tab();
        }

        _this.leftBtn.onclick = function () {
            _this.index--;
            if (_this.index < 0) {
                _this.index = _this.Img.length - 1;
            }
            _this.tab();

        }

        _this.selfMotion(); // 自动轮播

        //当鼠标摸到时停止轮播
        _this.Lunbo.onmouseover = () => {
            clearInterval(_this.Img.time);
        }

        // 继续轮播-当鼠标离开开启自动轮播
        _this.Lunbo.onmouseout = () => {
            _this.selfMotion();
        }
    };


    //自动轮播
    LunBo.prototype.selfMotion = function () {
        this.Img.time = setInterval(() => {
            this.rightBtn.onclick();
        }, 2000)
    }

    LunBo.prototype.tab = function () {
        for (let j = 0; j < this.Btn.length; j++) {
            this.Btn[j].className = '';
            bufferMove(this.Img[j], { opacity: 0 });
        }
        this.Btn[this.index].className = 'actvie';
        bufferMove(this.Img[this.index], { opacity: 100 });
    }

    var lb = new LunBo();
    lb.init();
}();




//限时购
; !function () {
    $.ajax({
        type: 'post',
        url: 'http://localhost/PHP/project/php/xiaomi.php',
        dataType: 'json'
    }).done(function (data) {//图片懒加载
        console.log(data);
        let html = '';
        $.each(data, function (index, value) {
            html += `
            <li>
                <img class="lazy" data-original="${value.url}" alt="" width="266" height = "266">
                <p>${value.tetle}</p>
                <i class="iconfont icon-qian"></i><span>${value.details}<a href="">起</a></span><em>${value.price}</em>
            </li>
            `
        });
        $('.xs_index  ul').append(html);
        $(function () {//和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn"//图片显示方式
            });
        });


        //点击按钮会切换图片
        const $rightBtn = $('.xs_right');
        const $leftBtn = $('.xs_left');
        const $oUl = $('.ov_index ul');
        const $oLi = $('.ov_index li');// 所有的li
        let $num = 4;
        let $liWidth = $oLi.eq(0).outerWidth(true); // 一个li的宽度

        $rightBtn.on('click', function () {
            // console.log(999)
            if ($oLi.length > $num) {
                $num++;
            };
            $oUl.animate({
                left: -$liWidth * ($num - 4)
            });
        });
        $leftBtn.on('click', function () {
            if ($num > 4) {
                $num--;
            };
            $oUl.animate({
                left: -$liWidth * ($num - 4)
            });
        });
    });


    // 顶部悬浮
    $suspension = $('.xf_index');
    $(window).on('scroll', function () {
        let $scrollValue = $(window).scrollTop();
        if ($scrollValue > 400) {
            $suspension.stop(true).animate({
                top: 0
            })
        } else {
            $suspension.stop(true).animate({
                top: -60
            })
        }
    });


    //专属推荐
    $.ajax({
        type: 'post',
        url: 'http://localhost/PHP/project/php/zhuanshu.php',
        dataType: 'json',
    }).done(function (data) {
        let html = '';
        $.each(data, function (index, value) {
            html += `
                    <li>
                        <a href="#">
                            <img class = "lazy" data-original="${value.url}" alt="" width = "125" height = "125">
                            <p>${value.details}</p>
                            <div class ="tele_index">
                                <div class = "sort_index">${value.sort}</div>
                                <i class="iconfont icon-qian"></i><span>${value.price}</span>
                            </div>
                           
                        </a>
                    </li>
                `
        })
        $('.zs_index ul').append(html);
        $(function () {//和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn"//图片显示方式
            });
        });

    });


    //有品推荐的二级菜单 
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://localhost/PHP/project/php/tuijian.php'
    }).done(function (d) {
        let html = '';
        console.log(444)
        $.each(d, function (index, value) {
            html += `
                <li>
                    <a href="">
                        <img src="${value.url}" alt="">
                        <span>${value.title}</span>
                    </a>
                </li>
            `
        });
        $('.yp_menu').append(html);
        const $mod = $('.left_index ul li');
        const $listMenu = $('.ej_index .twomenu')
        const $twoMeny = $('.ej_index');
        $mod.hover(function () {
            $twoMeny.show();
            $listMenu.eq($(this).index()).show().siblings('.twomenu').hide();
        }, function () {
            $twoMeny.hide();
        });

        $twoMeny.hover(function () {
            $twoMeny.show()
        }, function () {
            $twoMeny.hide()
        });


    });

    // 回到顶部
    $('.db_index').on('click', function () {
        $('html').animate({
            scrollTop: 0
        })
    });

    //跳转到列表页
    $('.lb_index ul li').on('click', function () {
        location.href = 'list_xiao.html'
    })


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
}();