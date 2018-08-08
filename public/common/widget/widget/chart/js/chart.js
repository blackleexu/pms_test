/**
 * Created by Administrator on 2017/1/18.
 */
(function (original) {
    jQuery.fn.clone = function () {
        var result = original.apply(this, arguments),
            my_textareas = this.find('textarea').add(this.filter('textarea')),
            result_textareas = result.find('textarea').add(result.filter('textarea')),
            my_selects = this.find('select').add(this.filter('select')),
            result_selects = result.find('select').add(result.filter('select'));

        for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
        for (var i = 0, l = my_selects.length; i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;

        return result;
    };
}) (jQuery.fn.clone);


(function(){


    function loadData(ts,is_default_data,fn){
        if(is_default_data){
            fn(ts.exec_option.defaultData);
        }else{
            ajax_request(ts.data_form_url,ts.searchParams,function(data){
                fn(data.data);
            });
        }
    }

    window.chartWidget = function(chartContentId, dataUrl,chartClass,initFn)
    {
        this.chart_content_id = chartContentId;
        this.chart_class = chartClass;
        this.base_chart_class = chartClass.substring(0,chartClass.indexOf('_chart'));
        this.$chart = $('.'+chartClass);
        this.data_form_url = dataUrl;
        this.searchParams = {};
        this.option = null;
        this.echarts = null;
        this.initFnDefault = initFn;

        this.exec_option = {
            optionFn : function(data, option){return option;},
            dealNoDataFn : function(data){},
            defaultData : 0
            //testConsoleFn : function(data){console.log(data);}
        };

        this.event_option = {
            //定义事件处理函数，要求名字为：
            //1、当添加鼠标事件时，前面9个字母固定为(onEventFn) + 事件名字(不区分大小写)
            //2、当为dispatchAction过后的事件处理时，名字和echarts官方名字一样。
            onEventFnClick : function(params, ts){console.log('cccccccccccccclick')}
            //onEventFnMouseover : function(params, ts){
            //console.log(params);
            //ts.exec_option.testConsoleFn('hhhhh');
            //}
            //datazoom : function(params, ts){}
        };
    };

    chartWidget.prototype = {

        constructor : chartWidget,

        setSearchParams : function(option){
            this.searchParams = $.extend(this.searchParams, option);
        },

        refresh : function(){
            var is_default_data = arguments[0] ? arguments[0] : 0;
            var ts = this;
            loadData(ts,is_default_data,function(data){
                var option = ts.initFnDefault(data);
                if(typeof ts.exec_option.optionFn == 'function'){
                    option = ts.exec_option.optionFn(data,option);
                }
                if(ts.echarts === null){
                    ts.echarts = echarts.init(document.getElementById(ts.chart_content_id));
                }

                if(typeof ts.exec_option.dealNoDataFn == 'function'){
                    ts.exec_option.dealNoDataFn(data);
                }
                ts.echarts.setOption(option);
                for(var eventFn in ts.event_option){
                    (function(eventFn){
                        if(typeof ts.event_option[eventFn] == 'function'){
                            var event_prefix = eventFn.substring(9,0);
                            var event_name = '';
                            event_prefix = event_prefix.toLowerCase();
                            if(event_prefix !== 'oneventfn'){
                                event_name = eventFn.toLowerCase();
                            }else{
                                event_name = eventFn.substring(9);
                                event_name = event_name.toLowerCase();
                            }
                            ts.echarts.on(event_name, function(params){
                                //ts.event_option[eventFn](params, ts);
                                ts.event_option[eventFn].call(ts, params, ts);
                                //or ts.event_option[eventFn].apply(ts, [params, ts]);
                            });
                        }
                    })(eventFn);
                }
            });
        },

        exec : function(exec_option, event_option){
            var is_default_data = exec_option.defaultData ? 1 : 0;
            this.exec_option = $.extend(this.exec_option, exec_option);
            event_option = event_option || {};
            this.event_option = $.extend(this.event_option, event_option);
            this.refresh(is_default_data);
        }

    };


})();








