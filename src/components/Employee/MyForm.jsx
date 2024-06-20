import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Switch, Button, Row, Col, Alert } from 'antd';
import { useSelectedEmployee } from '../contextprovider/SelectedEmployeeContext';
import { db } from '../../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const { Option } = Select;

const MyForm = () => {
  const { selectedEmployee } = useSelectedEmployee();
  const [form] = Form.useForm();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    if (selectedEmployee) {
      form.setFieldsValue(selectedEmployee);
    }
  }, [selectedEmployee, form]);

  const handleSubmit = async (values) => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        const cleanedValues = {
          ...values,
          status: values.status ? 'Active' : 'Inactive',
        };
        const docRef = doc(db, 'employee', selectedEmployee.id);
        await updateDoc(docRef, cleanedValues);

        setAlertMessage('Employee updated successfully');
        setAlertType('success');
        setAlertVisible(true);

        // Hide the alert after 3 seconds
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating document:', error);

      setAlertMessage('Error updating employee');
      setAlertType('error');
      setAlertVisible(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 270, marginTop: 30 }}>
      <div style={{ width: '75%' }}>
        {alertVisible && <Alert message={alertMessage} type={alertType} showIcon />}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="name" label="Employee Name" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="empCode" label="Employee Code" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="salary" label="Salary" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="hourSalary" label="Hourly Salary" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="unit" label="Unit" rules={[{ required: true, message: 'Please select an option!' }]}>
                <Select placeholder="Select an option">
                  <Option value="unit1">Unit 1</Option>
                  <Option value="unit2">Unit 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter a value!' }]}>
                <Input placeholder="Enter value" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="shift" label="Shift" rules={[{ required: true, message: 'Please select an option!' }]}>
                <Select placeholder="Select an option">
                  <Option value="morning">Morning Shift</Option>
                  <Option value="noon">Noon Shift</Option>
                  <Option value="night">Night Shift</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="otApplicable" label="OT Applicable" rules={[{ required: true, message: 'Please select an option!' }]}>
                <Select placeholder="Select an option">
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                  <Option value="afterProbation">Yes, but after probation</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select an option!' }]}>
                <Select placeholder="Select an option">
                  <Option value="staff">Staff</Option>
                  <Option value="worker">Worker</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Item name="status" label="Status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" htmlType="submit">
              Update Employee
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MyForm;
