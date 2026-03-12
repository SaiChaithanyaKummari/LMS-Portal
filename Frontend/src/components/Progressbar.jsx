import React from 'react';

export default function Progressbar({ percent }) {
  return (
    <div style={{ width: '100%', background: '#eee', borderRadius: 8, height: 24, marginBottom: 8 }}>
      <div
        style={{
          width: percent + '%',
          background: '#4caf50',
          height: '100%',
          borderRadius: 8,
          transition: 'width 0.5s',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        {percent}%
      </div>
    </div>
  );
}
