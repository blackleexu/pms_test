var XLive = {
    videoWidth: 0,
    videoHeight: 0,
    videoContainerWidth: 0,//listWidth + videoWidth
    videoContainerHeight: 0,

    options: {
        parent: $('.content'),
        neighbor: $('#container'),
        itemCount: 0,
        customListItem: function (data) {
            return '';
        },
        callback: function (count, height) {
        },
        newListCallback: function (resData) {

        },
        cancel_callback: function () {
        },
        startAnimate_callback:function (uid,type) {
        },
        success_callback:function () {
            
        }
    },

    _parentHeight: 0,

    lastClickTime: new Date().getTime() - 3000,
    lastClickExitTime: 0,
    videoIsPlaying: false,
    videoIsFullScreen: false,
    videoIsBigScreen: false,
    currentUid: null,
    currentBtn: null,
    currentLiveId: 0,

    _needTipClientIsEnd: false,

    _requestDataInterval: null,
    _requestLiveStatusInterval: null,

    init: function (loginInfo, videoWidth, videoHeight) {
        QavSdKObject.init(loginInfo);
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.videoContainerWidth = this.videoWidth + 300;
        return this;
    },
    setOptions: function (options) {
        this.options = $.extend(this.options, options);
        return this;
    },
    show: function () {
        this._beforeShow();
        LiveList.show();
        this._init();
    },
    setCurrentUid: function (uid, $btn) {
        this.currentUid = uid;
        this.currentBtn = $btn;
        LiveVideo.setVideoUserInfo();
    },
    login: function () {

        QavSdKObject.login();
    },
    logout: function () {
        QavSdKObject.logout();
    },
    _beforeShow: function () {
        this.options.parent.css({position: 'relative'});
        this._parentHeight = this.options.parent.height();
        this.videoContainerHeight = this._parentHeight;
    },
    _init: function () {

        $(document).keyup(function (event) {
            if (event.keyCode == 27) {
                XLive.exitFullVideoView();
                if (XLive.videoIsBigScreen) {
                    XLive.videoIsBigScreen = false;
                }
                LiveFull.clearView();
                LiveVideo.resetRangeSlider();
            }
        });

        XLive.initLiveVideo();
        XLive.refresh();
        XLive.requestLiveData();

        if (is32IE()) {
            XLive.login();
        }

        $('.live_list_container').on('mouseenter', '.live_list_itemborder', function () {
            console.log('mouseenter');
            if ($(this).is(':animated')) {
                LiveList.stopFlashingAndMusic();
            }
        }).on('click', '.live_list_item', function () {
            console.log('cllick');
            if (!$(this).hasClass('live_list_item_empty')) {
                if (!isIE()) {
                    Tip(t('tips_live_ie'));
                    return false;
                }
                if (!is32IE()) {
                    Tip(t('tips_live_ie_32'));
                    return false;
                }
                var $watchBtn = $(this).find('.live_watch_btn');
                var clickUid = $watchBtn.data('uid').toString();
                if (clickUid == sessionUid) {
                    Tip(t('tips_live_conflict'));
                    return false;
                }


                var currentTime = new Date().getTime();
                console.log('time:',currentTime - XLive.lastClickTime);
                if (currentTime - XLive.lastClickTime > 3000) {

                    var $item = $(this);
                    XLive.lastClickTime = currentTime;
                    XLive.currentLiveId = $watchBtn.data('id');

                    XLive.options.startAnimate_callback(XLive.currentLiveId,$watchBtn.data('status'));
                    if (XLive.currentUid != null && clickUid != XLive.currentUid) {

                        LiveList.stopFlashingAndMusic();
                        LiveList.exchangeActiveItem($item);
                        LiveVideo.showVideoStatusTip(t('tips_live_switch'));
                        LiveVideo.hideBackground();
                        XLive.setCurrentUid(clickUid, $watchBtn);
                        XLive.exitRoom(true);
                    } else {
                        LiveList.toggleWatchBtn($watchBtn);
                    }
                }
            }
        });

        $('body').on('click', '.live_shot_btn', function () {
            XLive.snapShotAndOutput();
        }).on('click', '.live_full_btn', function () {
            var currentTime = new Date().getTime();
            if (XLive.lastClickTime > 0 && currentTime - XLive.lastClickTime > 3000) {
                LiveFull.fullScreenVideoViewOutter();
            }
        }).on('click', '.live_exit_btn', function () {
            var currentTime = new Date().getTime();
            if (XLive.lastClickTime > 0 && currentTime - XLive.lastClickTime > 3000) {
                XLive.exitRoomAndHideVideoContainer();
            }
        }).on('click', '.live_exit_full_btn', function () {
            XLive.exitFullVideoView();
        }).on('click', '.live_btn_volumn', function () {
            if (LiveVideo.volumisMute) {
                XLive.setPlayerVolumn(LiveVideo.lastVolumn);
                LiveVideo.currentVolum = LiveVideo.lastVolumn;
                $('.live_player_volume').data('ionRangeSlider').update({from: LiveVideo.lastVolumn});
                LiveVideo.volumisMute = false;
                $('.live_btn_volumn').attr('src', liveImageUrl + 'live_volume.png');
            } else {
                LiveVideo.lastVolumn = LiveVideo.currentVolum;
                XLive.setPlayerVolumn(0);
                LiveVideo.currentVolum = 0;
                $('.live_player_volume').data('ionRangeSlider').update({from: 0});
                LiveVideo.volumisMute = true;
                $('.live_btn_volumn').attr('src', liveImageUrl + 'live_volume_mute.png');
            }
        }).attr('onkeydown', 'if(event.keyCode==122){event.keyCode=0;return false}');

        $(document).on('fullscreen_in', function () {
            XLive.bigScreenVideoView();
        }).on('fullscreen_out', function () {
            XLive.exitBigVideoView();
        });

        window.onbeforeunload = function () {
            XLive.cancelVideoView();
            XLive.logout();
        }
    },
    initLiveVideo: function () {
        LiveVideo.hideElements();
        LiveVideo.initRangeSlider();
        LiveVideo.resetVideoContainerInnerHeight();
    },
    enterRoom: function (suc_fn) {
        QavSdKObject.enterRoom(this.currentUid,function () {
            QavSdKObject.currentStatus = QavSdKObject.qStatusType.enter_room;
            QavSdKObject.enterRoomSuccess();
            if (suc_fn){
                suc_fn();
            }
        },function () {
            XLive._setVideoEnd(true);
            XLive._setVideoErrorEnd();
        });
    },
    exitRoom: function (needEnter) {
        QavSdKObject.exitRoom(needEnter);
    },
    exitRoomAndHideVideoContainer: function () {
        QavSdKObject.cancelVideoView();
        QavSdKObject.exitRoom(false);
        LiveVideo.hideVideoContainerWrap();
        XLive.currentLiveId = 0;
    },
    cancelVideoView: function () {
        QavSdKObject.cancelVideoView();
    },
    snapShotAndOutput: function () {
        QavSdKObject.snapShotAndOutput();
    },
    setPlayerVolumn: function (volume) {
        QavSdKObject.setPlayerVolumn(volume);
    },
    fullScreenVideoView: function (posY, hOffset) {
        QavSdKObject.fullScreenVideoView(posY, hOffset);
    },
    exitFullVideoView: function () {
        QavSdKObject.exitFullVideoView(function () {
            LiveFull.clearView();
            LiveVideo.resetRangeSlider();
        });
    },
    bigScreenVideoView: function () {
        this.videoIsBigScreen = true;
        this._switchBigVideoView();
    },
    exitBigVideoView: function () {
        this.videoIsBigScreen = false;
        this._switchBigVideoView();
    },
    _switchBigVideoView: function () {
        if (this.videoIsBigScreen) {
            this.videoContainerHeight = window.screen.height;
        } else {
            this.videoContainerHeight = this._parentHeight;
        }
        LiveVideo.resetVideoContainerHeight();
        if (this.videoIsFullScreen) {
            LiveFull.fullScreenVideoViewOutter();
        } else {
            if (XLive.videoIsPlaying) {
                QavSdKObject.resetVideoView(false);
            }
        }
    },
    refresh: function () {
        this._requestLiveDataInternal(true);
    },
    _requestLiveDataInternal: function () {
        var that = this;
        var reqData = {};
        if (that._needTipClientIsEnd) {
            Tip(t('tips_live_interrupt'));
            that._needTipClientIsEnd = false;
        }
        $.ajax({
            url: liveListUrl,
            data: reqData,
            type: 'post',
            dataType: 'json',
            success: function (res) {
                if (res['ok']) {
                    LiveList.createLiveList(res);
                }
            }
        });
    },
    requestLiveData: function () {
        if (!this._requestDataInterval) {
            var that = this;
            this._requestDataInterval = setInterval(function () {
                that._requestLiveDataInternal(false);
            }, 5000);
        }
    },
    clearLiveStatusInterval: function () {
        if (this._requestLiveStatusInterval) {
            clearInterval(this._requestLiveStatusInterval);
        }
    },
    requestLiveStatusInterval: function () {
        var that = this;
        this._requestLiveStatusInterval = setInterval(function () {
            that._requestLiveStatus();
        }, 5000);
    },
    _requestLiveStatus: function () {
        var that = this;
        if (navigator.onLine) {
            $.ajax({
                url: liveStatusUrl,
                data: {id: XLive.currentLiveId},
                type: 'post',
                dataType: 'json',
                success: function (res) {
                    if (res['ok']) {
                        if (res['is_back']) {
                            $('.live_video_controller_center').html('');
                        } else if (res['is_end']) {
                            that._setVideoEnd();
                        } else if (res['is_error']) {
                            that._setVideoEnd(true);
                            that._setVideoErrorEnd();
                        } else if (res['is_interrupt']) {
                            $('.live_video_controller_center').html(t('tips_live_interrupt_retry'));
                        } else if (res['is_mute']) {
                            $('.live_video_controller_center').html(t('tips_live_close_sound'));
                        } else {
                            $('.live_video_controller_center').html('');
                        }
                    }
                }
            });
        } else {
            LiveVideo.showVideoStatusTip(t('tips_live_network'));
            that._setVideoInterrupt();
        }
    },
    _setVideoEnd: function (is_error) {
        this.exitFullVideoView();
        LiveList.setListItemStatus(true);
        if (!is_error) {
            this._needTipClientIsEnd = true;
        }
        XLive.exitRoomAndHideVideoContainer();
    },
    _setVideoErrorEnd: function () {
        $.ajax({
            url: liveEndUrl + '?id=' + XLive.currentLiveId,
            data: {},
            type: 'post',
            dataType: 'json',
            success: function (res) {
            }
        });
    },
    _setVideoInterrupt: function () {
        this.exitFullVideoView();
        QavSdKObject.clearRequestViewInterval();
        QavSdKObject.requestViewList();
    }
};

