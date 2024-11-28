// InputLabelComponent.jsx

import React from 'react';

const InputLabelComponent = ({ htmlFor, labelText }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
      {labelText}
    </label>
  );
};

export default InputLabelComponent;
