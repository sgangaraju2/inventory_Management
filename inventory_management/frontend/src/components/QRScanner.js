import React from 'react';
import { useZxing } from 'react-zxing';

const QRScanner = ({ onCodeScanned }) => {
  const { ref } = useZxing({
    constraints: {
      video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280 },
        height: { min: 480, ideal: 720 }
      }
    },
    scanDelay: 500,
    onDecodeResult(result) {
      const scannedCode = result.getText();
      console.log("Scanned code:", scannedCode); // Debug log
      onCodeScanned(scannedCode);
    },
    onError(error) {
      console.error("Scanner Error:", error);
    }
  });

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '640px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2>Scan QR Code</h2>
      <div style={{
        position: 'relative',
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          ref={ref} 
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          border: '2px solid #fff',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          borderRadius: '10px'
        }} />
      </div>
    </div>
  );
};

export default QRScanner;
