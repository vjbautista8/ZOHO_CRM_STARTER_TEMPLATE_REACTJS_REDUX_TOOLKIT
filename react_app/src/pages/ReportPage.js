import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, Form, Row, Col, Table } from 'react-bootstrap';
import { getAllRecords } from '../redux/user/userSlice';
import DataTable from '../components/Datatable';
export const ReportPage = () => {
  const { MODULE_NAME, MODULE_REPORTS } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        getAllRecords({
          Entity: MODULE_NAME,
          sort_order: 'asc',
          per_page: 200,
          page: 1,
        })
      ).then((dispatchResult) => {
        if (dispatchResult.error) throw new Error(dispatchResult.error.message);
      });
    };
    fetchData();
  }, [MODULE_NAME]);
  return <DataTable data={MODULE_REPORTS} />;
};
