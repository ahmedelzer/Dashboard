import React,{useState} from 'react';
import './home.scss';
import Table from './Table';
import useFetch from '../../components/hooks/useFetch'
import Loading from '../../components/loading/Loading';
import { buildApiUrl } from './BuildApiUrl';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default  function DynmicTable(){
  const {id} = useParams();
  console.log(id)
  const {data}= useFetch(`/Dashboard/GetDashboardFormSchema?DashboardMenuItemID=${id}`)
  console.log(buildApiUrl(data,90));
  return (
    <div>
      {data?
        <Table schema={data}/>
      :<Loading/>}
    </div>
  );
}
