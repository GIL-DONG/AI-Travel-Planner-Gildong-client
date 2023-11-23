import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'lined'
    | 'disabled'
    | 'pure'
    | 'record';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'black' | 'white' | 'delete';
  icon?: ReactNode;
  iconBtn?: boolean;
  full?: boolean;
  shadow?: boolean;
  opacity?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string | undefined;
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => void;
}

interface SizeTypes {
  sm: string;
  md: string;
  lg: string;
}

interface VariantTypes {
  default: string;
  primary: string;
  secondary: string;
  lined: string;
  disabled: string;
  pure: string;
  record: string;
}

interface ColorTypes {
  primary: string;
  secondary: string;
  black: string;
  white: string;
  delete: string;
}

const SIZES: SizeTypes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const VARIANTS: VariantTypes = {
  default: styles.default,
  primary: styles.primary,
  secondary: styles.secondary,
  lined: styles.lined,
  disabled: styles.disabled,
  pure: styles.pure,
  record: styles.record,
};

const COLORS: ColorTypes = {
  primary: styles.text_primary,
  secondary: styles.text_secondary,
  black: styles.text_black,
  white: styles.text_white,
  delete: styles.text_delete,
};

export default function Button({
  type,
  variant = 'default',
  color,
  size = 'md',
  icon,
  iconBtn,
  full,
  shadow,
  opacity,
  children,
  className,
  disabled,
  to,
  label,
  onClick,
}: ButtonProps) {
  const classNameValues = classNames(
    styles.btn,
    SIZES[size as keyof SizeTypes],
    VARIANTS[variant as keyof VariantTypes],
    COLORS[color as keyof ColorTypes],
    { [styles.is_full]: full },
    { [styles.is_shadow]: shadow },
    { [styles.is_opacity]: opacity },
    { [styles.is_icon]: icon },
    { [styles.is_disabled]: disabled },
    { [styles.is_icon_btn]: iconBtn },
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classNameValues}>
        {icon}
        {!iconBtn ? (
          <span>{children}</span>
        ) : (
          <span className={styles.blind}>{children}</span>
        )}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNameValues}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
      {!iconBtn ? (
        <span>{children}</span>
      ) : (
        <span className={styles.blind}>{children}</span>
      )}
    </button>
  );
}
