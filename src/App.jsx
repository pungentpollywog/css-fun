import { useEffect, useState } from 'react';
import './App.scss';

import ThemePicker from './components/ThemePicker';

function App() {
  let bounds = document.body.getBoundingClientRect();

  let position = {
    x: Math.floor(bounds.width / 2),
    y: Math.floor(bounds.height / 2),
  };

  const delta = {
    min: 5,
    max: 15,
  };

  let change = {
    xDelta: genDelta(),
    xDir: 1,
    yDelta: genDelta(),
    yDir: 1,
  };

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

  useEffect(() => {
    window.addEventListener('resize', updateRektBody);
    () => window.removeEventListener('resize', updateRektBody);
  });

  function updateRektBody() {
    bounds = document.body.getBoundingClientRect();
  }

  function checkBounds() {
    if (position.x > bounds.width) {
      change.xDir = -1;
      position.x = bounds.width;
      updateDelta();
    }
    if (position.x < 0) {
      position.x = 0;
      change.xDir = 1;
      updateDelta();
    }
    if (position.y > bounds.height) {
      change.yDir = -1;
      position.y = bounds.height;
      updateDelta();
    }
    if (position.y < 0) {
      change.yDir = 1;
      position.y = 0;
      updateDelta();
    }
  }

  function autoMove() {
    console.log('change delta', { ...change });
    position.x += change.xDelta * change.xDir;
    position.y += change.yDelta * change.yDir;
    checkBounds();

    console.log('updating', 'x', position.x, 'y', position.y);
    document.body.style.setProperty('--mouseX', `${position.x}px`);
    document.body.style.setProperty('--mouseY', `${position.y}px`);

    const horizPercent = Math.floor((position.x / bounds.width) * 100);
    document.body.style.setProperty('--lava-stop', horizPercent);

    const vertDeg = Math.floor((position.y / bounds.height) * 360);
    document.body.style.setProperty('--lava-angle', vertDeg);
  }

  function handleMouseMove(ev) {
    console.log('handle mouse move');
    document.body.style.setProperty('--mouseX', `${ev.clientX}px`);
    document.body.style.setProperty('--mouseY', `${ev.clientY}px`);

    position.x = ev.clientX;
    position.y = ev.clientY;

    const horizPercent = Math.floor((ev.clientX / bounds.width) * 100);
    document.body.style.setProperty('--lava-stop', horizPercent);

    const vertDeg = Math.floor((ev.clientY / bounds.height) * 360);
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
