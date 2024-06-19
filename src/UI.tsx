import './UI.css'

export default function UI(props: { player: number, winner: number, reset: () => void}) {
  const { player, winner, reset } = props
  return (
    <>
      <div className="ui">
        <div className='title'>
          <h1>Tic Tac Toe</h1>
          <h2>3D Version</h2>
        </div>

        <div className='player'>
          <h3>Player {player === 1 ? `${player} (X)` : `${player} (O)`} Turn</h3>
        </div>
      </div>

      {winner !== 0 &&
        <div className='overlay'>
          <div className='winner'>
            {winner === 3 ? <h1>Draw</h1> : <h1>Player {winner} Wins</h1>}
          </div>
          <button className='button' onClick={reset}>Replay ?</button>
        </div>
      }

    </>
  )
}