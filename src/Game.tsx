import { useEffect, useRef } from "react"
import { DirectionalLight } from "three"
import Frame from "./Frame"
import gsap from "gsap"

export default function Game(props: { player: number, winner: number, setPlayer: (player: number) => void, setWinner: (winner: 1 | 2 | 3) => void, board: number[][], setBoard: (board: number[][]) => void }) {
  // we are doing a tic-tac-toe game

  const directionnalLight = useRef<DirectionalLight>(null)
  const { player, setPlayer, setWinner, board, setBoard } = props


  // using gsap to animate the light
  useEffect(() => {
    if (directionnalLight.current) {
      gsap.to(directionnalLight.current.position, {
        duration: 5,
        x: -20,
        z: -20,
        repeat: -1,
        yoyo: true,
        ease: 'linear'
      })
    }

  }, [])

  const setCell = (i: number, j: number) => {
    const newBoard = [...board]
    newBoard[i][j] = player
    setPlayer(player === 1 ? 2 : 1)

    // check for winner
    for (let i = 0; i < 3; i++) {
      if (newBoard[i][0] === newBoard[i][1] && newBoard[i][1] === newBoard[i][2] && newBoard[i][0] !== 0) {
        setWinner(newBoard[i][0] as 1 | 2)
        return
      }
      if (newBoard[0][i] === newBoard[1][i] && newBoard[1][i] === newBoard[2][i] && newBoard[0][i] !== 0) {
        setWinner(newBoard[0][i] as 1 | 2)
        return
      }
    }

    if (newBoard[0][0] === newBoard[1][1] && newBoard[1][1] === newBoard[2][2] && newBoard[0][0] !== 0) {
      setWinner(newBoard[0][0] as 1 | 2)
      return
    }

    if (newBoard[0][2] === newBoard[1][1] && newBoard[1][1] === newBoard[2][0] && newBoard[0][2] !== 0) {
      setWinner(newBoard[0][2] as 1 | 2)
      return
    }

    // check for draw
    let draw = true
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === 0) {
          draw = false
        }
      }
    }

    if (draw) {
      setWinner(3)
    }


    setBoard(newBoard)
  }

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}
      {/* <pointLight ref={pointLight} position={[-10, 10, -10]} intensity={4} /> */}
      <directionalLight ref={directionnalLight} position={[20, 10, 20]} intensity={0.8} />
      <group position={[-1.1, 0, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        {
          board.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <Frame i={i} j={j} key={i + j} cell={cell} setCell={setCell} />
              )
            })
          })
        }
      </group>

      <mesh scale={[4.2, 0.3, 4.2]} position={[0, -0.3, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#EEAE62" />
      </mesh>

      <mesh scale={[1, 4, 1]} position={[0.55, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
        <meshStandardMaterial color="#E7856D" />
      </mesh>

      <mesh scale={[1, 4, 1]} position={[-0.55, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
        <meshStandardMaterial color="#E7856D" />
      </mesh>

      <mesh scale={[1, 4, 1]} position={[0, -0.15, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
        <meshStandardMaterial color="#E7856D" />
      </mesh>
      <mesh scale={[1, 4, 1]} position={[0, -0.15, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 20]} />
        <meshStandardMaterial color="#E7856D" />
      </mesh>

    </>
  )
}