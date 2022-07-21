import {FC} from 'react';
import { estimatedWordsPerminute } from '../functions/handlers.function';

interface IProps{
    seconds: number
    symbols: number
}

const Speed:FC<IProps> = ({seconds, symbols}) => {
 if(!!seconds  && !!symbols){ 
    return <div>{estimatedWordsPerminute(symbols, seconds)}</div>
}

 return null
};

export default Speed;
