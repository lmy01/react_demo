import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.less';

export default class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      initName: 'react-user',
      initPwd: '111111'
    }

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.login = this.login.bind(this);
  }
  
  login(name, pwd, status) {
    window.sessionStorage.setItem('name', name)
    window.sessionStorage.setItem('remember', status)
    this.props.history.push('/')
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
      this.login(values.username, values.password, values.remember)
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div id="login-c">
        <Row>
          <Col offset={14} span={6}>
            <Card className="login-card" title="用户登录" extra={<Button type="link" href="/register">没有账号？去注册</Button>} style={{ width: 400 }}>
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  username: this.state.initName,
                  password: this.state.initPwd,
                  remember: true
                }}
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
                
                <Form.Item>
                  <Form.Item {...tailLayout} name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                  <Button className="login-form-forgot" type="link">
                    忘记密码
                  </Button>
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                  <Button size="large" type="primary" block htmlType="submit">
                    登 录
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