/**
 * Created by aubert on 2017/5/9.
 */
function widget_geo_input($id, $location, $lat, $lng, $button_cls) {
    var marker;
    var address;
    var popObj;
    $($button_cls).click(function () {
        $($button_cls).html();
        popObj = pop.view({
            content: '<div id="container" ></div><div class="search"><div id="r-result">' +
            '<div id="myPageTop"><table><tr><td><input type="text" id="suggestId" placeholder="请输入关键字"/></td></tr></table></div>' +
            '</div></div>',
            width: 800,
            title: '选择地址',
            success: function () {
                initMap();
            },
            closefn: function () {}
        });
    });
    function initMap() {
        var lng = parseInt($('.lng').val());
        var lat = parseInt($('.lat').val());
        var infoWindow;
        var map;
        var position = new AMap.LngLat(lng, lat);
        if ($id) { //编辑数据?>
            var option = {resizeEnable: true, zooms: [3, 20], expandZoomRange: true, zoom: 15};
            if (lat !== 0 || lng !== 0) {
                option['center'] = position;
                map = new AMap.Map("container", option);
            } else {
                map = new AMap.Map("container", option);
            }
            marker = new AMap.Marker({
                position: map.getCenter(),
                draggable: false
            });
            marker.setMap(map);
        } else {//添加数据?>
            map = new AMap.Map("container", {resizeEnable: true, zoom: 15});
            marker = new AMap.Marker({
                position: map.getCenter(),
                draggable: false
            });
        }
        //单击地图获取点击的经纬度
        map.on('click', function (e) {
            marker.setPosition(e.lnglat);
            marker.setMap(map);
            var geocoder = new AMap.Geocoder({radius: 1000, extensions: "all"});
            geocoder.getAddress(e.lnglat, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
                function geocoder_CallBack(data) {
                    address = data.regeocode.formattedAddress; //返回地址描述
                    var info = [];
                    info.push("<div style=\"padding:5px 0px 0px 4px;\">" + address + '</div>');
                    info.push("<button class='submit' style=\"position: absolute;border:none;border-radius:4px;background:#4e95ca;padding: 2px 5px;color:#fff;font-size:13px;bottom: 30px;right: 12px;\">确定");
                    //使用默认信息窗体框样式，显示信息内容
                    infoWindow = new AMap.InfoWindow({content: info.join("<br/>")});
                    lng = e.lnglat.lng;
                    lat = e.lnglat.lat;
                    infoWindow.open(map, e.lnglat);
                }
            });
        });
        //地图加载完毕
        AMap.event.addListener(map, 'complete', function () {
            $(".amap-sug-result").css({'z-index': 5555});
        });
        //输入提示
        var autoOptions = {input: "suggestId"};
        var auto = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({});
        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发

        //关键字查询查询
        function select(e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    map.remove(map.getAllOverlays('marker'));
                    map.clearInfoWindow();
                    map.setZoom(18);
                    map.setCenter(e.poi.location);
                    for(var h = 0; h < result.poiList.pois.length; h++){
                        var position = result.poiList.pois[h]['location'];
                        var s_address = result.poiList.pois[h]['name'];
                        var marker = new AMap.Marker({  //加点
                            map: map,
                            position: position
                        });
                        if (s_address.length === 0 ) {
                            s_address = e.poi.name+'附近';
                        }
                        marker.extData = {'lng':position['lng'],'lat':position['lat'],'address':s_address};//自定义想传入的参数
                        marker.content = '';
                        // marker.setIcon('1');
                        marker.on("click",function(e) {
                            var hs = e.target.extData;
                            var info = [];
                            info.push("<div style=\"padding:5px 0px 0px 4px;\">" + hs['address'] + '</div>');
                            info.push("<button class='submit' style=\"position: absolute;border:none;border-radius:4px;background:#4e95ca;padding: 2px 5px;color:#fff;font-size:13px;bottom: 30px;right: 12px;\">确定");
                            infoWindow = new AMap.InfoWindow({content: info.join("<br/>")});
                            infoWindow.open(map, e.target.getPosition());
                            address = hs['address'];
                            lng = hs['lng'];
                            lat = hs['lat'];
                        });
                    }
                }
            });
        }
        //确定按钮
        $('body').on('click', '.submit', function () {
            $(window.parent.document).find('input[name="'+$location+'"]').val(address);
            $(window.parent.document).find('input[name="'+$lng+'"]').val(lng);
            $(window.parent.document).find('input[name="'+$lat+'"]').val(lat);
            popObj.close();
        })
    }
}