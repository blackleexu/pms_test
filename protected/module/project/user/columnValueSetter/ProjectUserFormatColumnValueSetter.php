<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/16
 * Time: 15:27
 */
namespace module\project\user\columnValueSetter;
use CC\util\common\widget\listColumn\ColumnValueSetterAbs;
use module\project\manage\enum\DutyTypeEnum;

class ProjectUserFormatColumnValueSetter extends ColumnValueSetterAbs
{

    /**
     * @param $data
     * @return string | array
     */
    protected function onBuild($data)
    {
        $str = '';
        $arr = [];

        if ($data['users']) {
            foreach ($data['users'] as $key => $item) {
                $arr[$item['pro_func']][] = $item;
            }
        }
        foreach (DutyTypeEnum::getValues() as $ke => $va) {

            foreach ($arr as $i => $user) {
                if ($ke == $i) {
                    $str .= '<div><span style="display: inline-block;width: 80px;text-align: right;">' . DutyTypeEnum::getValueByIndex($i) . '</span>：';

                    foreach ($user as $keys => $value) {
                        if ($value['is_main'] == 1) {
                            $str .= '<span  style="color: #000"' ;
                            $str .= '>' . $value['name'] . '　</span>';
                        }
                    }
                    foreach ($user as $keys => $value) {
                        if ($value['is_main'] == 0) {
                            $str .= '<span ';
                            $str .= '>' . $value['name'] . '　</span>';
                        }
                    }
                    $str .= '</div>';
                }

            }
        }

        return $str;
    }
}