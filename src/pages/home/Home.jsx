import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useRef, useState } from "react";
import Video from "./world/Video";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef(null);
  //escucha que se activa cuanto se mueve el mouse lo que hace aparenar que se aciva el sonido apenas renderiza el contenido
  const handlePointerMove = useCallback(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.play(); 
      audioRef.current.setVolume(10);
      setIsPlaying(true); // cambiar estado para que no se reproduzca varias veces
    }
  }, [isPlaying, audioRef]);

  return (
    <>
      <Canvas camera={cameraSettings} onPointerMove={handlePointerMove}>
        <Suspense fallback={null}>
          <Perf position={"top-left"} />
          <Controls />
          <Lights />
          <Staging />
          <Physics debug={false}>
            <Beach />
          </Physics>
          <Video name="screen" position-y={10} scale={8} />
          <group position={[0, 5, 0]}>
            <PositionalAudio
              ref={audioRef}
              loop
              url="/sounds/waves.mp3"
              distance={3}
            />
          </group>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Home;
