import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,

} from "@react-three/postprocessing";



import { BlendFunction } from "postprocessing";
import { WebGLCubeRenderTarget } from "three";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture 
} from "@react-three/drei";
import "./style.scss";
import { Model } from "./Model";

function FullScene() {

  return (
    <>
      <OrbitControls 
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        max
      />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Model />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <EffectComposer>
        
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0012, 0.002]} // color offset
        />

      </EffectComposer>
    </>
  );
}

function App() {

  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <FullScene />
      </Canvas>
    </Suspense>
  );
}

export default App;