import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
    return (
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
                                <Icon type="home"></Icon>
                                首页
                            </Menu.Item>
                            <Menu.Item key="video">
                                <Icon type="youtube"></Icon>
                                视频
                            </Menu.Item>
                            <Menu.Item key="video">
                                <Icon type="youtube"></Icon>
                                视频
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </>
    )
}