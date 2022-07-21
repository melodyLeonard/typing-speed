import React, {Children, FC} from 'react';
import wordStyle from '../styles/components/wordpreview.module.scss'
import { ReactNode } from 'react';
interface IProps {
  text: string;
  userInput: string
  className?:string;
  children?: ReactNode
}
const WordPreview:FC<IProps> = ({text, userInput, className, children}) => {
  
  return (<div className={className}>{
    text.split('').map((word,index) => {
      let color='';
      let currentIndex = ''
      if(index < userInput.length){
        color = word === userInput[index]? 'correct' : 'incorrect'
        currentIndex = index === userInput.length-1 ? 'current-word' : ''
      }
      return <span className={`${wordStyle.text} ${wordStyle[currentIndex]} ${wordStyle[color]}`} key={index}>{word}</span>
    })
    }
    {children}
    </div>)
};

export default WordPreview;
