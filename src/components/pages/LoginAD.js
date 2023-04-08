import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, ConfigProvider } from "antd";
const App = () => {
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
  };
  return (
    <div>
      <h1 style={{ paddingBottom: 60 }}>Log In</h1>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F25A29",
          },
        }}
      >
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: "아이디를 적어주세요!",
              },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='아이디' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "비밀번호를 적어주세요!",
              },
            ]}
          >
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='비밀번호' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>계정 기억하기</Checkbox>
            </Form.Item>
            <a className='login-form-forgot' href='/'>
              비밀번호를 잊어버렸다면?
            </a>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              로그인
            </Button>
            하거나 <a href='/'> 회원가입하세요!</a>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};
export default App;
