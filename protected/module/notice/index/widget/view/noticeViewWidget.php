<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16
 * Time: 18:34
 */

use CC\util\common\server\SessionAbs;

?>


<div class="header_notice_up hid" >
    <div>
        <div class="ant-popover popover___cmOXZ ant-popover-placement-bottomRight"
             style="left: 52px; top: 48px; transform-origin: 316px 16px 0px;">
            <div class="ant-popover-content">
                <div class="ant-popover-arrow"></div>
                <div class="ant-popover-inner">
                    <div>
                        <div class="ant-popover-inner-content">
                            <div class="ant-spin-nested-loading">
                                <div class="ant-spin-container">
                                    <div class="ant-tabs ant-tabs-top tabs___2owAK ant-tabs-line">
                                        <div role="tablist" class="ant-tabs-bar" tabindex="0">
                                            <div class="ant-tabs-nav-container">
                                                                <span unselectable="unselectable" class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled">
                                                                    <span class="ant-tabs-tab-prev-icon"></span></span>
                                                <span unselectable="unselectable" class="ant-tabs-tab-next ant-tabs-tab-btn-disabled">
                                                                    <span class="ant-tabs-tab-next-icon"></span>
                                                                </span>
                                                <div class="ant-tabs-nav-wrap">
                                                    <div class="ant-tabs-nav-scroll">
                                                        <div class="ant-tabs-nav ant-tabs-nav-animated">
                                                            <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
                                                                 style="display: block; transform: translate3d(0px, 0px, 0px); width: 81px;">

                                                            </div>
                                                            <div role="tab" aria-disabled="false"
                                                                 aria-selected="true"
                                                                 class="ant-tabs-tab-active ant-tabs-tab">通知 <?php //echo count($notice)?>
                                                            </div>
                                                            <!--<div role="tab" aria-disabled="false"
                                                                 aria-selected="false" class=" ant-tabs-tab">消息 (3)
                                                            </div>
                                                            <div role="tab" aria-disabled="false"
                                                                 aria-selected="false" class=" ant-tabs-tab">待办 (4)
                                                            </div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ant-tabs-content ant-tabs-content-animated" style="margin-left: -100%;">
                                            <div role="tabpanel" aria-hidden="true" class="ant-tabs-tabpane ant-tabs-tabpane-inactive">
                                            </div>
                                            <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active">
                                                <?php if ($notice) :?>
                                                <div class="ant-list list___2JaJ7 ant-list-split">
                                                    <?php foreach ($notice as $item) :;?>
                                                        <div class="ant-list-item item___7RfRh">
                                                            <div class="ant-list-item-meta meta___3gImI">
                                                                <div class="ant-list-item-meta-avatar">

                                                                </div>
                                                                <div class="ant-list-item-meta-content">
                                                                    <h4 class="ant-list-item-meta-title">
                                                                        <div class="title___3p8j5"><?php if ($item['sname']== SessionAbs::getName()){echo '我';} else { echo $item['sname'];}?> 　
                                                                            <?php echo nl2br($item['title']) ?>
                                                                            <div class="extra___hkmfn"></div>
                                                                        </div>
                                                                    </h4>
                                                                    <div class="ant-list-item-meta-description">
                                                                        <div>
                                                                            <div class="description___2nwM2" title="<?php echo htmlentities($item['content'],ENT_QUOTES,"UTF-8")?>">
                                                                                <?php  echo  nl2br($item['content'])  ?>
                                                                            </div>
                                                                            <div class="datetime___1aLl2"><?php echo date('Y-m-d H:i:s', $item['time'])?></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    <?php endforeach?>
                                                </div>
                                                <?php else:?>
                                                    <div class="nobodyone" style="height: 50px;line-height: 50px;text-align: center">
                                                        无
                                                    </div>
                                                <?php endif;?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>

        $('.header_notice').click(function (e) {
            $(this).find('.header_notice_up').toggleClass('hid');
            $.ajax({
                url : baseUrlGroup+"/notice/index/issee",
                type : 'post',
                data : {
                    aid : <?php echo SessionAbs::getUserID()?>
                },
                success : function (msg) {
                    if (msg.ok) {
                        $('.notice_title').remove();
                    }
                }
            })
            event.stopPropagation();
        });

        var times = setInterval(function () {
            ajax_request("<?php echo CC::app()->url->genurl('notice/index/poll')?>",{},function (data) {
                $('.ant-scroll-number-only').html(data.num);
            },'json',true);
        },10000)
    </script>
