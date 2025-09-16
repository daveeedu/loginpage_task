import React from 'react'
import type { ButtonProps } from '../type/commonType'

const Button: React.FC<ButtonProps> = ({ className, text, icon, onClick, disabled }) => {
  return (
    <button className={` ${className}`} onClick={disabled ? undefined : onClick} disabled={disabled}>
        {icon ? (
          <img src={icon} alt="button icon"/>
        ) : null}
      {text}
    </button>
  )
}

export default Button