import React, { useState, useEffect } from 'react';

const Form = ({ scannedCode }) => {
  const [formData, setFormData] = useState({
    productCode: scannedCode || '',
    lotNumber: '',
    name: '',
    quantity: '',
    action: 'Add'
  });

  useEffect(() => {
    if (scannedCode) {
      setFormData(prev => ({
        ...prev,
        productCode: scannedCode
      }));
    }
  }, [scannedCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Inventory updated successfully!');
        setFormData({
          productCode: '',
          lotNumber: '',
          name: '',
          quantity: '',
          action: 'Add'
        });
      } else {
        alert('Error updating inventory');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label>Product Code:</label>
        <input 
          type="text" 
          name="productCode"
          value={formData.productCode} 
          readOnly 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Lot Number:</label>
        <input 
          type="text" 
          name="lotNumber"
          value={formData.lotNumber}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Name:</label>
        <input 
          type="text"
          name="name" 
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Quantity:</label>
        <input 
          type="number"
          name="quantity" 
          value={formData.quantity}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Action:</label>
        <select 
          name="action"
          value={formData.action}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="Add">Add</option>
          <option value="Remove">Remove</option>
        </select>
      </div>
      
      <button 
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
