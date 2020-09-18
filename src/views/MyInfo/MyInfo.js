import React from 'react';
import { Card, Avatar, Form, Input, Select, Button, Tag, message } from 'antd';
import { EditOutlined, EllipsisOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import './MyInfo.less'

const { Meta } = Card;
const { TextArea } = Input;

export default class MyInfo extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      selectList: ['男', '女'],
      editFlag: false,
      addTagInputFlag: false,
      editInputValue: '',
      info: {
        name: window.sessionStorage.getItem('name'),
        gender: '男',
        age: 24,
        address: '银河太阳系火星空间站中国站1号',
        speciality: ['胸口碎大石', '跳火圈', '骑独轮车'],
        introduce: '思想成熟、有活力、为人诚实。有极强的系统管理能力。能够独立工作。需要有能力及适应力强的人。需要个性稳重、具高度责任感的人。开朗、有进取心的应聘者。思想成熟、有活力、为人诚实。有极强的系统管理能力。能够独立工作。需要有能力及适应力强的人。需要个性稳重、具高度责任感的人。开朗、有进取心的应聘者。'
      },
      tagList: [],
      addTageInputValue: '',
    }
    
    this.goEdit = this.goEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.showInput = this.showInput.bind(this)
    this.tagInputChange = this.tagInputChange.bind(this)
    this.addTag = this.addTag.bind(this)
  }
  
  goEdit() {
    this.setState({
      editFlag: true
    })
  }
  
  cancelEdit() {
    this.setState({
      editFlag: false,
      addTagInputFlag: false,
    })
  }
  
  handleClose(tag) {
    console.log(tag)
  }
  
  showInput() {
    this.setState({
      addTagInputFlag: true
    })
  }
  
  tagInputChange(e) {
    this.setState({
      addTageInputValue: e.target.value
    })
  }
  
  addTag() {
    if(this.state.addTageInputValue.trim()) {
      this.setState({
        addTagInputFlag: false,
        tagList: [...this.state.tagList, this.state.addTageInputValue]
      })
    }else{
      message.warning('新标签内容不能为空');
    }
    
  }
  
  componentDidMount() {
    this.setState({
      tagList: this.state.info.speciality.map(item => item)
    })
  }
  
  
  render() {
    const layout = {
      labelCol: {
        span: 6
      }
    };
    
    const onFinish = values => {
      console.log('Success:', values);
      this.setState({
        editFlag: false,
        addTagInputFlag: false
      })
    };
      
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    
    return (
      <div className="info-c flex flex-center-x">
        <div className="info-inner flex flex-center-">
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <EditOutlined key="edit" onClick={this.goEdit} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="/logo192.png" />}
              title={this.state.info.name}
              description={this.state.info.address}
            />
          </Card>
          
          <div className="info-form">
            <Form {...layout}
              initialValues={this.state.info}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="用户名：" name="name">
                {
                  this.state.editFlag ? (
                    <Input placeholder="输入用户名" />
                  ) : <span>{this.state.info.name}</span>
                }
              </Form.Item>
              <Form.Item label="性别：" name="gender">
                {
                  this.state.editFlag ? (
                    <Select placeholder="选择性别">
                      {
                        this.state.selectList.map((item, index) => 
                          <Select.Option key={index} value={item}>{item}</Select.Option>
                        )
                      }
                    </Select>
                  ) : <span>{this.state.info.gender}</span>
                }
              </Form.Item>
              <Form.Item label="年龄：" name="age">
                {
                  this.state.editFlag ? (
                    <Input placeholder="输入年龄" />
                  ) : <span>{this.state.info.age}</span>
                }
              </Form.Item>
              <Form.Item label="现住地址：" name="address">
                {
                  this.state.editFlag ? (
                    <Input placeholder="输入现住地址" />
                  ) : <span>{this.state.info.address}</span>
                }
              </Form.Item>
              <Form.Item label="特长：">
                {
                  this.state.tagList.map((tag, index) => {
                    return this.state.editFlag ?  (
                      <Tag
                        color="#bbb"
                        className="edit-tag"
                        key={tag}
                        closable
                        onClose={() => this.handleClose(tag)}
                      >
                        {tag}
                      </Tag>
                    ) : <Tag
                        color="#bbb"
                        className="show-tag"
                        key={tag}
                      >
                        {tag}
                      </Tag>
                  })
                }
                {
                  this.state.editFlag ? <Tag color="#006699" className="site-tag-plus" onClick={this.showInput}>
                    <PlusOutlined /> 新特长
                  </Tag> : null
                }
                {
                  this.state.editFlag && this.state.addTagInputFlag ? <Input placeholder="输入新特长" onChange={this.tagInputChange} addonAfter={<CheckOutlined onClick={this.addTag} />} /> : null
                }
              </Form.Item>
              <Form.Item label="自我介绍：" name="introduce">
                {
                  this.state.editFlag ? (
                    <TextArea placeholder="输入自我介绍" autoSize={{ minRows: 4, maxRows: 8 }} />
                  ) : <span>{this.state.info.introduce}</span>
                }
              </Form.Item>
              {
                this.state.editFlag ? (
                  <div className="optionBtn-c">
                    <Form.Item>
                      <Button type="primary" key="submit" htmlType="submit">提交</Button>
                      <Button type="default" key="cancel" onClick={this.cancelEdit}>取消</Button>
                    </Form.Item>
                  </div>
                ) : null
              }              
            </Form>
          </div>
          
        </div>
      </div>
    )
  }
}