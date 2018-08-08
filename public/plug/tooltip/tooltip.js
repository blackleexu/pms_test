/**
 * Created by Administrator on 2017/4/6.
 */

$.hoverTips = function(options){

    var eles = [];

    var defaultOptions = {
        ele:"",
        maxWidth:"300"
    };

    options = $.extend(false,defaultOptions,options);

    $('body').delegate(options.ele,'mouseenter',function(){

            $(this).each(function () {
                var self = $(this);

                var content = self.find('.x-tip-container').attr("data-tips");

                content = content.replace(/\n/g,"<br/>");


                $.each(eles,function () {

                    $(this).remove();
                });
                eles = [];

                var htmlDom = $("<div class='x-tip-dialog'>")
                    .html("<div class='x-tip-content'><p></p></div><p class='x-tip-cor'><span></span></p>");
                eles.push(htmlDom);

                htmlDom.find(".x-tip-content p").html( content );
                $('body').append( htmlDom );

                setPosition();


                var dialogWidth = htmlDom.width();

                if(dialogWidth >= options.maxWidth){
                    htmlDom.css({
                        "width":options.maxWidth,
                        "white-space":'inherit'
                    });

                    setPosition();
                }
                

                var iTime;

                self.on("mouseleave",function(){
                    removeDialog();
                });

                $('body').on("mouseenter",'.x-tip-dialog',function(){
                    clearTimeout(iTime);
                });
                $('body').on("mouseleave",'.x-tip-dialog',function(){
                    removeDialog();
                });

                function setPosition(){
                    var leftPos = self.offset().left;
                    var topPos = self.offset().top;

                    var tipCor = parseInt(htmlDom.find('.x-tip-cor').css('border-left-width'));

                    if(isNaN(tipCor)){
                        tipCor = 0;
                    }

                    leftPos += self.outerWidth()/2 - (htmlDom.outerWidth()/2);
                    topPos = topPos - (htmlDom.outerHeight() + tipCor);

                    htmlDom.css({"left":leftPos,"top":topPos,"display":"block"});
                }

                function removeDialog(){
                    iTime = setTimeout(function(){
                        htmlDom.remove();
                    },200);
                }
            });


        });




};







