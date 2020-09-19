import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, YoutubeOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import Link from 'next/link'


const myList = (props) => {
  const [list, setList] = useState(props.data)
  useEffect(() => setList(props.data))

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            header={ <div>最新日志</div> }
            itemLayout="vertical"
            dataSource={ list }
            renderItem={ item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed', query:{id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <CalendarOutlined />
                  {item.addTime}
                  <YoutubeOutlined />
                  {item.typeName}
                  <FireOutlined />
                  {item.view_count}
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />

        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

myList.getInitialProps = async (context) => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + context.query.id)
      .then(res => resolve(res.data))
  })

  return await promise
}

export default myList