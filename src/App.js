import React from 'react';
import './App.less';
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux'
// 引入action
import { setLink } from './store/actions.js'
import Dashboard from './views/Dashboard/Dashboard'
import UserList from './views/UserList/UserList'
import AddUser from './views/UserList/AddUser'
import MyInfo from './views/MyInfo/MyInfo'
import Todos from './views/Todos/Todos'
import Echarts from './views/Echarts/Echarts'
import PMP from './views/PMP/PMP'
import { Layout, Button, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  DownOutlined,
  LogoutOutlined
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: window.sessionStorage.getItem('name') ? window.sessionStorage.getItem('name'): '',
      sideMenu: 'dashboard',
      menus: [
        {
          key: 'dashboard',
          name: '仪表面板',
          childRouter: []
        },
        {
          key: 'userlist',
          name: '用户列表',
          childRouter: ['adduser']
        },
        {
          key: 'myinfo',
          name: '我的信息',
          childRouter: []
        },
        {
          key: 'todos',
          name: 'Todo List',
          childRouter: []
        },
        {
          key: 'echarts',
          name: 'Echarts图表',
          childRouter: []
        },
        {
          key: 'pmp',
          name: 'PMP练习',
          childRouter: []
        },
      ],
      collapsed: false,
      settingMenu: (
        <Menu onClick={this.clickSettingMenu}>
          <Menu.Item key="login">
            <LogoutOutlined />
            退出
          </Menu.Item>
        </Menu>
      )
    }
    
    this.clickSiderMenu = this.clickSiderMenu.bind(this)
    this.toggle = this.toggle.bind(this)
    this.clickSettingMenu = this.clickSettingMenu.bind(this)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  clickSiderMenu = (e) => {
    // console.log(e)
    this.props.setLink('/app/' + e.key)
    this.props.history.push('/app/' + e.key)
    this.setState({
      sideMenu: e.key
    })

  }
  clickSettingMenu = (e) => {
    this.props.setLink('/app/' + e.key)
    this.props.history.push('/app/' + e.key)
    if(e.key === 'login'){
      this.props.history.push('/' + e.key)
    }else{
      this.props.history.push('/app/' + e.key)
    }

  }
  componentDidMount() {
    // console.log(this.props)
    // console.log(this.props.history.location)
    // console.log(this.props.match.params.rt)
    if(!window.sessionStorage.getItem('name')) {
      this.props.history.push('/login')
    }

    // 根据路由高亮对应侧边菜单
    let pathname = this.props.history.location.pathname.split('/')[this.props.history.location.pathname.split('/').length - 1]
    this.state.menus.forEach(item => {
      if ((pathname === item.key) || (item.childRouter.indexOf(pathname) > -1)) {
        this.setState({
          sideMenu: item.key
        })
      }
    })
  }

  componentDidUpdate() {
    this.props.setLink(this.props.history.location.pathname)
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem('name')
    this.props.setLink('/app/dashboard')
  }
  
  render() {    
    return (      
      <div id="app" className="height100">
        <Layout id="app-layout">
          <Sider id="app-layout-sider" trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="app-layout-sider-header flex flex-center">
              <div className="app-layout-sider-header-avater">
                <UserOutlined style={{ fontSize: '44px' }} />
              </div>
              {
                !this.state.collapsed ? <div>{this.state.name}</div> : null
              }
            </div>
            <Menu id="app-layout-sider-menu" theme="dark" mode="inline" selectedKeys={[this.state.sideMenu]} defaultSelectedKeys={[this.state.sideMenu]}  onClick={this.clickSiderMenu}>
              {
                this.state.menus.map(item => {
                  return <Menu.Item key={item.key}>
                    <DashboardOutlined style={{fontSize: '18px'}} />
                    <span>{item.name}</span>
                  </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout id="app-layout-layout">
            <Header id="app-layout-layout-header" className="flex flex-center-y" style={{ justifyContent: 'space-between'}} >
              {
                React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  style: {
                    fontSize: '22px'
                  },
                  onClick: this.toggle,
                })
              }
              <div>
                <Dropdown overlay={this.state.settingMenu}>
                  <Button>
                    设置 <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </Header>
            <Content id="app-layout-layout-content">
              {(() => {
                switch(this.props.match.params.rt) {
                  case 'dashboard':
                    return <Dashboard history={this.props.history}></Dashboard>
                  case 'userlist':
                    return <UserList history={this.props.history}></UserList>
                  case 'adduser':
                    return <AddUser history={this.props.history}></AddUser>
                  case 'myinfo':
                    return <MyInfo history={this.props.history}></MyInfo>
                  case 'todos':
                    return <Todos history={this.props.history}></Todos>
                  case 'echarts':
                    return <Echarts history={this.props.history}></Echarts>
                  case 'pmp':
                    return <PMP history={this.props.history}></PMP>
                  default:
                    return <Dashboard history={this.props.history}></Dashboard>
                  }
              })()}
            </Content>
          </Layout>
        </Layout>
      </div>
    
    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    link: state.setLink
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLink (data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(setLink(data))
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
          dispatch({ type: 'SET_LINk', data: data })
      )*/
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

