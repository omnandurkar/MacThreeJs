import { Canvas } from '@react-three/fiber';
import './App.css';
import { Environment, ScrollControls } from '@react-three/drei';
import MacContainer from './MacContainer';
import { useEffect, useState } from 'react';

function App() {
  const [cameraPosition, setCameraPosition] = useState([0, -10, 220]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) { // Tailwind's sm breakpoint is 640px
        setCameraPosition([0, -10, 420]);
      } else {
        setCameraPosition([0, -10, 220]);
      }
    };

    window.addEventListener('resize', handleResize);

    // Set the initial camera position
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-screen relative'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black'>
          {/* <h3 className='text-white text-2xl md:text-4xl'>Loading... Please wait</h3> */}
          <img src='https://cdn-icons-png.flaticon.com/128/189/189792.png' alt='loading' className='w-10 h-10 z-50 animate-spin  ' />
        </div>
      )}

      <div className='absolute text-center top-28 md:top-16 font-bold left-1/4 md:left-1/2 md:-translate-x-1/2 text-4xl md:text-7xl text-white'>
        <h3>MacBook Pro</h3>
      </div>

      <Canvas camera={{ fov: 12, position: cameraPosition }} onCreated={() => setLoading(false)}>
        <Environment files={["https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr"]} />
        <ScrollControls pages={3}>
          <MacContainer setLoading={setLoading} />
        </ScrollControls>
      </Canvas>

      <div className='absolute text-center bottom-28 md:bottom-16 font-semibold tracking-tighter  md:left-1/2 md:-translate-x-1/2 text-md md:text-2xl text-neutral-500'>
        <h3>Unleash unparalleled <span className='text-slate-300'>Power</span>  and <span className='text-slate-300'>Performance</span> with the MacBook Pro.</h3>
      </div>
      <div className='absolute text-center bottom-2 md:bottom-2 font-semibold tracking-tighter left-44   md:left-1/2 md:-translate-x-1/2 text-xs md:text-lg text-neutral-600'>
        <h3>Scroll Down</h3>
      </div>
    </div>
  );
}

export default App;
