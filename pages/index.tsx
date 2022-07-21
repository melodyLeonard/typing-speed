import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState, useEffect } from 'react'
import WordPreview from '../components/WordPreview.components.'
import styles from '../styles/Home.module.scss'
import { Button, TextArea } from '../components/common.components';
import Speed from '../components/Speed';


// textarea intial state and type
interface IInitialState {
  randomtext: string
  userInput: string
  symbols: number
  seconds: number
}

const initialState ={
    randomtext: 'this is some ramdom test',
    userInput: '',
    symbols: 0, 
    seconds: 0,
  }

const Home: NextPage = () => {
  const [state, setState] = useState<IInitialState>(initialState)
  const initialTime = Math.floor(state.randomtext.length / 5)
  const [time, setTime] = useState(initialTime)

  // restart game function
  const handleRestartGame = () => {
    setState(initialState)
  }

  const countSymbols = (userInput:string): number => {
    const text = state.userInput.replace(' ', '')
    return userInput.replace(' ', '').split('').filter((sym, idx) => sym === text[idx]).length
  }

  // textarea input change handler
  const handleUserInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      userInput: e.target.value,
      symbols: countSymbols(e.target.value)
    })
  }
  
   useEffect(() => {
    const interval = setInterval(() => {
      if(time > 0){
        setTime(time => time - 1);
        
      }
    }, 1000);
    setState(({seconds}) => ({...state, seconds: seconds+ 1 }))
    return () => clearInterval(interval);
  }, [time]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Speed Writer</title>
        <meta name="description" content="This is a speed typing game to boost your typing speed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>
            {time}
          </h1>
        </div>
          <div className={styles.card}>
            <WordPreview className={styles.wordPreview} text={state.randomtext} userInput={state.userInput}>
              <div className={styles.controls}>
                <div className={styles.item}>
                 Seconds: {state.seconds}
                </div>
                <div className={styles.item}>
                  WPM: { <Speed seconds={state.seconds} symbols={state.symbols}/>}
                </div>
                <div className={styles.item}>
                  Total Points: {state.symbols}
                </div>
               <div className={styles.item}>
                 <Button onClick={() => handleRestartGame()}>
                  <span>
                    Restart
                  </span>
                 </Button>
               </div>
            </div>
            </WordPreview>
          </div>
          <div className={styles.card}>
          <TextArea onChange={(e) => handleUserInputChange(e)} value={state.userInput} placeholder='Start Typing...' />
          </div>
      </main>
    </div>
  )
}

export default Home
