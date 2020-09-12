import React from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
    return (
        <>
            <div className="header">
                <Row type="flex" justify="center">
                    <Col>
                        <span className="header-logo"></span>
                    </Col>
                </Row>
            </div>
        </>
    )
}