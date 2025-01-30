import * as React from 'react';
import './App.css'
import "@fontsource/libre-franklin"
import "@fontsource/poppins"
import Timeline from "./components/Timeline";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Timeline />
    </div>
  );
};

export default App;

