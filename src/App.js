import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      {getCalendar(2019, 8)}
    </div>
  );
}

function getCalendar(year = new Date().getFullYear(), month = new Date().getMonth()){
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month - 1, 1);
  end.setMonth(end.getMonth() + 1);
  end.setDate(0); // 翌月月初を求め、さらにその1日前を取得
  
  // 日付連番の配列を作成
  let calendar = [];
  let week = Array(7).fill(null);
  for(start; start <= end; start.setDate(start.getDate() + 1)){
    week[start.getDay()] = new Date(start);
    if(start.getDay() === 6){
      calendar.push(week);
      week = Array(7);
    }
  }
  calendar.push(week);

  // HTMLを出力
  return <div id="calendar-body">
    <h1>{year}年{month}月</h1>
    <table id="calendar-table">
      <tbody>
        <tr id="calendar-day-name">
          <td class="sunday">日</td>
          <td>月</td>
          <td>火</td>
          <td>水</td>
          <td>木</td>
          <td>金</td>
          <td class="saturday">土</td>
        </tr>
        {calendar.map((week, weekkey) => {
          return <tr key={weekkey}>{
            week.map((date, datekey) => {
              if(date != null){
                switch(date.getDay()){
                  case 0:
                    return <td class="sunday" key={datekey}>{date.getDate()}</td>;
                  case 6:
                    return <td class="saturday" key={datekey}>{date.getDate()}</td>;
                  default:
                    return <td key={datekey}>{date.getDate()}</td>;
                }
              } else {
                return <td key={datekey}></td>;
              }
            })}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
}

export default App;
