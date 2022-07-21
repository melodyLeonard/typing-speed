import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import WordPreview from '../components/WordPreview.components.'
import styles from '../styles/Home.module.scss'
import { Button, TextArea } from '../components/common.components';


// textarea intial state and type
interface IInitialState {
  randomtext: string
  userInput: string
  symbols: number
  seconds: number
  started: boolean
  finished: boolean
}

const initialState ={
    randomtext: 'this is some ramdom test',
    userInput: '',
    symbols: 0, 
    seconds: 0,
    started: false,
    finished: false
  }

const Home: NextPage = () => {
  const [state, setState] = useState<IInitialState>(initialState)

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
    setTimer()
    setState({
      ...state,
      userInput: e.target.value,
      symbols: countSymbols(e.target.value)
    })
  }

  const setTimer =()=>{
    if(!state.started){
      setState({...state, started:true})
      // const interval = setInterval(() =>{
      //   return setState({
      //     ...state,
      //     seconds: state.seconds + 1
      //   })
      // },1000)
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Speed Writer</title>
        <meta name="description" content="This is a speed typing game to boost your typing speed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Score: 0
        </h1>

        <p className={styles.description}>
          You can start the game anytime you are ready{' '}
        </p>

        <div className={styles.grid}>
          <WordPreview text={state.randomtext} userInput={state.userInput}/>

          <TextArea onChange={(e) => handleUserInputChange(e)} value={state.userInput} placeholder='Start Typing...' />
          <Button onClick={() => handleRestartGame()}>Restart</Button>
        </div>
      </main>
    </div>
  )
}

export default Home
