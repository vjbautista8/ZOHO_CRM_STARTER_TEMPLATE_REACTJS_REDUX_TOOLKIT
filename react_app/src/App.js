import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFields,
  getModules,
  handleStateChange,
} from './redux/user/userSlice';
import Home from './pages/Home';
const App = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageQuery = urlParams.get('page');
    const serviceOrigin = urlParams.get('serviceOrigin');
    console.log('PAGE', pageQuery);
    console.log('SERVICE_ORIGIN', serviceOrigin);
    console.log('METADATA', data);
    const fetchData = async () => {
      dispatch(handleStateChange({ name: 'LOADING', value: true }));
      dispatch(handleStateChange({ name: 'PAGE', value: pageQuery }));
      dispatch(
        handleStateChange({ name: 'SERVICE_ORIGIN', value: serviceOrigin })
      );
      dispatch(handleStateChange({ name: 'METADATA', value: data }));
      await dispatch(getModules()).then((dispatchResult) => {
        if (dispatchResult.error) throw new Error(dispatchResult.error.message);
      });
      // await dispatch(getFields({ Entity: 'Accounts' })).then(
      //   (dispatchResult) => {
      //     if (dispatchResult.error)
      //       throw new Error(dispatchResult.error.message);
      //   }
      // );
      dispatch(handleStateChange({ name: 'LOADING', value: false }));
    };
    fetchData();
  }, []);
  return <Home />;
};
export default App;
