import React, { useState } from 'react';
import QRScanner from './components/QRScanner';
import Form from './components/Form';

function App() {
  const [scannedCode, setScannedCode] = useState('');

  const handleCodeScanned = (code) => {
    setScannedCode(code);
  };

  return (
    <div className="App">
      <QRScanner onCodeScanned={handleCodeScanned} />
      <Form scannedCode={scannedCode} />
    </div>
  );
}

export default App;
