<?php

/**
 * User: fu
 * Date: 2016/3/10
 * Time: 14:30
 */
return array_merge_recursive(include __DIR__ . '/../../conf.php', array(
    'params' => array(//自定义参数
        'bgtask_fail_fn' => function ($id,$msg) {
        },

    ),
    'cc_class_config' => array(
        'response/CRenderData' => array(
            'groupLayouts' => array(
                'admin' => '/layouts/simple',
                'wx' => '/layouts/mobile',
            ),
        ),
        'util/encrypt/Password' => array(
            'salt' => '8Z6UYmJv5FPbdTgbtk9AK6D2QGBvZG26',
        )
    ),
    'di' => array(
        'conf' => include __DIR__.'/di.php',
    ),
    'env' => array(
        'api' => 'api,userapi',
        'web' => 'admin,xbwqLink',
        'cmd' => 'cmd',
        'sign' => array(
            'timesign' => 600,
            'sign_secretkey' => 'RThXxpuR5n9p7CYSTWFy5awyBYnXeBdj',
            'no_sign_action' => array(
                array('action' => '/share/link/down'),
            )
        )
    )
));
