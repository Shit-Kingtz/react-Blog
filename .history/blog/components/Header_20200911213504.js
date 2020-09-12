import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => (
    <>
        <div className="header">
            <Row type="flex" justify="center">
                <Col>
                    <span className="header-logo">技术胖</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                </Col>
                <Col>
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <Icon type="home">首页</Icon>
                            
                        </Menu.Item>
                        <Menu.Item key="video">
                            <Icon type="youtube">我的视频</Icon>
                            
                        </Menu.Item>
                        <Menu.Item key="life">
                            <Icon type="smile">生活</Icon>
                            
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    </>
)

export default Header 