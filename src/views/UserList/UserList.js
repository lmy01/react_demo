import React from 'react';
import { Form, Input, Select, Button, Row, Col, Table } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './UserList.less'

export default class UserList extends React.Component{
  constructor(props) {
    super(props)
    
    this.state = {
      selectList: ['男', '女'],
      data: [],
      current: 1,
      size: 3
    }
    
    this.queryList = this.queryList.bind(this)
    this.changeCurrent = this.changeCurrent.bind(this)
    this.changeSize = this.changeSize.bind(this)
    
  }
  
  queryList() {
    fetch('https://api.apiopen.top/getJoke?page=1&count=5&type=video',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => { // 第一个then返回的是请求相关参数
      return res.json(); // 必须返回相应数据，不然第二个then中无法接收到数据
    }).then(json => { // 返回的是数据
      // console.log(json)
      this.setState({
        data: json.result
      })
    }).then(err => { // 返回的是错误
  
    })
  }
  
  changeCurrent(page, pageSize) {
    console.log(page)
    this.setState({
      current: page
    })
  }
  
  changeSize(current, size) {
    console.log(size)
    this.setState({
      current: 1,
      size: size
    })
  }
  
  componentDidMount() {
    this.queryList()
  }
  
  render() {
    const layout = {
      labelCol: {
        span: 6
      }
    };
    
    const onFinish = values => {
      console.log('Success:', values);
    };
      
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    
    const columns = [
      {
        title: 'ID',
        dataIndex: 'sid'
      },
      {
        title: '作者',
        dataIndex: 'name'
      },
      {
        title: '标题',
        dataIndex: 'text'
      },
      {
        title: '评论',
        dataIndex: 'top_comments_content'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type="link" key={record.uid}>删除</Button>
        ),
      },
    ]
    
    return (
      <div>
        <div className="search-c">
          <Form {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col span={8}>
                <Form.Item label="用户名" name="name">
                  <Input placeholder="输入用户名" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="性别" name="gender">
                  <Select placeholder="选择性别">
                    {
                      this.state.selectList.map((item, index) => 
                        <Select.Option key={index} value={item}>{item}</Select.Option>
                      )
                    }
                  </Select> 
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="年龄" name="age">
                  <Input placeholder="输入年龄" />
                </Form.Item>
              </Col>
            </Row>
            <div className="searchBtn-c">
              <Form.Item>
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">搜索</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={()=>{this.props.history.push('/app/adduser')}}>新用户</Button>
              </Form.Item>   
            </div>
          </Form>
        </div>
        <div className="table-c">
          <Table columns={columns} dataSource={this.state.data} rowKey={"sid"} pagination={{current: this.state.current,pageSize: this.state.size,showTotal: (total, range) => `共 ${total} 个`,pageSizeOptions: [1, 2, 3, 5],showSizeChanger: true,showQuickJumper: true,onChange: this.changeCurrent,onShowSizeChange: this.changeSize}} />
        </div>
      </div>
    )
  }
}