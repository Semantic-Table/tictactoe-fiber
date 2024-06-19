import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { Vector3 } from 'three'
import './App.css'
import Game from './Game'
import UI from './UI'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function App() {

  const [player, setPlayer] = useState(1)
  const [winner, setWinner] = useState<0 | 1 | 2 | 3>(0)
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])

  const reset = () => {
    setPlayer(1)
    setWinner(0)

    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  }

  return (
    <>
      <UI player={player} winner={winner} reset={reset} />
      <Canvas camera={{ position: new Vector3(0, 5, 0) }}>
        <EffectComposer>
          <Bloom luminanceThreshold={-8} luminanceSmoothing={0} intensity={3}  />
        </EffectComposer>
        <OrbitControls />
        <ambientLight />
        <Game player={player} winner={winner} setPlayer={setPlayer} setWinner={setWinner} board={board} setBoard={setBoard} />
      </Canvas>
    </>
  )
}

export default App
