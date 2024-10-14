import { useEffect, useState } from 'react';
import './App.scss';

import ThemePicker from './components/ThemePicker';

function App() {
  const bodyRekt = document.body.getBoundingClientRect();

  let position = {
    x: Math.floor(bodyRekt.width / 2),
    y: Math.floor(bodyRekt.height / 2),
  };

  const delta = {
    min: 5,
    max: 15
  };

  let change = {
    xDelta: genDelta(),
    xDir: 1, 
    yDelta: genDelta(), 
    yDir: 1
  }

  // const auto = true;

  function genDelta() {
    return Math.ceil(Math.random() * delta.max) + delta.min;
  }

  function updateDelta() {
    change.xDelta = genDelta();
    change.yDelta = genDelta();
  }

  useEffect(() => {
    const timerID = setInterval(autoMove, 50);
    return () => clearInterval(timerID);
  }, []);


  function checkBounds() {
    if (position.x > bodyRekt.width) {
      change.xDir = -1;
      position.x = bodyRekt.width;
      updateDelta();
    }
    if (position.x < 0) {
      position.x = 0;
      change.xDir = 1;
      updateDelta();
    }
    if (position.y > bodyRekt.height) {
      change.yDir = -1;
      position.y = bodyRekt.height;
      updateDelta();
    }
    if (position.y < 0) {
      change.yDir = 1; 
      position.y = 0;
      updateDelta();
    }
  }

  function autoMove() {
    console.log('change delta', {...change});
    position.x += change.xDelta*change.xDir;
    position.y += change.yDelta*change.yDir;
    checkBounds();

    console.log('updating', 'x', position.x, 'y', position.y);
    document.body.style.setProperty('--mouseX', `${position.x}px`);
    document.body.style.setProperty('--mouseY', `${position.y}px`);

    const horizPercent = Math.floor((position.x / bodyRekt.width) * 100);
    document.body.style.setProperty('--lava-stop', horizPercent);

    const vertDeg = Math.floor((position.y / bodyRekt.height) * 360);
    document.body.style.setProperty('--lava-angle', vertDeg);
  }

  function handleMouseMove(ev) {
    console.log('handle mouse move');
    document.body.style.setProperty('--mouseX', `${ev.clientX}px`);
    document.body.style.setProperty('--mouseY', `${ev.clientY}px`);
    // const bodyRekt = document.body.getBoundingClientRect();

    const horizPercent = Math.floor((ev.clientX / bodyRekt.width) * 100);
    document.body.style.setProperty('--lava-stop', horizPercent);

    const vertDeg = Math.floor((ev.clientY / bodyRekt.height) * 360);
    document.body.style.setProperty('--lava-angle', vertDeg);
  }

  useEffect(() => {
    document.body.addEventListener('mousemove', handleMouseMove);
    return () =>
      document.body.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <header>
        <h1>Micro Fun</h1>
        <ThemePicker />
      </header>
    </>
  );
}

export default App;
