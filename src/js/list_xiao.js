!function () {
    let arr_default = [];//排序前的数组
    let arr = []; //排序中的数组
    let prev = null;
    let next = null;
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: `http://${location.hostname}/PHP/project/php/xiangqing.php`
        // url: `http://${location.hostname}/php/xiangqing.php`

    }).done(function (d) {
        let html = '';
        $.each(d, function (index, value) {
            html += `
            <li>
                <a href="particulars.html?sid=${value.sid}">
                    <div><img src="${value.url}" alt=""></div>
                    <p class="nav_first sl">${value.title}</p>
                    <p class="nav_middle sl">${value.explain}</p>
                    <p class="nav_finally">
                        ${value.price}</p>    
                </a>
            </li>
            `
        });
        $('.nav_pl ul').append(html);
        let arr_default = [];//排序前的数组
        let arr = []; //排序中的数组
        let prev = null;
        let next = null;
        $('.nav_pl li').each(function (index, ele) {
            arr[index] = $(this);
            arr_default[index] = $(this);
        });
        // console.log(arr_default)
        //排序  -- 冒泡排序
        $('.mBtn').on('click', function () {//默认的排序
            $.each(arr_default, function (index, value) {
                $('.nav_pl ul').append(value);
            });
        });

        //冒泡排序
        $('.sBtn').on('click', function () {
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    prev = parseFloat(arr[j].find('.nav_finally').html());
                    next = parseFloat(arr[j + 1].find('.nav_finally').html());
                    if (prev > next) {
                        let t = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = t;
                    }
                }
            }
            console.log(prev)
            $('.nav_pl ul').empty();//清空原来的列表
            $.each(arr, function (index, value) {
                $('.nav_pl ul').append(value);
            })
        });

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
}();