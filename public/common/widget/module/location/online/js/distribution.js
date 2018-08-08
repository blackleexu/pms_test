/**
 * Created by onwer on 2017/3/10.
 */
(function () {
    window.LocationOnline = {

        Distribution: function (options) {
            var default_options = {
                url: baseUrlGroup + '/location/online/distribution?_no_sign=yes',
                last_url: baseUrlGroup + '/location/online/last?_no_sign=yes',
                result_url: baseUrlGroup + '/location/online/distributionResult?_no_sign=yes',
                params: {
                    uid_str: '',
                    dept_str: '',
                    type: 1
                },
                hide_loading:false,
                location_type:2,//定位类型，1.脱岗 2.在线
                success: function (user_list) {
                }
            };
            this.start_time = 0; //定位开始时间
            this.options = $.extend(default_options, options);
            this.data = {//第一次获取的数据
                'list': [],//需要等待
                'err_list': [] //不需要等待
            };
            this.wait_data = [];//等待处理成功的数据
            this.result_data = [];
        }
    };
    LocationOnline.Distribution.onLineStatus = {
        online:1,
        offline:2,
        no_task:3
    };
    LocationOnline.Distribution.prototype.isTimeOut = function () {
        return (new Date().getTime() - this.start_time) > 60 * 1000;
    };
    LocationOnline.Distribution.prototype.getWaitItemData = function (item) {
        return {
            "uid": item.uid,
            "time": this.start_time,//定位时间
            "lng": item.lng ? item.lng : '',
            "lat": item.lat ? item.lat : '',
            "location": item.location ? item.location : '',
            "acc": item.acc ? item.acc : '',//偏差距离 单位米
            "location_type": item.location_type ? item.location_type : ''//定位方式:1基站定位,2wifi定位,3GPS定位,4混合定位,5虚假定位
        };
    };
    LocationOnline.Distribution.prototype.handleUserInfoData = function (last_data) {
        for (var i in last_data.list) {
            this.wait_data.push(this.getWaitItemData(last_data.list[i]));
        }
        var other_uid_arr = [];
        for (var j in this.data.list) {
            var uid = this.data.list[j].uid;
            var has = false;
            for (var k in this.wait_data.list) {
                if (this.wait_data.list[k].uid == uid) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                other_uid_arr.push(uid);
            }
        }
        if (this.isTimeOut()) {
            for (var m in other_uid_arr) {
                this.wait_data.push(this.getWaitItemData({
                    uid: other_uid_arr[m]
                }));
            }
            other_uid_arr = [];
        }
        return other_uid_arr;
    };
    LocationOnline.Distribution.prototype.handleWait = function (wait_success) {
        var _this = this;
        var wait_data = {'list': []};
        var uid_arr = [];
        for (var i in this.data.list) {
            uid_arr.push(this.data.list[i].uid);
        }
        var get_last_info = function (cur_uid_arr) {
            if (!cur_uid_arr.length) {
                wait_success(wait_data);
                return;
            }
            ajax_request(_this.options.last_url, {uids: cur_uid_arr.join(',')}, function (last_data) {
                setTimeout(function () {
                    get_last_info(_this.handleUserInfoData(last_data));
                }, 500);
            },'json',_this.options.hide_loading);
        };
        get_last_info(uid_arr);
    };
    LocationOnline.Distribution.prototype.handleResult = function (result_success) {
        if (!this.wait_data.length){
            result_success();
            return;
        }
        var postData = {
            type:this.location_type,
            location_data:JSON.stringify(this.wait_data)
        };
        var _this = this;
        ajax_request(this.options.result_url,postData,function (data) {
            _this.result_data = data;
            result_success();
        },'json',_this.options.hide_loading);
    };
    LocationOnline.Distribution.prototype.handleResponseData = function () {
        var list = this.data.err_list;
        for(var i in this.result_data.list){
            list.push(this.result_data.list[i]);
        }
        console.log('xxxx',this.result_data);
        console.log(list);
        this.options.success({
            list:list
        });
    };
    LocationOnline.Distribution.prototype.calibrationStartTime = function (servertime,endtime) {
        this.start_time = servertime - parseInt((endtime - this.start_time) / 1000,10);
    };
    LocationOnline.Distribution.prototype.start = function () {
        var _this = this;
        this.start_time = new Date().getTime();
        ajax_request(this.options.url, this.params, function (data) {
            _this.data = data;
            _this.calibrationStartTime(data.servertime,new Date().getTime());
            _this.handleWait(function () {
                _this.handleResult(function () {
                    _this.handleResponseData();
                });
            });
        },'json',_this.options.hide_loading);
    };


})();