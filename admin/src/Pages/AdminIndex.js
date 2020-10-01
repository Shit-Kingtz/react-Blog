import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

import {
  CopyOutlined,
  PieChartOutlined,
  CommentOutlined,
  UnorderedListOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import '../static/css/adminIndex.css'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e => {
      switch(e.key) {
        case 'AddArticle':
          props.history.push('/index/add')
          break;
        case 'ArticleList':
          props.history.push('/index/list')
          break;
      } 
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                工作台
              </Menu.Item>
              <SubMenu key="sub1" icon={<CopyOutlined />} title="文章管理" onClick={handleClickArticle}>
                <Menu.Item key="ArticleList" icon={<UnorderedListOutlined />}>列表</Menu.Item>
                <Menu.Item key="AddArticle" icon={<FileAddOutlined />}>添加文章</Menu.Item>
              </SubMenu>
              <Menu.Item key="4" icon={<CommentOutlined />}>
                留言管理
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>博客管理系统</Breadcrumb.Item>
                <Breadcrumb.Item>工作台</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                  <Route path='/index/' exact component={AddArticle}></Route>
                  <Route path='/index/add' exact component={AddArticle}></Route>
                  <Route path='/index/list' exact component={ArticleList}></Route>
                  <Route path='/index/add/:id' exact component={AddArticle}></Route>
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Shit-Kingtz.com</Footer>
          </Layout>
        </Layout>
      );
}

export default AdminIndex