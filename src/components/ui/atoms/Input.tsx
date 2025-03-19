import React from 'react'

interface InputProps {
    type: string;
    name?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean
  }

function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      required={props.required}
      autoComplete="off"
    />
  )
}

export default Input
