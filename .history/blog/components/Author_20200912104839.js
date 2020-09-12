import { Avatar, Divider } from 'antd'
import { GithubOutlined, WechatOutlined, ZhihuOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author = () => (
    <>
        <div className="author-div comm-box">
            <div><Avatar size={100} src="../public/ava"></Avatar></div>
            <div className="author-introduction">
                在半年时间里能从一位呆萌美少年变身猥琐中年老大叔的神奇男子
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<ZhihuOutlined />} className="account"></Avatar>
            </div>
        </div>
    </>
    
)

export default Author