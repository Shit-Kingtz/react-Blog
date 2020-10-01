import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import moment from 'moment'
import servicePath from '../config/apiUrl'
import '../static/css/articleList.css'
const { confirm } = Modal

function ArticleList(props) {
    const [list, setList] = useState([])

    const getList = () => {
        axios({
            method: 'GET',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(res => {
            let list = res.data.list.map(item => {
                item.addTime = moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')
                return item
            })
            setList(list)
        })
    }

    const updateArticle = (id) => {
        props.history.push('/index/add/' + id)
    }

    const deleteArticle = (id) => {
        confirm({
            title: '确定要删除这篇文章吗？',
            content: '若点击ok，文章将永远被删除，无法恢复',
            onOk() {
                axios({
                    method: 'GET',
                    url: servicePath.deleteArticle + id,
                    withCredentials: true
                }).then(res => {
                    message.success('文章删除成功')
                    getList()
                })
            },
            onCancel() {
                message.success('文章没有任何变化')
            }
        })
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8} >
                            <b>标题</b>
                        </Col> 
                        <Col span={4} >
                            <b>类别</b>
                        </Col> 
                        <Col span={4} >
                            <b>发布时间</b>
                        </Col> 
                        <Col span={4} >
                            <b>浏览量</b>
                        </Col> 
                        <Col span={4} >
                            <b>操作</b>
                        </Col> 
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8} >
                                {item.title}
                            </Col> 
                            <Col span={4} >
                                {item.typeName}
                            </Col> 
                            <Col span={4} >
                                {item.addTime}
                            </Col> 
                            <Col span={4} >
                                {item.view_count}
                            </Col> 
                            <Col span={4} >
                                <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>
                                <Button onClick={() => {deleteArticle(item.id)}}>删除</Button>
                            </Col> 
                        </Row>
                    </List.Item>
                )}
            >

            </List>
        </div> 
    )
}

export default ArticleList