var QavSdKObject = {
    qEventType: {
        'LOGIN': 3144,
        'START_CONTEXT': 3146,
        'STOP_CONTEXT': 3147,
        'ENTER_ROOM': 3148,
        'EXIT_ROOM': 3149,
        'ROOM_MEMBERS_CHANGE': 3150,
        'REQUEST_VIEW_LIST': 3153,
        'CANCEL_ALL_VIEW': 3154,
        'MIC_STATUS_CHANGE': 3155,
        'PLAYER_STATUS_CHANGE': 3156,
        'CAMERA_STATUS_CHANGE': 3158,
        'SCREEN_SHOT': 3160,
        'START_RECORD_VIDEO': 3161,
        'STOP_RECORD_VIDEO': 3162
    },
    qStatusType: {
        login: 1,            //logined SDK
        start_context: 2,    //started SDK
        enter_room: 3        //entered room
    },
    _qEndPointType: {
        only_image: 1,
        only_sound: 2,
        image_sound: 3
    },
    currentStatus: null,    //from qStatusType
    loginInfo: null,
    _needEnterAfterExitRoom: false,
    _requestViewInterval: null,
    _endPointInterval: null,
    options: {
        sanpShotPath: 'c:\\videoPics'
    },
    _getIdentifer: function () {
        return XLive.currentUid + '_app';
    },
    sdk:null,
    sdk_render:null,
    sdk_offline:false,
    init:function (loginInfo){
      this.loginInfo = loginInfo;
    },
    login: function () {
        console.log('[start login]');
        // qavSdk.Login(this.loginInfo.sdkAppID, this.loginInfo.accountType, this.loginInfo.sdkAppID,
        //     this.loginInfo.identifier, this.loginInfo.userSig);
        var that = this;
        this.sdk = new ILiveSDK(that.loginInfo.sdkAppID, that.loginInfo.accountType, "qavSdk");

        this.sdk_render = new ILiveRender('qavSdk_render');
        that.sdk.init(function () {
            console.log('sdk init ok');
            that.sdk.login(that.loginInfo.identifier, that.loginInfo.userSig, function () {
                console.log('sdk login ok');
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
                that.sdk.setForceOfflineListener(function() {
                    alert("您的账号已在其他电脑上登录。");
                    that.sdk_offline = true;
                });
            }, function (errMsg) {
                alert("视频回传登录失败,错误码:" + errMsg.code + " 错误信息:" + errMsg.desc);
            });
        }, function (errMsg) {
            alert("视频回传初始失败，错误码:" + errMsg.code + " 错误信息:" + errMsg.desc+',请右键以管理员身份运行！');
        });

    },
    startContext: function () {
        console.log('[start context]');
        console.log('qavSdk',qavSdk);
        qavSdk.StartContext(this.loginInfo.sdkAppID, this.loginInfo.accountType, this.loginInfo.sdkAppID,
            this.loginInfo.identifier, this.loginInfo.userSig);
    },
    logout: function () {
        console.log('[stop context]');
        this.exitRoom(false,function () {
            QavSdKObject.sdk.logout(function () {
                // alert("logout succ");
            }, function (errMsg) {
                // alert("错误码:" + errMsg.code + " 错误信息:" + errMsg.desc);
            });

        });
        // qavSdk.StopContext();
    },
    enterRoom: function (room_id,suc_fn,err_fn) {
        if (!room_id || this.currentStatus != this.qStatusType.start_context) {
            console.log('[start enter room failed] room_id : ' + room_id + ', status : ' + this.currentStatus);
            Tip('网络异常，请刷新页面后重试','error');
            return;
        }
        console.log('[start enter room] room_id : ' + room_id);
        // qavSdk.EnterRoom(2, 6, room_id, 1, 0);
        var authBits =  E_iLiveAuthBits.AuthBit_Guest;
        var that = this;
        this.sdk.joinRoom(room_id, authBits,  "Guest",function () {
            console.log('[enter room] Success ' + room_id);
            var devices = QavSdKObject.sdk.getSpeakerList();
            if (devices.devices){
                for(var i in devices.devices){
                    QavSdKObject.sdk.openSpeaker(devices.devices[i].id);
                }
            }
            suc_fn();
        }, function (errMsg) {
            console.log('[enter room] error ' + room_id);
            Tip(t('tips_live_interrupt'));
            console.error("视频回传进入房间失败，错误码:" + errMsg.code + " 错误信息:" + errMsg.desc);
           if (err_fn){
               err_fn();
           }
           return;
        });

    },
    exitRoom: function (needEnter,fn) {
        this._needEnterAfterExitRoom = needEnter;
        if (this.currentStatus == this.qStatusType.enter_room && !this.sdk_offline) {
            console.log('[start exit room] room_id : ' + XLive.currentUid);
            this.sdk.quitRoom(function () {
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
                QavSdKObject.exitRoomSuccess();
                if (fn){
                    fn();
                }
            }, function (errMsg) {
                console.error("视频回传退出房间失败,错误码:" + errMsg.code + " 错误信息:" + errMsg.desc);
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
                QavSdKObject.exitRoomSuccess();
                if (fn){
                    fn();
                }
            });
        }else{
            console.log('[start exit room] room_id else : ' + XLive.currentUid);
            QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
            QavSdKObject.exitRoomSuccess();
            if (fn){
                fn();
            }
        }
    },
    snapShotAndOutput: function () {
        console.log('[start snap shot]');
        var s = QavSdKObject.sdk_render.snapShot();
        var newwin=window.open('','_blank','toolbar=no, witch=1280, height=760 , location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes');
        		  newwin.opener = null ;
        		  newwin.document.write('<div style="text-align: center"><h3>在图片上点右键 "图片另存为..." 保存截图</h3><img src="'+s+'"></div>');

        // qavSdk.SnapShotAndOutput(this._getIdentifer(), 0, this.options.sanpShotPath, 1);
    },
    _openPlayer: function () {
        console.log('[open player]');
        // qavSdk.OpenPlayer();
    },
    setPlayerVolumn: function (volume) {
        console.log('[set player volumn] : ' + volume);
        qavSdk.SetPlayerVolumn(volume);
    },
    requestViewList: function () {
        var that = this;
        this._requestViewList();
        // this._requestViewInterval = setInterval(function () {
        //     that._requestViewList();
        // }, 5000);
    },
    _requestViewList: function () {
        var identifier = this._getIdentifer();
        console.log('[start request view] id : ' + identifier);
        this.sdk_render.setIdentifer(identifier);
        QavSdKObject.requestViewSuccess();

        // qavSdk.requestViewList([identifier]);
    },
    clearRequestViewInterval: function () {
        if (this._requestViewInterval) {
            clearInterval(this._requestViewInterval);
        }
    },
    _requestEndPointInterval: function () {
        this._clearEndPointInterval();
        var that = this;
        //this._endPointInterval = setInterval(function () {
            // that.getEndpointAVMode();
        //}, 5000);
    },
    _clearEndPointInterval: function () {
        if (this._endPointInterval) {
            clearInterval(this._endPointInterval);
        }
    },
    getEndpointAVMode: function () {
        if (XLive.currentUid) {
            var that = this;
            var status = qavSdk.GetEndpointAVMode(this._getIdentifer());
            console.log('[end point status] : ' + status);
            if (status != this._qEndPointType.only_image && status != this._qEndPointType.image_sound) {//not open camera
                setTimeout(function () {
                    that._requestViewList();
                }, 5000);
            }
        }
    },
    openVideoView: function () {
        if (this.currentStatus < this.qStatusType.enter_room) {
            console.log('[openVideoView failed] status : ' + this.currentStatus);
            return;
        }
        if (XLive.currentUid != this.loginInfo.identifier) {
            this._openPlayer();
            XLive.requestLiveStatusInterval();
            this.requestViewList();
        }
    },
    cancelVideoView: function () {
        if (XLive.currentUid) {
            var identifier = this._getIdentifer();
            console.log('[cancel specify view] id : ' + identifier);
            QavSdKObject.SetVideoWinPos(identifier, 0, 0, 0, 0);
        }
        console.log('[cancel all view]');
        // qavSdk.CancelAllView();
        this.sdk_render.setIdentifer('');
        XLive.videoIsPlaying = false;
    },
    SetVideoWinPos:function (identifier,posX,poxY,width,height) {
        qavSdk_render.style.left = posX+'px';
        qavSdk_render.style.top = poxY+'px';
        qavSdk_render.style.width = width+'px';
        qavSdk_render.style.height = height+'px';
    },
    resetVideoView: function (isReloc) {
        var $view = $('.live_video_main');
        var width = $view.width();
        var height = $view.height();
        var posx = this._getViewDivPosX($view, isReloc);
        var posy = this._getViewDivPosY($view, isReloc);
        if (XLive.currentUid) {
            console.log('[start reset video view]');
            QavSdKObject.SetVideoWinPos(this._getIdentifer(), posx, posy, width, height);
        }
    },
    fullScreenVideoView: function (posY, hOffset) {
        var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
        docHeight -= hOffset;

        var videoWidth = docHeight < docWidth ? docHeight : docWidth;
        var posX = (docWidth - docHeight) / 2;

        if (XLive.videoWidth > 0 && XLive.videoHeight > 0) {
            videoWidth = XLive.videoWidth * docHeight / XLive.videoHeight;
            posX = (docWidth - videoWidth) / 2;
        }

        posX = posX > 0 ? posX : 0;
        console.log('[start full screen video view]');
        console.log('posX:' + posX + ',posY:' + posY + ',width:' + videoWidth + ',height:' + docHeight);
        QavSdKObject.SetVideoWinPos(this._getIdentifer(), posX, posY, videoWidth, docHeight);
        XLive.videoIsFullScreen = true;
    },
    exitFullVideoView: function (callback) {
        if (XLive.videoIsFullScreen) {
            callback();
            this.resetVideoView(true);
            XLive.videoIsFullScreen = false;
        }
    },
    _getViewDivPosX: function ($view, isReloc) {
        var posx = $view.offset().left;
        if (isReloc) {
            posx -= this._getDocLeft();
        }
        return Math.round(posx);
    },
    _getViewDivPosY: function ($view, isReloc) {
        var posy = $view.offset().top;
        if (isReloc) {
            posy -= this._getDocTop();
        }
        return Math.round(posy);
    },
    _getDocTop: function () {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },
    _getDocLeft: function () {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    },
    stopContextSuccess: function () {
        XLive.currentUid = null;
        this.loginInfo.identifier = null;
        this.loginInfo.userSig = null;
        this.cancelVideoView();
    },
    enterRoomSuccess: function () {
        var that = this;
        setTimeout(function () {
            console.log('that.options',that.options);
            XLive.options.success_callback();
            that.openVideoView();
        }, 100);
    },
    exitRoomSuccess: function () {
        XLive.clearLiveStatusInterval();
        this.clearRequestViewInterval();
        this._clearEndPointInterval();
        if (this._needEnterAfterExitRoom) {
            console.log('[exit_room_and_enter] room_id : ' + XLive.currentUid);
            setTimeout(function () {
                XLive.enterRoom();
            },200);
        } else {
            XLive.currentUid = null;
            console.log('[exit_room success]');
        }
        this._needEnterAfterExitRoom = false;
    },
    requestViewSuccess: function () {
        LiveList.stopMusic();
        LiveVideo.hideLoading();

        var $view = $('.live_video_main');
        var width = $view.width();
        var height = $view.height();
        var posX = this._getViewDivPosX($view);
        var posY = this._getViewDivPosY($view);
        var that = this;

        LiveVideo.showBackground(width, height, function () {
            QavSdKObject.SetVideoWinPos(that._getIdentifer(), posX, posY, width, height);
            XLive.videoIsPlaying = true;
            XLive.lastClickExitTime = new Date().getTime();
            that.clearRequestViewInterval();
            that._requestEndPointInterval();
        });
    }
};

