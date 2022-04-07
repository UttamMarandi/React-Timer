import "./App.css";
import ClockTop from "./Components/ClockTop";

function App() {
  const date = "2022-04-08T00:22:13Z";
  return (
    <div className="App">
      <ClockTop countDownDate={date} />
    </div>
  );
}

export default App;
