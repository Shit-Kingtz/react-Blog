import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, CameraOutlined } from '@ant-design/icons'

const Header = () => (
    <>
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">Shit-Kingtz</span>
                    <span className="header-txt">
                        能在半年时间里从一个呆萌美少年变身猥琐中年老大叔的神奇男子
                    </span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <HomeOutlined></HomeOutlined>
                            首页
                        </Menu.Item>
                        <Menu.Item key="video">
                            <YoutubeOutlined></YoutubeOutlined>
                            我的视频
                        </Menu.Item>
                        <Menu.Item key="life">
                            <CameraOutlined></CameraOutlined>
                            生活
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    </>
)

export default Header 