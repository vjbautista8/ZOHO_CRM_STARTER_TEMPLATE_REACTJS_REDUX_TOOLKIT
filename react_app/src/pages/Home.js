import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComponentsPage from './ComponentsPage';
import CallTrailHome from './CallTrailHome';
const Home = () => {
  const { PAGE } = useSelector((store) => store.user);
  if (PAGE == 'calltrailbutton') {
    return <CallTrailHome />;
  }
  return <div>{PAGE}</div>;
};

export default Home;
