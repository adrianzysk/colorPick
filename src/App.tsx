import React from 'react';
import ColorInput from './components/ColorInput';
import ShowColors from './components/ShowColors';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ColorInput />
        <ShowColors />
    </div>
    );
  }
}

export default App;
