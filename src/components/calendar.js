import React from 'react';
import style from './calendar.scss';

class Calendar extends React.Component{
  constructor(){
    super();
    this.state = {calendar: this.getCalendar(2019, 7)};
  }

  showBeforeMonth(){
    let year = this.state.calendar.year;
    let month = this.state.calendar.month - 1;
    if(month === 0){
      year--;
      month = 12;
    }
    this.setState({calendar: this.getCalendar(year, month)});
  }

  showNextMonth(){
    let year = this.state.calendar.year;
    let month = this.state.calendar.month + 1;
    if(month === 13){
      year++;
      month = 1;
    }
    this.setState({calendar: this.getCalendar(year, month)});
  }
  
  getCalendar(year = new Date().getFullYear(), month = new Date().getMonth()){
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month - 1, 1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0); // 翌月月初を求め、さらにその1日前を取得
    
    // 日付連番の配列を作成
    let calendar = [];
    let week = Array(7);
    for(start; start <= end; start.setDate(start.getDate() + 1)){
      // 月初より前の日を取得
      for(let i = start.getDay() - 1, j = new Date(start); i >= 0 && start.getDate() === 1; i--){
        j.setDate(j.getDate() - 1);
        week[i] = new Date(j);
      }

      week[start.getDay()] = new Date(start);

      // 月末より後の日を取得
      for(let i = start.getDay() + 1; i < 7; i++){
        start.setDate(start.getDate() + 1);
        week[i] = new Date(start);
      }

      // 一週間ぶんのデータをcalendar配列に追加
      if(start.getDay() === 6){
        calendar.push(week);
        week = Array(7);
      }
    }
    calendar.push(week);

    return {
      year: year,
      month: month,
      body: calendar
    };
  }

  render(){
    return <div id="calendar-body">
      <div id="calendar-header">
        <div id="calendar-before-month" onClick={() => {this.showBeforeMonth()}}>◀</div>
        <h1>{this.state.calendar.year}年{this.state.calendar.month}月</h1>
        <div id="calendar-next-month" onClick={() => this.showNextMonth()}>▶</div>
      </div>
      <table id="calendar-table">
        <tbody>
          <tr id="calendar-day-name">
            <td className="sunday">日</td>
            <td>月</td>
            <td>火</td>
            <td>水</td>
            <td>木</td>
            <td>金</td>
            <td className="saturday">土</td>
          </tr>
          {this.state.calendar.body.map((week, weekkey) => {
            return <tr key={weekkey}>{
              week.map((date, datekey) => {
                if(date != null){
                  if(date.getMonth() + 1 !== this.state.calendar.month){
                    return <td className="other-month" key={datekey}>{date.getDate()}</td>;
                  } else {
                    switch(date.getDay()){
                      case 0:
                        return <td className="sunday" key={datekey}>{date.getDate()}</td>;
                      case 6:
                        return <td className="saturday" key={datekey}>{date.getDate()}</td>;
                      default:
                        return <td key={datekey}>{date.getDate()}</td>;
                    }
                  }
                } else {
                  return <td key={datekey}></td>;
                }
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  }
}

export default Calendar;