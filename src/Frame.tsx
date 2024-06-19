export default function Frame(props: { i: number, j: number, cell: number, setCell: (i: number, j: number) => void }) {
  const { i, j, setCell } = props

  

  return <>
    <group position={[i + 0.1 * i, j + 0.1 * j, 0]}>
      <mesh


        onClick={() => {
          if (props.cell === 0) {
            setCell(i, j)
          }
        }}
      >
        <planeGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" transparent={true} opacity={0} />
      </mesh>

      {props.cell === 1 && <mesh position-z={0.1}>
        <torusGeometry attach="geometry" args={[0.3, 0.1, 3, 30]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>}

      {props.cell === 2 &&
        <group position-z={0.1}>
          <mesh scale={[0.8, 0.1, 0.1]} rotation-z={Math.PI / 4}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color="blue" />
          </mesh>
          <mesh scale={[0.8, 0.1, 0.1]} rotation-z={-Math.PI / 4}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color="blue" />
          </mesh>
        </group>
      }
    </group>

  </>
}