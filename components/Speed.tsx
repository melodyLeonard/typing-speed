import {FC} from 'react';
import { estimatedWordsPerminute } from '../functions/handlers.function';

interface IProps{
    seconds: number
    symbols: number
}

const Speed:FC<IProps> = ({seconds, symbols}) => {
 if(!!seconds  && !!symbols){ 
    return <span>{estimatedWordsPerminute(symbols, seconds)}</span>
}

 return null
};

export default Speed;
