import React from 'react';

const App = () => {
  
  const width = 5;
  const height = 5;
  const size = 10;

  return (
    <div>
      <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" >
        <rect width="100%" height="100%" fill="gray" />
        {
          [...new Array(width).keys()].map(x => (
            [...new Array(height).keys()].map(y => (
              <rect x={`${x*size}`} y={y*size} width={size} height={size} fill="none" stroke="black" />
            ))
          ))
        }
      </svg>
    </div>
  );
}

export default App;
