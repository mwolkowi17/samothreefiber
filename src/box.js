

export function Box1(){
  
  const kolor = 'blue';
  const wymiar =[3,3,3]

   return <mesh position={[0, -1, 1]}>
    <boxGeometry args={wymiar} />
    <meshStandardMaterial color={kolor} />
    
  </mesh>
}