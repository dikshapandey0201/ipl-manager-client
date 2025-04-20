import React, { useEffect, useState } from 'react'
import { useGetAllPlayersQuery } from "../../features/slices/PlayerSlice";
import BasicTable from '../../components/BasicTable';
import Spinner from '../../components/Spinner';

export default function ManagePlayers() {
  const { data, error, isLoading } = useGetAllPlayersQuery();
  const [rows, setRows] = useState([]);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    if(data && data.length > 0){
      const item = data[0];
      const selectedKeys = [
        "name",
        "age",
        "skill",
        "debut",
        "matches_played",
        "runs",
        "wickets"
      ];
      const rowsTitle = selectedKeys.map((key) => ({
        id: key,
        label: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }));
      setRows(rowsTitle);
    }
  },[data]);

  useEffect(() => {
    if(data && data.length > 0){
      const newTableData = data.map((item) => {
        const selectedKeys = [
          "_id",
          "name",
          "age",
          "skill",
          "debut",
          "matches_played",
          "runs",
          "wickets"
        ];
        const newItem = {};
        selectedKeys.forEach((key) => {
          if(key === "debut"){
            newItem[key] = new Date(item[key]).getFullYear();
          }else
          newItem[key] = item[key];
        });
        return newItem;
      });
      setTableData(newTableData);
    }
  }
  , [data]);

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <div >
      <p className="my-2">Manage Player Details</p>
        <BasicTable rows={rows} tableData={tableData}/>
    </div>
  )
}
