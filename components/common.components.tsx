import { ReactNode, FC } from "react";
import styles from '../styles/components/common.module.scss'

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
    className={`${props.className} ${styles.input}`}
    onPaste={(e)=> e.preventDefault()} 
    {...props }
    />)

// BUTTON COMPONENTS
interface IButton extends Partial<ITextArea> {
    onClick:  (param?:any) => void;
    children: ReactNode
}
export const Button:FC<IButton> = (props) => (<button className={styles.button} {...props }>{props.children}</button>)


