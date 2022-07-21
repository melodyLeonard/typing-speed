import { ReactNode, FC } from "react";

// TEXT AREA COMPONENT
interface ITextArea{
    value: string;
    className?: string;
    placeholder?: string;
    onFocus?: (param?:any) => void
    onChange: (param?:any) => void
}
export const TextArea:FC<ITextArea> = (props) => (
<textarea 
    onPaste={(e)=> e.preventDefault()} 
    {...props }
    />)

// BUTTON COMPONENTS
interface IButton extends Partial<ITextArea> {
    onClick:  (param?:any) => void;
    children: ReactNode
}
export const Button:FC<IButton> = (props) => (<button {...props }>{props.children}</button>)


