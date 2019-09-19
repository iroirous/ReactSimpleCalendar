import React from 'react';
import './App.scss';
import Calendar from './components/calendar.js';

function App() {
  return (
    <div className="App">
      <Calendar />
      <p id="source-link">
        ソースコードは<a href="https://github.com/iroirous/ReactSimpleCalendar" target="_blank">Githubリポジトリ</a>で公開しています。<br />
        トップページは<a href="/">コチラ</a>から。
      </p>
    </div>
  );
}

export default App;
