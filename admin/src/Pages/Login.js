import React, { useState } from 'react';
import 'antd/dist/antd.css'
import { 
    Card, 
    Input, 
    Button, 
    Spin,
    message
} from 'antd'
import { 
    UserOutlined, 
    KeyOutlined 
} from '@ant-design/icons'
import '../static/css/login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
        if (!userName) {
            message.error('请填写用户名')
            return false
        }
        if (!passWord) {
            message.error('请填写密码')
            return false
        }
        
        let params = {userName, passWord}
        axios({
            method: 'POST',
            url: servicePath.checkLogin,
            data: params,
            withCredentials: true,   // 共享session
            headers: { 'Access-Control-Allow-Origin':'*' },
        }).then(res => {
            console.log(res)
            if (res.data.data === '登录成功') {
                setIsLoading(true)
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        })
    }

    return (
        <div className="login-div">
            <Spin tip="登录中..." spinning={isLoading}>
                <Card title="Shit-Kingtz Blog System" bordered style={{width: 400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="用户名"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <br/><br/>
                    <Input.Password
                        id="passWord"
                        size="large"
                        placeholder="密码"
                        prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                    <br/><br/>

                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
            
        </div>
    )
}

export default Login