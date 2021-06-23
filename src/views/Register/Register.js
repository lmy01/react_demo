import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Register.less';
import Vertify from './vertify.js'

export default class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      
    }

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.goLogin = this.goLogin.bind(this)
  }
  
  goLogin(name, pwd) {
    this.props.history.push('/login')
  }
  
  componentDidMount() {
    if(window.sessionStorage.getItem('name')){
      this.initName = window.sessionStorage.getItem('name')
    }
  }
  
  render() {
    const layout = {
      wrapperCol: {
        offset: 2,
        span: 20
      }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 2,
        span: 20,
      },
    };
    const passwordValidate = (rule, value, callback) => {
      if(!value || (value.trim().length < 6)) {
        return Promise.reject('密码长度不小于6')
      }else{
        return Promise.resolve()
      }
    };
    const onFinish = values => {
      console.log('Success:', values);
      this.goLogin(values.username, values.password)
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div id="register-c">
        <Row>
          <Col offset={14} span={6}>
            <Card className="register-card" title="用户注册" bordered={false} extra={<Button type="link" href="/login">已有账户，去登录></Button>} style={{ width: 400 }}>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名/手机号',
                    },
                  ]}
                >
                  <Input 
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名/手机号"
                  />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      validator: passwordValidate
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>
                
                <Vertify />
                
                <Form.Item {...tailLayout}>
                  <Button size="large" type="primary" block htmlType="submit">
                    注 册
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}