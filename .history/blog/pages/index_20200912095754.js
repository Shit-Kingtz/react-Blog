import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List,  } from 'antd'
import { HomeOutlined, YoutubeOutlined, CameraOutlined } from '@ant-design/icons'
import Header from '../components/Header'

export default function Home() {
  

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          左侧
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </div>
  )
}