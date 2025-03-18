import React from 'react'

interface SelectProps {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

function Select(props: SelectProps) {
  const { options, value, onChange, className, disabled, name } = props;
  return (
    <select
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className='text-black'>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
