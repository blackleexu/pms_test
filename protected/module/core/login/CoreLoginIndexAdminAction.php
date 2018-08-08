<?php
/**
 * User: fu
 * Date: 2017/7/25
 * Time: 22:56
 */

namespace module\core\login;


use biz\Session;
use CC;
use CC\action\module\common\DiCreate;
use CC\db\base\select\ItemModel;
use CC\db\base\update\UpdateModel;
use CC\util\common\server\Cookie;
use CC\util\common\server\SessionAbs;
use CC\util\db\enum\UserClassifyEnum;
use CC\util\encrypt\Password;
use CErrorException;
use CJsonData;
use CRedirectData;
use CRenderData;
use CRequest;

class CoreLoginIndexAdminAction extends \CAction
{
    public $company;
    public $account;
    public $pass;
    protected $com_id = 0;
    public $remember;

    protected function encodePass($pass)
    {
        return Password::encode($pass);
    }

    protected function verifyPass($pass, $user_pass)
    {
        return $this->encodePass($pass) == $user_pass;
    }

    protected function setLoginCookie($user)
    {
        $time = time() + 1365 * 86400;
        Cookie::set('core_login_account_company', $this->company, $time);
        Cookie::set('core_login_account_account', $user['account'], $time);
        Cookie::set('core_login_account_name', $user['name'], $time);
        if ($this->remember) {
            Cookie::set('core_login_account_remember', json_encode(array(
                'company' => $this->company,
                'account' => $this->account,
                'pass' => $this->pass,
                'sign' => $this->signRember($this->company, $this->account, $this->pass),
            )), $time);
        }
    }

    protected function signRember($company, $account, $pass)
    {
        return md5(implode('_I_I_', array($company, $account, $pass)));
    }

    protected function setLoginSession($user)
    {
        SessionAbs::login(array(
            'id' => $user['id'],
            'com_id' => $user['com_id'],
            'name' => $user['name'],
            'user_classify' => $user['user_classify'],
            'last_login_time' => $user['last_login_time'],
        ));
        Session::setUserType($user['user_type']);
    }

    protected function onLoginExecute()
    {
        return [];
    }


    private function getCompany()
    {
        if ($this->company !== null) {
            $this->com_id = DiCreate::getInterface()->getComId($this->company);
        }
        return true;
    }

    private function login()
    {
        if (!$this->getCompany()) {
            throw new CErrorException(CC::t('tips_login_com_account_not_exist'));
        }
        $user = $this->getUser();
        if (!$user) {
            throw new CErrorException(CC::t('tips_login_account_not_exist'));
        }
        if (!$this->verifyPass($this->pass, $user['pwd'])) {
            throw new CErrorException(CC::t('tips_login_pwd_incorrect'));
        }
        $this->setLoginCookie($user);
        $this->setLoginSession($user);
        $this->updateLastLoginTime($user);
        $url = $this->request->getUrl()->genurl('/project/index/index');
        if(Session::isSuperAdmin()){
            $url = $this->request->getUrl()->genurl('/project/manage/index');
        }
        return new CJsonData(array_merge([
            'ok' => true,
            'url' => $url,
        ], $this->onLoginExecute()));
    }

    protected function updateLastLoginTime($user)
    {
        if (SessionAbs::getUserClassify() == UserClassifyEnum::ADMIN) {
            UpdateModel::make('admin_user')->addData(array('last_login_time' => time()), $user['id'])->execute();
        } else {
            UpdateModel::make('user')->addData(array('last_login_time' => time()), $user['id'])->execute();
        }
    }

    protected function handleRemember()
    {
        $r = json_decode(Cookie::get('core_login_account_remember'));
        if ($r->sign == $this->signRember($r->company, $r->account, $r->pass)) {
            $this->company = $r->company;
            $this->account = $r->account;
            $this->pass = $r->pass;
            $this->remember = 1;
            $_POST['company'] = $r->company;
        }
    }

    public function execute(CRequest $request)
    {
        $this->handleRemember();
        if(Session::isSuperAdmin()){
            return new \CRedirectData('project/manage/index');
        }
        if (SessionAbs::isLogin()) {
            return new CRedirectData('project/index/index', []);
        }
        if ($request->hasPost()) {
            return $this->login();
        }
        return new CRenderData([], $this->getView(), false,null,$this->getViewDir());
    }

    protected function getViewDir()
    {
        return __DIR__;
    }

    protected function getView()
    {
        return '';
    }

    protected function getUser()
    {
        $user = ItemModel::make('admin_user')->addColumnsCondition([
            'account' => $this->account,
            'com_id' => $this->com_id,
        ])->execute();
        if ($user) {
            $user['user_classify'] = UserClassifyEnum::ADMIN;
        }
        if (!$user) {
            $user = ItemModel::make('user')->addColumnsCondition([
                'account' => $this->account,
                'com_id' => $this->com_id,
                'is_delete' => 0,
            ])->execute();
            if ($user) {
                $user['user_classify'] = UserClassifyEnum::USER;
            }
        }
        return $user;
    }

}