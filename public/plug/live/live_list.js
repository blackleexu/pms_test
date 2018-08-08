var LiveList = {
    listContainerHeight: 0,
    _flashElement: null,
    _flashElementId: null,
    _flashInterval: null,
    _audioElement: null,
    _audioInterval: null,
    show: function () {
        $('.live_list_container').css({display: 'block'});
    },
    createLiveList: function (resData) {

        var mlist = resData['list'];
        resData['list'] = [];
        var new_i = 0;
        for(var s in mlist){
            resData['list'][new_i++] = mlist[s];
        }
        var count = resData['list'].length;
        XLive.options.callback(count, 140);
        var $listMiddle = $('.live_list_middle');
        var that = this;
        if (count > 0) {
            $('.live_list_item_empty').remove();
            var cur_list = [];
            for (var i = 0; i < count; i++) {
                var newItem = resData.list[i];
                cur_list.push(newItem.id);
                if ($('.live_list_item[data-id=' + newItem.id + ']').length) {
                    continue;
                }
                var createLiveItem = $(this._createLiveItem(resData['list'][i]));
                if (LiveVideo.isVideoContainerShowing){
                    createLiveItem.css({borderBottom: '1px solid #545454', background: '#363636'});
                    createLiveItem.find('.live_location').css({color: '#ffffff', opacity: '0.9'});
                    createLiveItem.find('.live_list_top_center').css({color: 'white'});
                    createLiveItem.find('.live_list_item_user_name').css({color: '#C3C3C3'});
                    createLiveItem.find('.live_list_item_user_dept').css({color: '#C3C3C3'});
                    createLiveItem.find('.live_list_item_bottom_left_item').css({color: '#C3C3C3'});
                    createLiveItem.find('.live_list_item_bottom_left_time').css({color: '#C3C3C3'});
                }
                $listMiddle.prepend(createLiveItem);
                that._startFlashing();

            }
        } else {
            $listMiddle.html(this._createEmptyItem());
        }
        $('.live_list_item').each(function () {

            if($(this).hasClass('live_list_item_empty')){
                return;
            }
            var has = false;
            if($(this).find('.watch_btn').data('status') == 1){
                return;
            }
           for(var i in cur_list){
               if($(this).attr('data-id') == cur_list[i]){
                   has = true;
                   break;
               }
           }
           if(!has){
               $(this).remove();
           }
        });
        this.operateListItemSkin();
        if (count== 0) {
            LiveList.stopMusic();
        }
        XLive.options.newListCallback(resData);

    },
    createNewestLiveList: function (resData) {
        var that = this;
        if (resData.list.length > 0) {
            for (var i = 0; i < resData.list.length; i++) {
                var item = resData.list[i];
                if (item['is_new'] && this._idNoExist(item['id'])) {
                    // this._resetLiveItemBorder();

                    var $liveItem = $(this._createLiveItem(item));
                    this._stopFlashing();
                    this._flashElement = $liveItem;
                    this._flashElementId = $liveItem.find('.live_watch_btn').data('id');
                    if ($liveItem) {
                        var $itemEmpty = $('.live_list_item_empty');
                        if ($itemEmpty) {
                            $itemEmpty.hide();
                            $itemEmpty.remove();
                        }
                    }
                    $liveItem.hide().prependTo('.live_list_middle').slideDown('slow', function () {
                        that._startFlashing();
                    });
                }
            }
        }
    },
    _createLiveItem: function (data) {
        if(XLive.options.customListItem(data)){
            return XLive.options.customListItem(data);
        }
        return '<div class="live_list_item" data-id='+data.id+'><div class="live_list_itemborder"></div>'
                + '     <div class="live_list_item_bottom">'
                + '         <div class="live_list_item_bottom_left">'
                + '             <div class="live_list_item_bottom_left_item">'
                + '             <div class="live_list_item_bottom_left_item">'
                + '                 <div class="live_list_item_bottom_left_text live_list_item_bottom_left_location live_location">' + data['location'] + '</div>'
                + '             </div>'
                + '                 <div class="live_list_item_bottom_left_time">' + data['start_time'] + '&nbsp;' + t('view_live_launch') + '</div>'
                + '             </div>'
                + '     <div class="live_list_item_top">'
                + '         <span class="live_list_item_user_name">' + data['create_user']['name'] + '</span>'
                + '         <span class="live_list_item_user_dept">' + '-&nbsp' + data['create_user']['dept_name'] + '（' + data['com_name'] + '）</span>'
                + '     </div>'
                + '         </div>'
                + '         <div class="live_list_item_bottom_right">'
                + '             <span class="live_watch_btn" data-id="' + data['id']
                + '" data-loc="' + data['location']
                + '" data-dept="' + data['create_user']['dept_name']
                + '" data-user="' + data['create_user']['name']
                + '" data-status="' + (data['id'] == XLive.currentLiveId && LiveVideo.isVideoContainerShowing ? 1 : 0)
                + '" data-uid="' + data['create_user']['uid']
                + '" data-is_sub="' + data['is_sub']
                + '" data-com_name="' + data['com_name'] + '"><img src="' + liveImageUrl
                + (data['id'] == XLive.currentLiveId && LiveVideo.isVideoContainerShowing ? 'live_btn_living.gif' : 'live_btn_play.png') + '"> </span>'
                + '         </div>'
                + '     </div>'
                + ' </div>';
    },
    _createEmptyItem: function () {
        return '<div class="live_list_item live_list_item_empty">'
                + '     <div class="live_list_item_empty_icon">'
                + '         <img src="' + liveImageUrl + 'live_none.png"/>'
                + '     </div>'
                + '     <div class="live_list_item_empty_text">' + t('view_live_current_none') + '</div>'
                + ' </div>';
    },
    operateListItemSkin: function (isNew) {
        var liveListMiddleHeight = this.getLiveListMiddleHeight();
        $('.live_list_middle').css({height: liveListMiddleHeight});
        if (!LiveVideo.isVideoContainerShowing){
            $('.live_list_container').css({height: liveListMiddleHeight + 40});
        }
    },
    setListItemStatus: function (isEnd) {
        var currentItem = null;
        $('.live_list_item').each(function (i, item) {
            if ($(item).find('.live_watch_btn').data('id') == XLive.currentLiveId) {
                currentItem = $(item);
            }
        });
        if (currentItem) {
            currentItem.data('status', 0);
            currentItem.find('img').attr('src', liveImageUrl + 'live_btn_play.png');
        }
    },
    _caculateListContainerHeight: function () {
        var itemCount = $('.live_list_container .live_list_item').length;
        if (XLive.options.itemCount > 0 && XLive.options.itemCount <= itemCount) {
            return XLive.options.itemCount * 140 + 40;
        }
        return itemCount * 140 + 40;
    },
    _idNoExist: function (id) {
        var ids = [];
        $('.live_list_item').each(function (index, item) {
            ids.push($(item).find('.live_watch_btn').data('id'));
        });
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                return false;
            }
        }
        return true;
    },
    _resetLiveItemBorder: function () {
        if (this._flashElement != null && this._flashElement.is(':animated')) {
            this._flashElement.stop(true);
        }
        if (LiveVideo.isVideoContainerShowing) {
            $('.live_list_item').css({
                height: 140,
                border: 0,
                borderBottom: '1px solid #545454',
                borderColor: '#545454'
            });
        } else {
            $('.live_list_item').css({
                height: 140,
                border: 0,
                borderBottom: '1px solid #EEEEEE',
                borderColor: '#EEEEEE'
            });
        }
    },
    _getFlashingItem: function () {
        var retItem = null;
        $('.live_list_item').each(function (i, item) {
            if ($(item).find('.live_watch_btn').data('id') == LiveList._flashElementId) {
                retItem = $(item);
            }
        });
        return retItem;
    },
    _startFlashing: function () {
        var live_item =$('.live_list_item');
        var isSelf = live_item.find('.live_watch_btn').data('self');
        var $firstItem = $('.live_list_item .live_list_itemborder').eq(0);
        if (!LiveVideo.isVideoContainerShowing &&
            live_item.find('.live_watch_btn').data('is_sub') != 1 && (isSelf == 1 || isSelf === undefined)
        ) {
            this._playMusic();
        } else {
            this.stopMusic();
        }

        var that = this;
        this._stopFlashing();
        this._flashElement = $firstItem;
        $firstItem.css({border:'2px solid #ffffff'});
        this._flashInterval = setInterval(function () {
            var borderColor = '#EEEEEE';
            if (LiveVideo.isVideoContainerShowing){
                borderColor = '#363636';
                if(XLive.currentLiveId == $firstItem.parent().data('id')){
                    borderColor = '#FF9933';
                }
            }
            $firstItem.animate({borderColor: borderColor}, 250).animate({borderColor: '#FF9933'}, 250);
         }, 500);
    },
    _stopFlashing: function () {
        if (this._flashInterval != null) {
            clearInterval(this._flashInterval);
        }
        if (this._flashElement){
            this._flashElement.css({display:'none'});
        }
    },
    _playMusic: function () {
        if (!this._audioElement) {
            this._audioElement = document.createElement('audio');
            this._audioElement.setAttribute('src', liveImageUrl + 'music.mp3');
            this._audioElement.setAttribute('autoplay', 'autoplay');
            $.get();
            if (this.videoIsPlaying) {
                this._audioElement.volume = 0.5;
            }
        }
        if (!this._audioInterval) {
            var that = this;
            this._audioInterval = setInterval(function () {
                that._audioElement.play();
            }, 16000);
        }
    },
    stopMusic: function () {
        if (this._audioElement) {
            this._audioElement.pause();
            this._audioElement = null;
        }
        if (this._audioInterval) {
            clearInterval(this._audioInterval);
            this._audioInterval = null;
        }
    },
    stopFlashingAndMusic: function () {
        // this._resetLiveItemBorder();
        this._stopFlashing();
        this.stopMusic();
        this._flashElementId = null;
    },
    exchangeActiveItem: function ($item) {
        var $listItems = $('.live_list_item');
        $listItems.css({borderBottom: '1px solid #545454', background: '#363636'});
        $listItems.find('.live_watch_btn').data('status', 0);
        $listItems.find('img').attr('src', liveImageUrl + 'live_btn_play.png');

        $('.live_list_item .live_location').css({color: '#ffffff', opacity: '0.9'});
        $('.live_list_top_center').css({color: 'white'});
        $('.live_list_item_user_name').css({color: '#C3C3C3'});
        $('.live_list_item_user_dept').css({color: '#C3C3C3'});
        $('.live_list_item_bottom_left_item').css({color: '#C3C3C3'});
        $('.live_list_item_bottom_left_time').css({color: '#C3C3C3'});
        $('.live_list_bottom .live_arrow').attr('src', liveImageUrl + 'live_arrow.png');
        $item.find('.live_watch_btn img').attr('src', liveImageUrl + 'live_btn_living.gif');
        $item.find('.live_watch_btn').data('status', 1);
        $item.css({background: '#2e7db8'});
        $item.find('.live_list_item_user_name').css({'color': '#fff'});
        $item.find('.live_list_item_user_dept').css({'color': '#fff'});
        $item.find('.live_list_item_bottom_left_item').css({'color': '#fff'});
        $item.find('.live_list_item_bottom_left_time').css({'color': '#fff'});
    },
    getLiveListMiddleHeight:function () {
        var len = $('.live_list_item').length;
        var h ;
        if (XLive.options.itemCount > 0 && XLive.options.itemCount <= len) {
            h = XLive.options.itemCount * 140;
        } else {
            h = len*140;
        }
        return Math.min(XLive.videoContainerHeight - 60,h);
    },
    toggleWatchBtn: function ($btn) {
        this.stopFlashingAndMusic();
        if ($btn.data('status') == 0) {

            var $containerHeight = XLive.videoContainerHeight;

            $('.live_video_controller').hide();
            $('.live_video_top').hide();

            $('.live_list_top').css({borderBottom: '1px solid #545454'});
            $('.live_list_middle').css({height: this.getLiveListMiddleHeight()});
            $('.live_list_top_left img').attr('src', liveImageUrl + 'live_title_left_white.png');

            var currentListItem = $btn.closest('.live_list_item');
            this.exchangeActiveItem(currentListItem);
            LiveVideo.showVideoContainer(function () {

                var uid = $btn.data('uid').toString();
                if (XLive.currentUid == null) {
                    XLive.setCurrentUid(uid, $btn);
                }
                XLive.enterRoom( );
                LiveVideo.showElements();


            });
        } else {
            $btn.data('status', 0);
            $btn.find('img').attr('src', liveImageUrl + 'live_btn_play.png');
            XLive.exitRoomAndHideVideoContainer();
        }
    }
};

