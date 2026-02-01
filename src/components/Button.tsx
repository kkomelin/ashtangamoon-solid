import c from 'clsx'

interface IProps {
  onClick: (e: MouseEvent) => void
  title: string
  children: any
  type: 'primary' | 'secondary'
}
const Button = (props: IProps) => {
  return (
    <button
      class={c(
        'text-primary flex cursor-pointer flex-row items-center justify-center gap-3 rounded-sm border px-3.5 py-2.5 transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        props.type === 'primary'
          ? 'border-primary text-primary hover:bg-primary/10 focus:ring-primary'
          : 'border-quarteraly text-quarteraly hover:bg-quarteraly/10 focus:ring-quarteraly'
      )}
      onClick={props.onClick}
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
      <span class="flex flex-col items-center justify-center">
        {props.title}
      </span>
    </button>
  )
}
export default Button
