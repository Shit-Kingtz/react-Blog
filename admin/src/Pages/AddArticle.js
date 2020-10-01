import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import servicePath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input

function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)                        // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')                 // 文章标题
    const [articleContent , setArticleContent] = useState('')           // markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容')    // html内容
    const [introducemd,setIntroducemd] = useState()                     // 简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑')        // 简介的html内容
    const [showDate,setShowDate] = useState()                           // 发布日期
    const [updateDate,setUpdateDate] = useState()                       // 修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([])                        // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型')           // 选择的文章类别

    useEffect(() => {
        getTypeInfo()
        console.log(props)
        if (props.match.params.id) {
            setArticleId(props.match.params.id)
            getArticleById(props.match.params.id)
        }
    }, [])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'GET',
            url: servicePath.getTypeInfo,
            headers: { 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            if (res.data.data === '没有登录') {
                localStorage.removeItem('openId')
                props.history.push('/login')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }

    const getArticleById = (id) => {
        axios({
            url: servicePath.getArticleById + id,
            withCredentials: true
        }).then(res => {
            console.log(res.data.data[0])
            let articleInfo = res.data.data[0]
            setArticleTitle(articleInfo.title)
            setArticleContent(articleInfo.article_content)
            let html = marked(articleInfo.article_content)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            let tempInt = marked(articleInfo.introduce)
            setIntroducehtml(tempInt)
            setShowDate(moment(articleInfo.addTime).format('YYYY-MM-DD'))
            selectTypeHandle(articleInfo.typeId)
        })
    }

    const selectTypeHandle = (value) => {
        setSelectType(value)
    }

    const saveArticle = () => {
        if (!selectedType || selectedType === '请选择类型') {
            message.error('请选择文章类型')
            return false
        }

        if (!articleTitle) {
            message.error('请填写文章标题')
            return false
        }

        if (!articleContent) {
            message.error('请填写文章内容')
            return false
        }

        if (!introducemd) {
            message.error('请填写文章简介')
            return false
        }

        if (!showDate) {
            message.error('请选择发布日期')
            return false
        }

        let dataProps = {
            type_id: selectedType,
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: showDate.replaceAll('-','/'),
            view_count: 0
        }

        if (articleId === 0) {
            axios({
                method: 'POST',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                if (res.data.data === '没有登录') {
                    localStorage.removeItem('openId')
                    props.history.push('/login')
                    return false
                }

                setArticleId(res.data.insertId)
                if (res.data.success) {
                    message.success('文章保存成功')
                } else {
                    message.error('文章保存失败')
                }
            })
        } else {
            dataProps.id = articleId
            axios({
                method: 'POST',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                if (res.data.data === '没有登录') {
                    localStorage.removeItem('openId')
                    props.history.push('/login')
                    return false
                }

                if (res.data.success) {
                    message.success('文章更新成功')
                } else {
                    message.error('文章更新失败')
                }
            })
        }

    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e => setArticleTitle(e.target.value)}
                            />
                        </Col>
                        <Col span={4}>
                            <Select 
                                value={selectedType} 
                                defaultValue={selectedType} 
                                size="large" 
                                onChange={selectTypeHandle}
                            >
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option 
                                                key={index} 
                                                value={item.id}
                                            >
                                                {item.typeName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row className="content-container" gutter={10}>
                        <Col className="textarea" span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                dangerouslySetInnerHTML={{__html: markdownContent}}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章 </Button>
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章 </Button>
                        </Col>
                        <Col className="content-container" span={24}>
                            <TextArea 
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                value={introducemd}
                            />
                            <div 
                                className="introduce-html" 
                                dangerouslySetInnerHTML={{__html: introducehtml}}
                            />
                        </Col>
                        <Col span={24}>
                            <div className="date-select">
                                <DatePicker 
                                    value={moment(showDate, 'YYYY-MM-DD')}
                                    onChange={(date,dateString) => setShowDate(dateString)}
                                    placeholder="发布日期" 
                                    size="large" 
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}

export default AddArticle