var LiveVideo = {
    isVideoContainerShowing: false,
    volumisMute: false,
    currentVolum: 50,
    lastVolumn: 50,
    showVideoContainer: function (callback) {
        console.log('showVideoContainer');
        LiveList.stopMusic();
        this.isVideoContainerShowing = true;
        XLive.lastClickExitTime = new Date().getTime();

        var $containerHeight = XLive.videoContainerHeight;


        $('.live_list_container').animate({
            borderRadius: 0,
            border: 0,
            backgroundColor: '#363636',
            margin: 0,
            height: $containerHeight,
            width: '+=20'
        }, 200, 'swing', function () {
            XLive.options.neighbor.animate({
                width: '-=' + XLive.videoContainerWidth,
                left: XLive.videoContainerWidth
            }, 700);
            $('.live_video_container').css({height: $containerHeight})
                    .show()
                    .animate({width: XLive.videoWidth + 'px'}, 500, 'swing', callback);
        });
    },
    hideVideoContainer: function () {
        this.hideElements();
        this.hideBackground();
        LiveVideo.isVideoContainerShowing = false;

        XLive.options.neighbor.stop().animate({width: '+=' + XLive.videoContainerWidth, left: 0}, 100);
        var $listItem = $('.live_list_item');
        $listItem.attr('disabled', true);
        $('.live_video_container').stop().animate({width: '0px'}, 200, function () {
            $(this).hide();
            $('.live_list_container .live_location').css({color: '#2f8dd5'});
            $('.live_list_container .live_list_item_bottom_left_time').css({color: '#616160'});
            $('.live_list_top_center').css({color: 'black'});
            $('.live_list_item_user_name').css({color: '#616160'});
            $('.live_list_item_user_dept').css({color: '#616160'});
            $('.live_list_top_left img').attr('src', liveImageUrl + 'live_title_left_grey.png');

            $listItem.css({'background': '#fff'});


            var liveListMiddleHeight = LiveList.getLiveListMiddleHeight();
            $('.live_list_middle').stop().animate({height: liveListMiddleHeight}, 200);
            $('.live_list_container').animate({
                borderRadius: 5,
                border: '1px solid #EEEEEE',
                backgroundColor: 'white',
                margin: 15,
                height: liveListMiddleHeight,
                width: '-=20'
            }, 200, 'swing', function () {
                $listItem.attr('disabled', false);
                $('.live_list_top').css({borderBottom: '1px solid #EEEEEE'});
                $('.live_list_item').css({borderBottom: '1px solid #EEEEEE'});
                XLive.options.cancel_callback();
                XLive.refresh();
            });
        });
    },
    hideVideoContainerWrap: function () {
        $('.live_player_volume').data('ionRangeSlider').update({disable: false});
        this.hideVideoContainer();
        $('.live_watch_btn').each(function (i, item) {
            if (XLive.currentUid == $(item).data('uid')) {
                $(item).data('status', 0);
                $(item).find('img').attr('src', liveImageUrl + 'live_btn_play.png');
            }
        });
    },
    resetVideoContainerHeight: function () {
        var newHeight = XLive.videoContainerHeight;
        if (this.isVideoContainerShowing) {
            $('.live_list_container').height(newHeight);
            $('.live_list_middle').height(newHeight - 40);
        }
        $('.live_video_container').height(newHeight);
        if (XLive.videoHeight > 0 && XLive.videoHeight < newHeight - 125) {
            this.resetVideoContainerInnerHeight();
        } else {
            $('.live_video_container_inner').height(newHeight * 0.8);
            $('.live_video_main').height(newHeight * 0.8 * 0.82);
        }
        $('.live_video_top').height(65);
        $('.live_video_controller').height(60);
        this.hideBackground();
    },
    resetVideoContainerInnerHeight: function () {
        var containerHeight = XLive.videoContainerHeight;
        if (containerHeight > window.screen.height) {
            containerHeight = window.screen.height;
        }
        if (XLive.videoHeight > 0 && XLive.videoHeight < containerHeight - 125) {
            var margin = (containerHeight - XLive.videoHeight - 125) / 2;
            $('.live_video_container_inner').css({
                height: XLive.videoHeight,
                top: margin,
                bottom: margin
            });
            $('.live_video_main').height(XLive.videoHeight);
        }
    },
    showElements: function () {
        $('.live_video_top_left').show('slow');
        $('.live_video_top_right').show('slow');
        $('.live_video_controller_left').show('slow');
        $('.live_video_controller_right').show('slow');
        this._showLoading();
    },
    hideElements: function () {
        $('.live_video_top_left').hide();
        $('.live_video_top_right').hide();
        $('.live_video_controller_left').hide();
        $('.live_video_controller_right').hide();
    },
    _showLoading: function () {
        var html = '';
        html += '<div class="live_loading">';
        html += '   <img src="' + liveImageUrl + 'live_loading.png">';
        html += '   <div class="live_video_status_text">' + t('tips_live_load') + '</div>';
        html += '</div>';
        html += '<div class="live_background"></div>';
        $('.live_video_main').html(html);
        $('.live_loading').css({left: (XLive.videoWidth - 231) / 2});
        if (!navigator.onLine) {
            this.showVideoStatusTip(t('tips_live_network'));
        }
    },
    hideLoading: function () {
        $('.live_video_main .live_loading').css({top: '25%'}).hide();
        $('.live_video_controller').show();
        $('.live_video_top').show();
    },
    showBackground: function (width, height, callback) {
        $('.live_video_main .live_background').show().stop().animate({
            width: width,
            height: height,
            top: 0,
            left: 0
        }, 500, 'swing', callback);
    },
    hideBackground: function () {
        $('.live_video_main .live_background').css({
            'left': '50%',
            'top': '50%',
            'width': '20px',
            'height': '20px',
            'display': 'none'
        });
    },
    initRangeSlider: function () {
        var that = this;
        $('.live_player_volume').ionRangeSlider({
            type: 'single',
            min: 0,
            max: 100,
            hide_min_max: true,
            hide_from_to: true,
            grid: false,
            force_edges: true,
            keyboard: true,
            step: 1,
            keyboard_step: 1,
            onFinish: function (data) {
                XLive.setPlayerVolumn(data.from);
                that.currentVolum = data.from;
                if (that.currentVolum > 0) {
                    that.volumisMute = false;
                    $('.btn_volumn').attr('src', liveImageUrl + 'live_volume.png');
                } else {
                    that.volumisMute = true;
                    $('.btn_volumn').attr('src', liveImageUrl + 'live_volume_mute.png');
                }
            }
        });
    },
    resetRangeSlider: function () {
        var $slider = $('.live_video_controller_slider');
        if ($slider) {
            $slider.remove();
            $('.live_video_controller_left').append('<div class="live_video_controller_slider" style="display: none;">'
                    + '<input type="text" class="live_player_volume" value="' + LiveVideo.currentVolum + '" name="live_player_volume"/>'
                    + '</div>');
            this.initRangeSlider();
        }
    },
    showVideoStatusTip: function (msg) {
        $('.live_video_main .live_background').hide();
        $('.live_loading').css({left: (XLive.videoWidth - 231) / 2}).show();
        $('.live_loading .live_video_status_text').show();
        $('.live_video_status_text').text(msg);
        XLive.cancelVideoView();
    },
    setVideoUserInfo: function () {
        if (XLive.currentBtn != null) {
            $('.live_video_top_user_name').text(XLive.currentBtn.data('user') + '-' + XLive.currentBtn.data('dept'));
            $('.live_video_top_user_dept').text('（' + XLive.currentBtn.data('com_name') + '）');
            $('.live_video_top_location').text(XLive.currentBtn.data('loc'));
        }
    }
};

