import { Avatar, Divider } from 'antd'
import { GithubOutlined, WechatOutlined, ZhihuOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author = () => (
    <>
        <div className="author-div common-box">
            <div><Avatar size="150" src="http://p1.music.126.net/pyQ_4KNWDO51IT3J6Vnntw==/3249056863850846.jpg?param=180y180"></Avatar></div>
            <div className="author-introduction">
                在半年时间里能从一位呆萌美少年变身猥琐中年老大叔的神奇男子
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className="account">
                    
                </Avatar>
                <Avatar size={28} icon={} className="account">
                </Avatar>
            </div>
        </div>
    </>
    
)

export default Author