/**
 * @param evt event type
 * @param result 0=success others=fail
 * @param oper opt type，evt=3155、3156、3158 is valid
 * @param vcnt room members count，evt=3150 is valid
 * @param vusers room members list，evt=3150 is valid
 * @param info additional information
 * @param picBase64Str
 */
function qavsdk_eventcallback(evt, result, oper, vcnt, vusers, info, picBase64Str) {
    if (result == 0) {
        switch (evt) {
            case QavSdKObject.qEventType.LOGIN:
                console.log('[login success]');
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.login;
                QavSdKObject.startContext();
                break;
            case QavSdKObject.qEventType.START_CONTEXT:
                console.log('[start context success]');
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
                break;
            case QavSdKObject.qEventType.STOP_CONTEXT:
                console.log('[stop context succss]');
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.login;
                QavSdKObject.stopContextSuccess();
                break;
            case QavSdKObject.qEventType.ENTER_ROOM:
                console.log('[enter_room success] room_id : ' + XLive.currentUid);
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.enter_room;
                QavSdKObject.enterRoomSuccess();
                break;
            case QavSdKObject.qEventType.EXIT_ROOM:
                QavSdKObject.currentStatus = QavSdKObject.qStatusType.start_context;
                QavSdKObject.exitRoomSuccess();
                break;
            case QavSdKObject.qEventType.ROOM_MEMBERS_CHANGE:
                break;
            case QavSdKObject.qEventType.REQUEST_VIEW_LIST:
                console.log('[request_view_success]');
                QavSdKObject.requestViewSuccess();
                break;
            case QavSdKObject.qEventType.CANCEL_ALL_VIEW:
                console.log('cancel all view success]');
                break;
            case QavSdKObject.qEventType.SCREEN_SHOT:
                alert(t('tip_screen_shot') + info);
                break;
            default :
                break;
        }
    } else {
        console.log("callback error，evt=" + evt);
    }
}
