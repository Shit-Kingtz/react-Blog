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
                        <span className="header-txt"></span>

                    </Col>
                </Row>
            </div>
        </>
    )
}