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
        'flex cursor-pointer flex-row items-center justify-center gap-3 rounded border  px-3.5 py-2.5 text-primary',
        props.type === 'primary'
          ? 'border-primary text-primary'
          : 'border-quarteraly text-quarteraly'
      )}
      onClick={props.onClick}
      title={props.title}
    >
      {props.children}
      <span class="flex flex-col items-center justify-center">
        {props.title}
      </span>
    </button>
  )
}
export default Button
