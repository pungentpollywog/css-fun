import { useEffect } from 'react';
import './App.scss';

function App() {

  function handleMouseMove(ev) {
    document.body.style.setProperty('--mouseX', `${ev.clientX}px`);
    document.body.style.setProperty('--mouseY', `${ev.clientY}px`);
    const bodyRekt = document.body.getBoundingClientRect();

    const horizPercent = Math.floor( ev.clientX / bodyRekt.width * 100 );
    document.body.style.setProperty('--lava-stop', `${horizPercent}%`);

    const vertDeg = Math.floor( ev.clientY / bodyRekt.height * 360);
    document.body.style.setProperty('--lava-angle', vertDeg);
  }

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => document.body.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <header>
        <h1>Micro Fun</h1>
      </header>
    </>
  );
}

export default App;
