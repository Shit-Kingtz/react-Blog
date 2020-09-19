import Head from 'next/head'
import axios from 'axios'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, YoutubeOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import '../styles/pages/detailed.css'
import Tocify from '../components/Tocify.tsx'
import servicePath from '../config/apiUrl'


const Detail = (props) => {
  const renderer = new Marked.Renderer()
  const tocify = new Tocify()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id=${anchor} href="#${anchor}" className="anchor-fix">
              <h${level}></h${level}>
            </a>\n`
  }

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

  let html = Marked(props.article_content)

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
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
              <Breadcrumb.Item>xxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              React实战视频教程-技术胖Blog开发(更新08集)
            </div>
            <div className="list-icon center">
              <CalendarOutlined />
              2020-09-12
              <YoutubeOutlined />
              视频教程
              <FireOutlined />
              123人
            </div>
            <div className="detailed-content"
              dangerouslySetInnerHTML={{__html:html}}
            ></div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

Detail.getInitialProps = async (context) => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + context.query.id)
      .then(res =>  resolve(res.data.data[0]))
  })

  return await promise
}

export default Detail