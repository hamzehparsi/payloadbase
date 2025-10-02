type Props = {
  label: string
  name: string
  type: 'text' | 'password' | 'email'
  placeholder?: string
  required?: boolean
}
export const Input = (props: Props) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <label className="font-normal text-xs text-slate-600" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        required={props.required}
        className={`w-full !border-slate-300 border !rounded-lg px-2 py-1.5 text-slate-700 active:!border-blue-700 focus:border-blue-500`}
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={
          props.placeholder
            ? props.placeholder
            : `لطفا وارد نمایید ${props.label.toLowerCase()} خود را`
        }
      />
    </div>
  )
}
