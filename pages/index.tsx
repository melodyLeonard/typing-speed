import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useRef, useState } from 'react'
import WordPreview from '../components/WordPreview.components.'
import styles from '../styles/Home.module.scss'
import { Button, TextArea } from '../components/common.components';
import Speed from '../components/Speed';
import { data } from '../data/words.data';


// textarea intial state and type
interface IInitialState {
  randomtext: string
  userInput: string
  symbols: number
  started: boolean
  finished: boolean
}

const initialState ={
    userInput: '',
    symbols: 0, 
    started:false,
    finished: false
  }

  let interval:any;
  let Rmv = 1;

const Home: NextPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [state, setState] = useState<IInitialState>({randomtext: data[currentWordIndex],...initialState})
  const initialTime = Math.floor(state.randomtext.length / 3)
  const [time, setTime] = useState(initialTime)
  const [seconds, setSeconds] = useState(0)
  const [disableInput, setDisableInput] = useState(true)
  const focusTextArea = useRef<HTMLInputElement>();

  const countCorrectSymbols = (userInput:string): number => {
    const text = state.randomtext.replace(' ', '')
    return userInput.replace(' ', '').split('').filter((sym, idx) => sym === text[idx]).length
  }

  // textarea input change handler
  const handleUserInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      userInput: e.target.value,
      symbols: countCorrectSymbols(e.target.value)
    })
  }

  const startTimer = () => {
    setDisableInput(false)
    if(focusTextArea.current) focusTextArea.current.focus();
    interval = setInterval(() => {
      if(interval && Rmv === initialTime + 1) {
        clearInterval(interval);
        Rmv = 1;
        setDisableInput(true)
        return;
      }
      setTime(time - Rmv)
      setSeconds(seconds + Rmv)
      Rmv = Rmv+1
    }, 1000);
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Speed Writer</title>
        <meta name="description" content="This is a speed typing game to boost your typing speed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {
            time === 0 ? 
            <>
              <h1>Game Over</h1>
              <h3> You made a total point of {state.symbols}</h3>
            </>
            :
            <h1>
            {time}
          </h1>
          }
          
        </div>
          <div className={styles.card}>
            <WordPreview className={styles.wordPreview} text={state.randomtext} userInput={state.userInput}>
              <div className={styles.controls}>
                <div className={styles.leftWrapper}>
                  <div className={styles.item}>
                    WPM: { <Speed seconds={seconds} symbols={state.symbols}/>}
                  </div>
                  <div className={styles.item}>
                    Points: {state.symbols}
                  </div>
                  </div>
               <div className={styles.item}>
                 <Button onClick={() => startTimer()}>
                  <span>
                    Start
                  </span>
                 </Button>
               </div>
            </div>
            </WordPreview>
          </div>
          <div className={styles.card}>
          <TextArea 
            ref={focusTextArea} 
            disabled={disableInput} 
            onChange={(e) => handleUserInputChange(e)} 
            value={state.userInput} 
            placeholder='Start Typing...' />
          </div>
      </main>
    </div>
  )
}

export default Home
