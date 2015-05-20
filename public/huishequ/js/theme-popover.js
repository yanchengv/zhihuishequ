;(function ($) {
  $.fn.themePopover = function (options) {
    //para
    var para = $.extend({}, options);

    var re = /^1\d{10}$/;

    var re_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    $.fn.themePopover.module = null;
    
    if($('.theme-popover').length === 0) {
      var popHtml = '<div class="theme-popover">'
        +'  <div class="page regPage">'
          +'  <ul class="tabs">'
          +'    <li class="activeTab" style="border-radius: 8px 0 0 0;"><a href="#" tabid="#tab1">亲，麻烦先注册</a></li>'
          +'    <li style="border-radius: 0 8px 0 0;"><a href="#" tabid="#tab2">快速登录</a></li>'
          +'  </ul>'
          +'  <div class="tab_container">'
          +'    <div id="tab1" class="tab_content">'
          +'      <div id="tips1" style="color:#000;position: absolute;top: 5px;left: 24px;font-size:12px;">为了我们能更好的服务您，请您填写以下信息，我们将会严格保密！</div>'
          +'      <div id="tips2" style="color:#000;position: absolute;top: 60px;left: 35px;font-size:15px;display:none;">亲，欢迎您回来体验！</div>'
          +'      <div class="fields">'
          +'        <form id="applyForm" name="applyForm" action="/subpage/apply/applysubmite8.asp" method="post" autocomplete="off">'
          +'        <input type="hidden" id="_url" name="_url" value="">'
          +'        <input type="hidden" id="city" name="city" value="">'
          +'        <input type="hidden" id="province" name="province" value="">'
          +'        <input type="hidden" id="type" name="type" value="0">'
          +'        <div class="field"><span class="require">*</span>手机：<input type="text" id="phonenum" name="mobile" style="width: 160px;" maxlength="11"><input id="getCode" type="button" value="获取验证码"></div>'
          +'        <div class="line"></div>'
          +'        <div class="field"><span class="require">*</span>验证码：<input type="text" id="radomcode" name="radomcode" style="width: 160px;"></div>'
          +'        <div class="line"></div>'
          +'        <div class="field"><span class="require">*</span>姓名：<input type="text" id="uname" name="name"></div>'
          +'        <div class="line"></div>'
          +'        <div class="field"><span class="require">*</span>单位：<input type="text" id="company" name="company"></div>'
          +'        <div class="line"></div>'
          +'        <div class="field"><span class="require" style="color:#ffffff">&nbsp</span>邮箱：<input type="text" id="email" name="email"></div>'
          +'        </form>'
          +'      </div>'
          +'      <button id="save" class="btn" style="margin-top: -20px;">马上体验</button>'
          +'    </div>'
          +'    <div id="tab2" class="tab_content" style="display: none;">'
          +'      <div class="fields" style="margin-top: 90px;">'
          +'        <div class="field">手机：<input type="text" id="qphonenum" name="qphonenum" maxlength="11"></div>'
          +'      </div>'
          +'      <button id="login" class="btn">马上体验</button>'
          +'    </div>'
          +'  </div>'
        +'  </div>'
        +'  <div class="page wxQcode"><img src="img/wxQcode.png"></div>'
        +'  <div class="page mobiQcode"><img src="img/mobiQcode.png"></div>'
        +'  <div class="theme-popover-close"></div>'
        +'</div>'
        +'<div class="theme-popover-mask"></div>';

      var popcontent = $(popHtml);

      popcontent.click(function(e) {
        e.stopPropagation();
      });

      popcontent.find('ul.tabs li').click(function() {
        $("ul.tabs li").removeClass('activeTab');
        $(this).addClass('activeTab');
        $(".tab_content").hide();
        var activeTab = $(this).find("a").attr("tabid");
        $(activeTab).fadeIn().find('input[type=text]:first').focus();
        return false;
      });

      popcontent.find('.theme-popover-close').click(function (e) {
        $('.theme-popover-mask').hide();
        $('.theme-popover').slideUp(200);

        $(".field input[type=text]").val('');

        $(".fields div").show();
        $("#phonenum").attr('disabled', false).parents("div.fields").stop();
        $("#phonenum").parents("div.fields").css({'margin-top': '35px'});
        $("#tips1").stop().show();
        $("#tips2").stop().hide();
      });

      popcontent.find(".fields input[type=text]").keydown(function(e) {
        if(e.which === 13){
          $(this).parents(".tab_content").find("button.btn").trigger('click');
          e.stopPropagation();
        }
      });

      popcontent.find("#getCode").click(function() {
        var quickLogin = $(this).attr('quickLogin');
        if(quickLogin != undefined && quickLogin == "1") {
          if($.fn.themePopover.module === "weixin") {
            showPage("wxQcode");
          } else if($.fn.themePopover.module === "mobile") {
            showPage("mobiQcode");
          } else {
            window.location = "http://e8.weaver.com.cn/homepage/HPagePortal.jsp";
          }
          return;
        }

        var phonenum = $("#phonenum").val();
        if($.trim(phonenum) == "") {
          alert("请您输入手机号码！");
          $("#phonenum").focus();
          return false;
        }

        if (!re.test(phonenum)) {
          alert("手机号码格式错误，请重新输入！");
          $("#phonenum").focus();
          return false;
        }

        $("#radomcode").focus();

        time(this);

        $.ajax({
          type: 'GET',
          url: 'http://121.41.105.211:8080/homepage/generateCode.jsp',
          dataType:'jsonp',
          data:{ "phonenum" : phonenum },
          jsonp:'jsonpcallback',
          error: function(XmlHttpRequest,textStatus,errorThrown){
            alert("验证码生成出错，请联系管理员！");
          },
          success: function (msg) {
            if(msg.result=="1") {
              $.ajax({
                type: 'GET', 
                url: 'http://e8.weaver.com.cn/login/getCity.jsp',
                dataType:'jsonp',
                data:{ "phonenum" : phonenum },
                jsonp:'jsonpcallback',
                success: function (msg) {
                  $("#_url").val(document.referrer);
                  if(msg.city !=''){
                    var pc = msg.city;
                    if(pc.indexOf("-")>=0){
                       var pcarr = pc.split('-');
                       $("#province").val(pcarr[0]);
                       $("#city").val(pcarr[1]);
                    }else{
                       $("#city").val(msg.city);
                    } 
                  }
                }
              });
            }
          }
        });
      });

      popcontent.find("#phonenum").keyup(function() {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g,''));
        tmptxt = $(this).val();

        if(tmptxt.length == 11) {
          $.ajax({
            type: 'GET',
            url: 'http://e8.weaver.com.cn/login/checkPhone.jsp',
            dataType:'jsonp',
            data:{ "phonenum" : tmptxt },
            jsonp:'jsonpcallback',
            success: function(msg){
              if(msg.result == "1")  {
                if($.fn.themePopover.module === "weixin") {
                  showPage("wxQcode");
                } else if($.fn.themePopover.module === "mobile") {
                  showPage("mobiQcode");
                } else {
                  $("#getCode").attr('quickLogin', '1').val("快速登录");
                  $("#phonenum").attr('disabled', true).parent().siblings().slideUp(function () {
                    $("#phonenum").parents("div.fields").animate({"margin-top": "90px"}, "slow", function () {
                      $("#tips1").fadeOut();
                      $("#tips2").fadeIn();
                    });
                  });
                }
              }
            }
          });
        }
      }).bind('paste', function() {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g,''));
      }).keypress(function(e) {
        var code = e.which;
        return code >= 48 && code<= 57;
      }).css('ime-mode', 'disabled');

      popcontent.find("#save").click(function() {
        var quickLogin = $("#getCode").attr('quickLogin');
        if(quickLogin != undefined && quickLogin == "1") {
		  setCookie("weaver_de8_phone",phonenum);
          if($.fn.themePopover.module === "weixin") {
            showPage("wxQcode");
          } else if($.fn.themePopover.module === "mobile") {
            showPage("mobiQcode");
          } else {
            window.location = "http://e8.weaver.com.cn/homepage/HPagePortal.jsp";
          }
          
          return;
        }

        var uname = $("#uname").val(),
          company = $("#company").val(),
          phonenum = $("#phonenum").val(),
          radomcode = $("#radomcode").val(),
          email = $("#email").val();

        if($.trim(phonenum) == "") {
          alert("请您输入手机号码！");
          $("#phonenum").focus();
          return false;
        } else if(!re.test(phonenum)) {
          alert("手机号码格式错误，请您重新输入！");
          $("#phonenum").focus();
          return false;
        } else if($.trim(radomcode) == "") {
          alert("请您输入验证码！");
          $("#radomcode").focus();
          return false;
        } else if($.trim(uname) == "") {
          alert("请您输入姓名！");
          $("#uname").focus();
          return false;
        } else if($.trim(company) == "") {
          alert("请您输入单位名称！");
          $("#company").focus();
          return false;
        } else if($.trim(email) != "" && !re_email.test(email)) {
          alert("邮箱格式错误，请您重新输入！");
          $("#email").focus();
          return false;
        }

        $("#save").addClass('disable').attr('disabled', true).html("处理中...");

        $.ajax({
          type: 'GET', 
          url: 'http://121.41.105.211:8080/homepage/checkCode.jsp',
          dataType:'jsonp',
          data:{
            "phonenum" : phonenum,
            "radomcode" : radomcode
          },
          jsonp:'jsonpcallback',
          error: function(XmlHttpRequest,textStatus,errorThrown){
            alert("服务器出错，请联系管理员！");
            $("#save").removeClass('disable').attr('disabled', false).html("马上体验");
          },
          success: function(msg){
            if(msg.result=="3") {
              var formdata = {};

              if($.fn.themePopover.module === "weixin") {
			     $("#type").val("13");
			  }else if($.fn.themePopover.module === "mobile") {
                 $("#type").val("6");
			  }

              var t = $('form').serializeArray();
              $.each(t, function() {
                formdata[this.name] = escape(this.value);
              });
              
              if($.fn.themePopover.module === "weixin") {
                $.post('/subpage/apply/applysubmite4json.asp', formdata).done(function (data) {
                  $.ajax({
                    type: 'GET',
                    url: 'http://e8.weaver.com.cn/homepage/HPagePortal4Ajax.jsp',
                    dataType:'jsonp',
                    data:{'uname':uname, 'company':company, 'phonenum':phonenum, 'email':email, '_url':window.location.href, 'referer':document.referrer},
                    jsonp:'jsonpcallback'
                  });
                  //微信用户注册并显示二维码
                  regWeixin(company, uname, phonenum);

				  setCookie("weaver_de8_phone",phonenum);
                }).fail(function (err) {
                  alert("服务出错，请稍后再试！");
                });
              } else if($.fn.themePopover.module === "mobile") {
                $.post('/subpage/apply/applysubmite4json.asp', formdata).done(function (data) {
                  //微信用户注册
                  $.post('http://wx.weaver.com.cn/taste/addTasteJsonp', { "company" : company, "userName" : uname, "mobile" : phonenum, "from" : "1" });
                  //体验系统注册
                  $.ajax({
                    type: 'GET',
                    url: 'http://e8.weaver.com.cn/homepage/HPagePortal4Ajax.jsp',
                    dataType:'jsonp',
                    data:{'uname':uname, 'company':company, 'phonenum':phonenum, 'email':email, '_url':window.location.href, 'referer':document.referrer},
                    jsonp:'jsonpcallback'
                  });
                  showPage("mobiQcode");

				  setCookie("weaver_de8_phone",phonenum);
                }).fail(function (err) {
                  alert("服务出错，请稍后再试！");
                });
              } else {
                //微信用户注册
                $.post('http://wx.weaver.com.cn/taste/addTasteJsonp', { "company" : company, "userName" : uname, "mobile" : phonenum, "from" : "1" });
                setCookie("weaver_de8_phone",phonenum);
                document.applyForm.submit();
              }
            } else if (msg.result=="1") {
              alert("验证码失效，请重新获取验证码！");
              $("#save").removeClass('disable').attr('disabled', false).html("马上体验");
              $("#radomcode").focus();
            } else{
              alert("验证码错误，请重新获取验证码！");
              $("#save").removeClass('disable').attr('disabled', false).html("马上体验");
              $("#radomcode").focus();
            };
          }
        });
      });

      popcontent.find("#login").click(function() {
        var phonenum = $("#qphonenum").val();
        if($.trim(phonenum) == "") {
          alert("请您输入手机号码！");
          $("#qphonenum").focus();
          return false;
        }

        if (!re.test(phonenum)) {
          alert("手机号码格式错误，请重新输入！");
          $("#qphonenum").focus();
          return;
        }

        $("#login").addClass('disable').attr('disabled', true).html("处理中...");

        $.ajax({
          type: 'GET',
          url: 'http://e8.weaver.com.cn/login/checkPhone.jsp',
          dataType:'jsonp',
          data:{ "phonenum" : phonenum },
          jsonp:'jsonpcallback',
          error: function(XmlHttpRequest,textStatus,errorThrown){
            alert("服务器出错，请联系管理员！");
            $("#login").removeClass('disable').attr('disabled', false).html("马上体验");
          },
          success: function(msg){
			 setCookie("weaver_de8_phone",phonenum);
            if(msg.result == "1")  {
              $("#login").removeClass('disable').attr('disabled', false).html("马上体验");
              $("#qphonenum").val('');
              $("ul.tabs li:first").click();

              if($.fn.themePopover.module === "weixin") {
                showPage("wxQcode");
              } else if($.fn.themePopover.module === "mobile") {
                showPage("mobiQcode");
              } else {
                window.location = "http://e8.weaver.com.cn/homepage/HPagePortal.jsp";
              }
            } else {
              alert("请您先注册，祝您体验愉快！");
              $("#login").removeClass('disable').attr('disabled', false).html("马上体验");
              $("#qphonenum").val('');
              $("ul.tabs li:first").click();
            }
          }
        });
      });

      $(popcontent).appendTo('body');
    }

    return this.each(function() {
       $(this).click(function (e) {
        $.fn.themePopover.module = $(this).attr('module');
		   //deleteCookie("weaver_de8_phone");
		   //alert(getCookie("weaver_de8_phone"));
		   // alert($.fn.themePopover.module);
		  if($.fn.themePopover.module === "weixin" || $.fn.themePopover.module === "mobile"){
		    if(getCookie("weaver_de8_phone") !=null && getCookie("weaver_de8_phone") !=''){
				//alert(1);
                showApply();
			   if($.fn.themePopover.module === "weixin") {
				  showPage("wxQcode");
				} else if($.fn.themePopover.module === "mobile") {
				  showPage("mobiQcode");
				}
			}else{
			   showApply();
			}
			
		  }else{
			  
		     if(getCookie("weaver_de8_phone") !=null && getCookie("weaver_de8_phone") !=''){
				  window.location = "http://e8.weaver.com.cn/homepage/HPagePortal.jsp";
		     }else{
			   showApply();
			 }
		  }

      e.stopPropagation();
       });
    }); //end each
  }

  var wait=60;

  function time(_this) {
    if (wait == 0) {
      $(_this).removeClass('disable').attr('disabled', false).val("重新获取验证码");
      wait = 60;
    } else {
      $(_this).addClass('disable').attr('disabled', true).val(wait + "秒后重新获取");
      wait--;
      setTimeout(function() {
        time(_this)
      }, 1000);
    }
  }

  function showApply() {
    $('.theme-popover').removeClass('theme-qcode');
    showPage();
    $('.theme-popover-mask').show();
    $('.theme-popover').slideDown(200);
    $("#phonenum").focus();
  }

  function regWeixin (company, uname, phonenum) {
    $.ajax({
      type: 'GET',
      url: 'http://wx.weaver.com.cn/taste/addTasteJsonp',
      dataType:'jsonp',
      data:{ "company" : company, "userName" : uname, "mobile" : phonenum, "from" : "2"},
      jsonp:'jsonpcallback',
      error: function(XmlHttpRequest,textStatus,errorThrown){
        //alert("微信服务出错，请稍后再试！");
        $("#save").removeClass('disable').attr('disabled', false).html("马上体验");
      },
      success: function(msg){
        if(msg.status == "0")  {
          showPage("wxQcode");
        } else {
          //alert("微信服务出错，请稍后再试！");
          $("#login").removeClass('disable').attr('disabled', false).html("马上体验");
          $("#qphonenum").val('');
          $("ul.tabs li:first").click();
        }
      }
    });
  }

  function showPage (page) {
    var pageClass = page||"regPage";
    if(pageClass === "wxQcode" || pageClass === "mobiQcode") {
      $('.theme-popover').addClass('theme-qcode');
    } else {
      $('.theme-popover').removeClass('theme-qcode');
    }
    $('.' + pageClass).show().siblings('.page').hide();
  }


  // primary function to retrieve cookie by name
	function getCookie(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
		return null;
	}


	// store cookie value with optional details as needed
	function setCookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	}

	// utility function called by getCookie()
	function getCookieVal(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	}

	function deleteCookie(name, path, domain) {
		if (getCookie(name)) {
			document.cookie = name + "=" +
		  ((path) ? "; path=" + path : "") +
		  ((domain) ? "; domain=" + domain : "") +
		  "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	 
		}
	}

})(jQuery);

$(document).ready(function() {
  $('.exp_app').themePopover();

  doneSource();
});


function doneSource(){
   
  var sourcelt=GetQueryString("source");
  //alert(sourcelt);
  if(sourcelt !=null && sourcelt.toString().length>0) {
	   //alert(sourcelt);
       $.post('/subpage/apply/applysubmite4session.asp', { "source" : sourcelt});
  }
  
  
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}