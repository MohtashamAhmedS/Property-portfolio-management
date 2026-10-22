import Link from 'next/link'

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  type = 'button',
}) {
  const baseStyles =
    'h-[47px] px-[15px] inline-flex items-center justify-center rounded-xl font-medium shadow-[4px_2px_4px_rgba(0,0,0,0.25)] transition-all hover:brightness-110 active:translate-y-[1px]'

  const variants = {
    primary: 'bg-[#002C83] text-white',
    secondary: 'bg-white text-[#002C83]',
  }

  const classes = `${baseStyles} ${variants[variant]}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
