import styles from './Button.module.css';

// variant: 'primary' | 'glass'. loading блокує кнопку і показує loadingText.
export default function Button({
  variant = 'primary',
  type = 'button',
  loading = false,
  loadingText,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`button button--${variant} ${styles.root} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
