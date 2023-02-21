import { useState, useEffect } from "react";
import "./dashboard.css";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import moment from 'moment';





function ActivityChart() {
  
  const [userData, setUserData] = useState({
    labels: Object.values(JSON.parse(localStorage.getItem('chartData'))).map((data) => data.day),
    datasets: [
      {
        label: "Calories burned",
        data: Object.values(JSON.parse(localStorage.getItem('chartData'))).map((data) => data.calories),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });


  const [activityData, setActivityData] = useState({
    labels: Object.values(JSON.parse(localStorage.getItem('activityData'))).map((data) => data.day),
    datasets: [
      {
        label: "Calories burned",
        data: Object.values(JSON.parse(localStorage.getItem('activityData'))).map((data) => data.calories),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });


  useEffect(() => {
    console.log('In use effect')
    function getAggregatedData() {
      const requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
      };
      fetch("http://localhost:5000/intake/", requestOptions).then(response => response.json()).then(result => {
        var dataMap = {}
        for (var i=0; i<7; i++) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          dataMap[moment(d).format('Do MMM')] = 0
      }
        for (var num in result) {
          var intakeLog = result[num]
          var intakeDateStr = moment(new Date(intakeLog['intakeTime'])).format('Do MMM')
          if (parseInt(intakeLog['totalNutrients']['ENERC_KCAL']['quantity']['$numberDecimal'])) {
            dataMap[intakeDateStr] = dataMap[intakeDateStr] + parseInt(intakeLog['totalNutrients']['ENERC_KCAL']['quantity']['$numberDecimal'])
          }
        }
        var finalList = []
        for (var d in dataMap) {
          finalList.push({day: d, calories: dataMap[d]})
        }
        localStorage.setItem('chartData', JSON.stringify({ ...finalList}))
      }
      )
    }


    function getAggregatedActivityData() {
      const requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
      };
      fetch("http://localhost:5000/activity/", requestOptions).then(response => response.json()).then(result => {
        var dataMap = {}
        for (var i=0; i<7; i++) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          dataMap[moment(d).format('Do MMM')] = 0
      }
        for (var num in result) {
          var activity = result[num]
          var intakeDateStr = moment(new Date(activity['startTime'])).format('Do MMM')
          if (parseInt(activity['calorieBurn'])) {
            dataMap[intakeDateStr] = dataMap[intakeDateStr] + parseInt(activity['calorieBurn'])
          }
        }
        var finalList = []
        for (var d in dataMap) {
          finalList.push({day: d, calories: dataMap[d]})
        }
        console.log(finalList)
        localStorage.setItem('activityData', JSON.stringify({ ...finalList}))
      }
      )
    }


    getAggregatedData()
    getAggregatedActivityData()
    const values = []
    const parsedData = JSON.parse(localStorage.getItem('chartData'))
    const activityD = JSON.parse(localStorage.getItem('activityData'))
  }, [])


  return (
    <div className="App">
      <div className="barChart">
      {/* <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div> */}
       <BarChart chartData={userData} />
      </div>
      <div className="lineChart">
        <LineChart chartData={activityData} />
      </div>
    </div>
  );
}

export default ActivityChart;
