import React, { useState, useEffect } from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, CameraOutlined } from '@ant-design/icons'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArr, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo)
                .then(res => {
                    return res.data.data
                })
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) =>{
        if (e.key == 1) {
            Router.push('/')
        } else {
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Shit-Kingtz</span>
                    <span className="header-txt">
                        在半年时间里能从一位呆萌美少年变身猥琐中年老大叔的神奇男子
                    </span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        { 
                            navArr.map(item => {
                                switch (item.icon) {
                                    case 'home':
                                        return (
                                            <Menu.Item key={item.id}>
                                                <HomeOutlined />
                                                {item.typeName}
                                            </Menu.Item>
                                        )
                                    case 'youtube':
                                        return (
                                            <Menu.Item key={item.id}>
                                                <YoutubeOutlined />
                                                {item.typeName}
                                            </Menu.Item>
                                        )
                                    case 'camera':
                                        return (
                                            <Menu.Item key={item.id}>
                                                <CameraOutlined />
                                                {item.typeName}
                                            </Menu.Item>
                                        )
                                }
                            }) 
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header 