"use strict";$.ajax({type:"post",dataType:"json",url:"http://localhost/PHP/project/php/xiangqing.php"}).done(function(n){var a="";$.each(n,function(n,l){a+='\n            <li>\n                <a href="particulars.html?sid='+l.sid+'">\n                    <div><img src="'+l.url+'" alt=""></div>\n                    <p class="nav_first sl">'+l.title+'</p>\n                    <p class="nav_middle sl">'+l.explain+'</p>\n                    <p class="nav_finally">\n                        '+l.price+"</p>    \n                </a>\n            </li>\n            "}),$(".nav_pl ul").append(a);var i=[],e=[],t=null;$(".nav_pl li").each(function(n,l){e[n]=$(this),i[n]=$(this)}),$(".mBtn").on("click",function(){$.each(i,function(n,l){$(".nav_pl ul").append(l)})}),$(".sBtn").on("click",function(){for(var n=0;n<e.length-1;n++)for(var l=0;l<e.length-n-1;l++)if(t=parseFloat(e[l].find(".nav_finally").html()),parseFloat(e[l+1].find(".nav_finally").html())<t){var a=e[l];e[l]=e[l+1],e[l+1]=a}console.log(t),$(".nav_pl ul").empty(),$.each(e,function(n,l){$(".nav_pl ul").append(l)})})}),void 0!==jscookie.get("user")?($(".mr_hear").hide(),$(".cg_hear").show(),$("#login_cg").html(jscookie.get("user"))):($(".mr_hear").show(),$(".cg_hear").hide()),$("#tuichu").on("click",function(){$(".mr_hear").show(),$(".cg_hear").hide(),jscookie.del("user")}),$(".db_index").on("click",function(){$("html").animate({scrollTop:0})});