/**
 * User: onwer
 * Date: 12-8-13
 * Time: 下午3:59
 */
(function($) {

    $.fn.fCal = function (options) {
        var opt = $.extend({}, $.fn.fCal.settings, options);
        return this.each(function (i) {
            var $this = $(this);
            var cal = new Cal($this, opt);
            opt.pix = 'f'+new Date().getTime()+i+'-';
            $this.attr('pix',opt.pix);
            cal.init();
        });
    };
    function Cal(obj, options) {
       this.objw = obj;
       this.o = options;
       this.curdate = new Date();

    }

    Cal.prototype = {
        init:function () {

            this.objw.html(this._getStr());
            this.hdTxt = this.objw.find('.f_cal_hd_txt');
            this.tbody = this.objw.find('tbody');
            this.prev = this.objw.find('.f_cal_hd_l');
            this.prevn = this.objw.find('.f_cal_hd_ln');
            this.next = this.objw.find('.f_cal_hd_r');
            this.nextn = this.objw.find('.f_cal_hd_rn');

            this.day = this.objw.find('.f_tb_day');
            this.dayclass = '.f_tb_day';
            this._bindprev();
            this._bindnext();
            this._bindday();
            this.genMonth();
            this._bindprevn();
            this._bindnextn();

            if(this.o.bindele !== null){
                this._bindele();
            }
            this.objw.bind('click',function(){
                return false;
            });
        },
        _first_day:1,//第一天，0是周天，1周日
        _bindele:function(){
            var _this = this,
                $bindele = this.o.bindele;


            this.objw.css({left:this.o.pos.left,top:this.o.pos.top,zIndex:123});
            $bindele.bind('click',function(){
                $('body').click();
                _this.objw.show();
                return false;
            });

            $('body').bind('click',function(){
                _this.objw.hide();
            });

        },
        _bindday:function(){
            var _this = this;
            this.objw.delegate(this.dayclass,'click',function(){
                var $this = $(this),day = new Date($this.attr('year'),$this.attr('month')-1,$this.attr('day'));
                if(_this.o.bindele !== null){
                    _this.o.bindele.val(day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate());
                    _this.objw.hide();
                }
                _this.o.select(day,$this,_this.objw);
                return false;
            });
        },
        _bindprev:function(){
            var _this = this;
            this.prev.bind('click',function(){
                _this.curdate = new Date(_this.curdate.getFullYear(),_this.curdate.getMonth()-1,1);
                _this.genMonth();
                _this.genTit();
                return false;
            });
        },
        _bindprevn:function(){
            var _this = this;
            this.prevn.bind('click',function(){
                _this.curdate = new Date(_this.curdate.getFullYear()-1,_this.curdate.getMonth(),1);
                _this.genMonth();
                _this.genTit();
                return false;
            });
        },
        _bindnext:function(){
            var _this = this;
            this.next.bind('click',function(){
                _this.curdate = new Date(_this.curdate.getFullYear(),_this.curdate.getMonth()+1,1);
                _this.genMonth();
                _this.genTit();
                return false;
            });

        },
        _bindnextn:function(){
            var _this = this;
            this.nextn.bind('click',function(){
                _this.curdate = new Date(_this.curdate.getFullYear()+1,_this.curdate.getMonth(),1);
                _this.genMonth();
                _this.genTit();
                return false;
            });

        },
        genTit:function(){
            this.hdTxt.html(this.curdate.getFullYear()+' 年 '+(this.curdate.getMonth()+1)+' 月');
        },
        genMonth:function(){
            var firstweek = this._getfirstweek(this.curdate);
            var str = '<tr>';
            var week,curi,num = 0;
            var y = this.curdate.getFullYear();
            var m = this.curdate.getMonth()+1 ;
            var s_day = 0;
            var s_week = 6;
            if(this._first_day){
                s_day = 1;
                s_week = 7;
            }
            for (var i = s_day, len = this._getlastDay(this.curdate)+firstweek; i < len; i++) {
                curi = i - firstweek + 1;
                if (i < firstweek) {
                    var lastday = new Date(y,m-2,1);
                    lastday.setDate(this._getlastDay(lastday)-firstweek+i+1);

                    str += this._getDayStr(lastday.getDate(),lastday.getMonth()+1,lastday.getFullYear());
                } else if ((week = i % 7) != s_day ) {
                    str += this._getDayStr(curi,m,y);
                } else {
                    str += '</tr><tr>';
                    str += this._getDayStr(curi,m,y);
                }
                num ++;
            }

            var nextnum = 1;
            var nextday = new Date(y,m,nextnum);
            if(week != 0 && week < s_week ){

                for(  i= 0,len = s_week-week;i<len;i++){
                    nextday = new Date(y,m,nextnum);
                    str += this._getDayStr(nextday.getDate(),nextday.getMonth()+1,nextday.getFullYear());
                    num ++;
                    nextnum ++;
                }
            }
            var last_i = i;
//            if(last_i < 6){
//                str += '</tr><tr>';
//                for(  i= 0,len =6-last_i;i<len;i++){
//                    if(i == 7){
//                        str += '</tr><tr>';
//                    }
//                    nextday = new Date(y,m,nextnum);
//                    str += this._getDayStr(nextday.getDate(),nextday.getMonth()+1,nextday.getFullYear());
//                    nextnum ++;
//                    num ++;
//                }
//
//            }
            str += '</tr>';

            this.tbody.html(str);

            this.o.change(this,this.objw);

        },
        _getDayStr:function(day,m,y){

              var str = this.o.format;

                  str = str.replace('%Y',y);
                str = str.replace('%m',m);
                str = str.replace('%d',day);

            var today = new Date();
            var todayclass = '';
            if(today.getFullYear() == y && (today.getMonth() + 1) == m && today.getDate() == day){
                todayclass = 'today';
            }
            return ' <td><div class="f_tb_day '+ todayclass +'" year="'+y+'" month="'+m+'" day="'+day+'" id="'+this.o.pix+str+'"><div class="ext_day"></div>' + day + '</div></td>';
        },
        _getfirstweek:function(date){
            var tmpdate = new Date(date.getFullYear(),date.getMonth(),1);
            var week = tmpdate.getDay();
            return week == 0 ? 7 : week;
        },
        _getlastDay:function(date){

              var   MonthNextFirstDay = new Date(date.getFullYear(),date.getMonth()+1,1);
              var   MonthLastDay = new   Date(MonthNextFirstDay-86400000);
              return MonthLastDay.getDate();
       },
        _getStr:function () {
            var str1 = '<th>日</th>';
            var str2 = '';
            if(this._first_day){
                str1 = '';
                str2 = '<th>日</th>';
            }
            return  '<div class="f_cal">'+
                    ' <div class="f_cal_hd_w">'+
                    ' <div class="f_cal_hd">'+
                    '  <span class="f_cal_hd_ln" title="上一年"></span>'+
                    '  <span class="f_cal_hd_l" title="上一月"></span>'+
                    '<span class="f_cal_hd_r" title="下一月"></span>'+
                '<span class="f_cal_hd_rn" title="下一年"></span>'+
                    ' <div class="f_cal_hd_txt">'+
                    new Date().getFullYear()+' 年 '+(new Date().getMonth()+1)+' 月'+
                    ' </div>'+
                    '</div>'+
                    '</div>'+
                    '<table>'+
                    ' <thead>'+
                    ' <tr>'+
                    str1 +
                    ' <th>一</th>'+
                    ' <th>二</th>'+
                    ' <th>三</th>'+
                    '  <th>四</th>'+
                    '  <th>五</th>'+
                    '  <th>六</th>'+
                    str2 +
                    '</tr>'+
                    ' </thead>'+
                    ' <tbody>'+
                    ' </tbody>'+
                    '</table>'+

                    '</div>';

        }




    };


    $.fn.fCal.settings = {
        format:'%Y-%m-%d',
        select:function (day, $this, $calw) { },
        change:function (cal) {  },
        pix:'',
        bindele:null,
        pos:{left:100,top:0}
    }

})(jQuery);
