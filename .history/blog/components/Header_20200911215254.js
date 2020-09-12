import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, CameraOutlined } from '@ant-design/icons'

const Header = () => (
    <>
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={}>
                    <span className="header-logo">技术胖</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                </Col>
                <Col>
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