import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei"

import { Mesh } from "three";

import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'


import * as genericMaterials from "./GenericMaterials/GenericMaterials";

export function Model() {

  const ref = useRef()

  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes } = useGLTF(process.env.PUBLIC_URL + "models/codesandbox.glb")
  useGLTF.preload(process.env.PUBLIC_URL + "models/codesandbox.glb");
  
  useEffect(() => {
    ref.current.traverse((node) => {
      if (node instanceof Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        node.material.envMapIntensity = 20;
      }
    });
  });

  return (
    <group ref={ref} dispose={null} position={[0, 0.7, 0]} rotation={[0,1.57,0]} scale={[1.2,1.2,1.2]}>

      <mesh
          geometry={nodes.faring.geometry}
          material={genericMaterials.glosspaint}
          position={[-0.14, 0.03, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.75}
        />

      <mesh
          geometry={nodes.clusterHousing.geometry}
          material={genericMaterials.gunmetal}
          position={[-0.41, 0.17, 0]}
          rotation={[0, 0, Math.PI / 6]}
          scale={[0.06, 0.06, 0.06]}
        />

      <mesh
          geometry={nodes.windshield.geometry}
          material={genericMaterials.glass}
          position={[-0.14, 0.03, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.75}
        >
          {/* <LayerMaterial
          color={'#ffffff'}
          lighting={'physical'} //
          transmission={1}
          roughness={0.1}
          thickness={2}
          >
          <Depth
            near={0.4854}
            far={0.7661999999999932}
            origin={[-0.4920000000000004, 0.4250000000000003, 0]}
            colorA={'#fec5da'}
            colorB={'#00b8fe'}
          />
          <Fresnel
            color={'#fefefe'}
            bias={-0.3430000000000002}
            intensity={3.8999999999999946}
            power={3.3699999999999903}
            factor={1.119999999999999}
            mode={'screen'}
          />
        </LayerMaterial> */}
        </mesh>

        
        
      </group>
  );
}