var LiveFull = {
    fullScreenVideoViewOutter: function () {
        var videoTopHeight = 40;
        var videoControllerHeight = $('.live_video_controller').height();
        this._addFullScreenBackground();
        this._addFullScreenTop(videoTopHeight);
        this._addFullScreenController(videoControllerHeight);
        XLive.fullScreenVideoView(videoTopHeight, videoTopHeight + videoControllerHeight);
    },
    _getParent: function () {
        return XLive.videoIsBigScreen ? XLive.options.parent : $('body');
    },
    _addFullScreenBackground: function () {
        var $videoBgFull = $('.live_video_bg_full');
        if ($videoBgFull) {
            $videoBgFull.remove();
        }
        this._getParent().append($('<div class="live_video_bg_full"></div>').css({
            width: '100%',
            height: $(window).height(),
            position: 'absolute',
            left: 0, top: 0,
            zIndex: 9998,
            backgroundColor: '#838383'
        }));
    },
    _addFullScreenTop: function (height) {
        var $videoTopFull = $('.live_video_top_full');
        if ($videoTopFull) {
            $videoTopFull.remove();
        }
        this._getParent().append($('<div class="live_video_top_full"></div>').css({
            width: '100%',
            height: height,
            position: 'absolute',
            left: 0, top: 0,
            zIndex: 9999,
            backgroundColor: 'black'
        }).append('<div class="live_video_top_left">'
                + '     <div class="live_video_top_left_line">'
                + '         <span class="live_video_top_user_name"></span>'
                + '         <span class="live_video_top_user_dept"></span>　'
                + '         <span class="live_video_top_location"></span>'
                + '     </div>'
                + '   </div>'));
        LiveVideo.setVideoUserInfo();
    },
    _addFullScreenController: function (height) {
        var $videoControllerFull = $('.live_video_controller_full');
        if ($videoControllerFull) {
            $videoControllerFull.remove();
        }
        this._getParent().append($('<div class="live_video_controller_full"></div>').css({
            width: '100%',
            height: height,
            position: 'absolute',
            left: 0, bottom: 0,
            zIndex: 9999,
            backgroundColor: '#1A1A1A'
        }).append('<div class="live_video_controller_left">'
                + '         <div class="live_video_controller_volume" style="display: none;">'
                + '             <img class="live_btn_volumn" src="' + liveImageUrl + 'live_volume.png"/>'
                + '         </div>'
                + '         <div class="live_video_controller_slider" style="display: none;">'
                + '             <input type="text" class="live_player_volume" value="' + LiveVideo.currentVolum + '" name="live_player_volume"/>'
                + '         </div>'
                + '   </div>'
                + '   <div class="live_video_controller_center"></div>'
                + '   <div class="live_video_controller_right live_exit_full_btn">'
                + '         <img src="' + liveImageUrl + 'live_exit_full.png"/>'
                + '   </div>'
                + '   <div class="live_video_controller_right live_shot_btn">'
                + '         <img src="' + liveImageUrl + 'live_screenshot.png"/>'
                + '   </div>'));
        $('.live_video_controller_full .live_video_controller_center').css({width: $(window).width() - 360});
        LiveVideo.initRangeSlider();
    },
    clearView: function () {
        $('.live_video_bg_full').remove();
        $('.live_video_top_full').remove();
        $('.live_video_controller_full').remove();
    }
};

