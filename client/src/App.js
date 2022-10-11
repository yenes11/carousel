import './App.css';
import Slider from './components/Slider';
import MediaForm from './components/MediaForm';
import { useState } from 'react';

function App() {
  const [toggleAdd, setToggleAdd] = useState(true);

  return (
    <div className="App">
      <Slider toggle={toggleAdd} />
      <MediaForm settoggle={setToggleAdd} />
    </div>
  );
}

export default App;
