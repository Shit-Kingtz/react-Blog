import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List,  } from 'antd'
import { CalendarOutlined, YoutubeOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import Marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import '../styles/pages/index.css'


const Home = (list) => {
  const [articles, setList] = useState(list.data)
  const renderer = new Marked.Renderer()

  Marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            header={ <div>最新日志</div> }
            itemLayout="vertical"
            dataSource={ articles }
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
                    {item.view_count}人
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{__html: Marked(item.introduce)}}
                ></div>
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList)
      .then(res => {
        resolve(res.data)
      })
      
  })

  return await promise
}

export default Home
