import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComponentsPage from './ComponentsPage';
import { getFields } from '../redux/user/userSlice';

const Home = () => {
  const { PAGE, LOADING } = useSelector((store) => store.user);

  if (LOADING) {
    return <h1>Loading..</h1>;
  }
  return <h1>{PAGE}</h1>;
};

export default Home;
