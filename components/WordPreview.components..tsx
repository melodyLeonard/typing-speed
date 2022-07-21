import React, {FC} from 'react';
import wordStyle from '../styles/components/wordpreview.module.scss'
interface IProps {
  text: string;
  userInput: string
}
const WordPreview:FC<IProps> = ({text, userInput}) => {
  
  return (<div className={wordStyle.container}>{
    text.split('').map((word,index) => {
      let color='';
      let currentIndex = ''
      if(index < userInput.length){
        color = word === userInput[index]? 'correct' : 'incorrect'
        currentIndex = index === userInput.length-1 ? 'current-word' : ''
      }
      return <span className={`${wordStyle.text} ${wordStyle[currentIndex]} ${wordStyle[color]}`} key={index}>{word}</span>
    })
    }</div>)
};

export default WordPreview;
