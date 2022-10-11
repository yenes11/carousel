import React, { useRef, useState } from 'react';
import '../styles/Form.css';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import 'antd/dist/antd.css'
import AddMedia from '../icons/add-media.svg';
import axios from 'axios';

const { Option } = Select;
const URL = "http://localhost:3001/api/add";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 32,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 5,
    span: 16
  },
};

const MediaForm = ({settoggle}) => {
  const formRef = useRef();
  const [form] = Form.useForm();

  const toggleAddMedia = () => {
    if (formRef.current.style.top !== '10px')
      formRef.current.style.top = '10px';
    else
      formRef.current.style.top = '-336px';
  }

  const onFinish = (values) => {
    axios.post(URL, values);
    form.resetFields();
    settoggle(prevToggle => !prevToggle);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div ref={formRef} className="form-container">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, max: 25, min: 3, type: 'string'}]}>
          <Input placeholder="Family photo" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true}]}>
          <Select
            placeholder="Select the media type"
            allowClear
          >
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true, type: 'url'}]}>
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (s)"
          rules={[{ required: true, type: 'number'}]}>
          <InputNumber placeholder="3" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <button className='add-media-btn' onClick={toggleAddMedia}>
        <img src={AddMedia} alt="Add media" />
      </button>
    </div>
  )
}

export default MediaForm