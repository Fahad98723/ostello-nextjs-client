import React, { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";
import Chart from "react-apexcharts";
import { useRouter } from "next/router";

const Charts = ({datesData,dates}) => {
  const [usersCount,setUsersCount] = useState([])
  const [oldUsersCount,setOldUsersCount] = useState([])
  const [newUsersCount,setNewUsersCount] = useState([])
  const router = useRouter()
console.log(dates)
  useEffect(() => {
    let users = []
    const temp = new Set()
    const tempNew = new Set()
    let oldUsersInDate = []
    let newUsersInDate = []
    datesData?.map((d) => {
      let arrOld = []
      let arrNew = []
      d?.data?.map((u) =>{
        temp.add(u?.payload?.userid)
        tempNew.add(u?.payload?.ipaddress)
      }
      )
      arrOld = [...temp]
      arrNew = [...tempNew]
      oldUsersInDate.push(arrOld?.length);
      newUsersInDate.push(Math.abs(arrNew?.length - arrOld?.length));
      users?.push(arrNew?.length);
    })
    setUsersCount(users)
    setOldUsersCount(oldUsersInDate)
    setNewUsersCount(newUsersInDate)
  },[datesData])

  const config = {
    series: [{
      name: "Total Users",
      data: usersCount,
    },
    {
      name: "Old Users",
      type: "line",
      data: oldUsersCount,
  },
  {
      name: "New Users",
      type: "line",
      data: newUsersCount,
  },
],
    options: {
      chart: {
        toolbar: {
          show: true
        },
      },
  
      dataLabels: {
        enabled: true
      },   
    
      stroke: {
        curve: "smooth"
      } 
     ,
    //   title: {
    //     text: 'Total Users: ',
    //     align: 'left'
    //   },  
    
      xaxis: {
        categories: dates,
        title: {
          text: 'Days'
        }
      },
  
      yaxis: {
        title: {
          text: 'Users'
        }
      }
    }
  }


    return (
      <>
      <div className="bg-white p-3 rounded-2xl">
        <div style={{ width: "100%" }}>
          <ChartHeader />
          <Chart
            options={config.options}
            series={config.series}
            type="line"
            height="300"
            width="100%"
          />
          <div className="flex justify-end mb-5 items-center gap-3">
            <button onClick={()=> router.push('/merchant/dashboard/user-analytics')}
             className="px-5 py-.5 rounded text-xs font-bold text-primary hover:bg-[#FAFAFB]">
            View Impressions
          </button>
          </div>
          <div className="flex justify-end items-center gap-3 pr-2">
            <button className="px-5 py-1 rounded font-bold text-primary border-2 border-primary hover:bg-[#FAFAFB]">
              After Math
            </button>
            <button className="px-5 py-1.5 rounded text-primary bg-[#F2E9FC] hover:bg-[#FAFAFB]">
              Sales
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }


export default Charts;
