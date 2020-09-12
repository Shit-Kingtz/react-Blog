import Head from 'next/head'
import {Button, Row, Col} from 'antd'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs=""></Col>
      </Row>
    </div>
  )
}