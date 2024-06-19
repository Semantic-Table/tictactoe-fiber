import Frame from "./Frame"

export default function Game(props: { player: number, winner: number, setPlayer: (player: number) => void, setWinner: (winner: 1 | 2 | 3) => void, board: number[][], setBoard: (board: number[][]) => void }) {
  // we are doing a tic-tac-toe game

  const { player, setPlayer, setWinner, board, setBoard } = props


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

      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
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

      <mesh scale={[0.1, 0.1, 4]} position={[-0.55, 0.1, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh scale={[0.1, 0.1, 4]} position={[0.55, 0.1, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh scale={[4, 0.1, 0.1]} position={[0, 0.1, 0.55]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh scale={[4, 0.1, 0.1]} position={[0, 0.1, -0.55]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

    </>
  )
}