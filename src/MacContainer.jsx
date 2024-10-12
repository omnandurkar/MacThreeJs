import { useGLTF, useScroll, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const MacContainer = ({ setLoading }) => {
    let model = useGLTF('./mac.glb', true, setLoading(false)); // model loading finished
    let tex = useTexture('./red.jpg');
    let meshes = {};
    model.scene.traverse(e => {
        meshes[e.name] = e;
    });

    meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
    meshes.matte.material.map = tex;
    meshes.matte.material.emissiveIntensity = 0;
    meshes.matte.material.metalness = 0;
    meshes.matte.material.roughness = 0.7;
    let data = useScroll();

    useFrame((state, delta) => {
        meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
    });

    useEffect(() => {
        setLoading(false); // Indicate that the model is loaded
    }, [setLoading]);

    return (
        <group position={[0, -11, 20]} >
            <primitive object={model.scene} />
        </group>
    )
}

export default MacContainer;
