import { Canvas } from '@react-three/fiber';
import './App.css';
import { Environment, ScrollControls } from '@react-three/drei';
import MacContainer from './MacContainer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [cameraPosition, setCameraPosition] = useState([0, -10, 220]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setCameraPosition([0, -10, 420]);
      } else {
        setCameraPosition([0, -10, 220]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-screen relative'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black to-gray-900'>
          <img
            src='https://cdn-icons-png.flaticon.com/128/189/189792.png'
            alt='loading'
            className='w-16 max-lg:w-10 max-lg:h-10 h-16 z-50 animate-spin'
          />
        </div>
      )}

      {/* Main Title */}
      <div

        className='absolute text-center top-28 md:top-6 left-1/2 transform -translate-x-1/2 font-bold text-white'
      >
        <h1 className='text-4xl md:text-8xl bg-gradient-to-b from-gray-700 via-slate-300 to-white bg-clip-text text-transparent '>
          MacBook Pro
        </h1>
        <p className='text-lg md:text-2xl mt-4 text-gray-300'>
          Redefining <span className='font-semibold text-white'>Power</span> and <span className='font-semibold text-white'>Performance</span>
        </p>
      </div>

      {/* 3D MacBook Model */}
      <Canvas camera={{ fov: 12, position: cameraPosition }} onCreated={() => setLoading(false)}>
        <Environment files={["https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr"]} />
        <ScrollControls pages={3}>
          <MacContainer setLoading={setLoading} />
        </ScrollControls>
      </Canvas>

      {/* Bottom Description */}
      <div className='absolute bottom-28 md:bottom-16 left-1/2 transform -translate-x-1/2 text-center text-neutral-300'>
        <p className='text-md md:text-2xl font-semibold'>
          <span className='text-slate-300'>Unleash unparalleled</span> <br className='md:hidden' />
          <span className='text-slate-200 font-bold'>Power and Performance</span>
          <span className='text-slate-300'> with MacBook Pro.</span>
        </p>
      </div>

      {/* Scroll Prompt */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-xs md:text-lg text-gray-500'>
        <h3 className='animate-bounce '>Scroll Down</h3>
        {/* <img src='https://cdn-icons-png.flaticon.com/128/724/724948.png' alt='scroll' className='w-6 h-6 mx-auto mt-2 animate-bounce' /> */}
      </div>
    </div>
  );
}

export default App;
