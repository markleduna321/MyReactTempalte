import React from 'react';

const InputTextComponent = ({ id, name, type = "text", required = false, autoComplete,placeholder,onChange,value }) => {
  return (
    <div className="mt-1">
      <div className="relative rounded-md shadow-sm">
        <input
          id={id}
          value={value}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder} // Optional placeholder
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputTextComponent;
