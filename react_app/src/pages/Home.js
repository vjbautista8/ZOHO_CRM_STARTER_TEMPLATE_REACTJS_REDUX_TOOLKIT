import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Form } from 'react-bootstrap';
import ComponentsPage from './ComponentsPage';
import { getFields, handleStateChange } from '../redux/user/userSlice';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import FormPage from './FormPage';
import { ReportPage } from './ReportPage';

const Home = () => {
  const { PAGE, LOADING, MODULES } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleModuleChange = (e) => {
    e.preventDefault();
    console.log('handleModuleChange >>', e.target.value);
    dispatch(handleStateChange({ name: 'MODULE_NAME', value: e.target.value }));
  };
  if (LOADING) {
    return <HourGlassLoading />;
  }
  return (
    <div className='main-page'>
      <Form>
        <Form.Group className='mb-3' controlId='crmModuleListID'>
          <Form.Label>Module Name</Form.Label>

          <Form.Select
            size='lg'
            placeholder='Select Module'
            onChange={handleModuleChange}
          >
            <option value=''>Select Module</option>
            {MODULES.map((module, i) => {
              return (
                <option value={module?.api_name}>
                  {module?.actual_plural_label}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Form>
      <Stack direction='horizontal' gap={2}>
        <Button
          as='a'
          variant={PAGE == 'Form' ? 'primary' : ''}
          onClick={() => {
            dispatch(handleStateChange({ name: 'PAGE', value: 'Form' }));
          }}
        >
          Form
        </Button>
        <Button
          as='a'
          variant={PAGE == 'Report' ? 'primary' : ''}
          onClick={() => {
            dispatch(handleStateChange({ name: 'PAGE', value: 'Report' }));
          }}
        >
          Report
        </Button>
      </Stack>
      {PAGE == 'Form' && <FormPage />}

      {PAGE == 'Report' && <ReportPage />}
    </div>
  );
};

export default Home;
