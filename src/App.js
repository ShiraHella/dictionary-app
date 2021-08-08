import './App.css';
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Dictionary</h1>

        </header>
        <main>
          <Dictionary />
        </main>
        <footer className="App-footer"><small>Coded by Shira and is <a href="https://github.com/ShiraHella/dictionary-app">open source</a>.</small></footer>
      </div>
    </div>
  );
}

export default App;
