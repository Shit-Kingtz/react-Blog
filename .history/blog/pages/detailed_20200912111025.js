import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { CalendarOutlined, YoutubeOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

import '../styles/pages/detailed.css'


export default function Detail() {
  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </div>
  )
}
