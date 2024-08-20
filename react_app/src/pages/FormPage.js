import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, Form, Row, Col } from 'react-bootstrap';
import { getFields } from '../redux/user/userSlice';
const FormPage = () => {
  const { MODULE_NAME, MODULE_FIELDS } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getFields({ Entity: MODULE_NAME })).then(
        (dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        }
      );
    };
    fetchData();
  }, [MODULE_NAME]);

  return (
    <>
      <Form className='m-3'>
        <Row>
          {MODULE_FIELDS.map((field, i) => {
            return (
              <>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>{field?.field_label}</Form.Label>

                    <Form.Control
                      type={field?.data_type}
                      id={field?.api_name}
                      aria-describedby='passwordHelpBlock'
                    />
                  </Form.Group>
                </Col>
              </>
            );
          })}
        </Row>
      </Form>
    </>
  );
};

export default FormPage;
