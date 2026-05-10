import React from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import LogoAnimation from './LogoAnimation';
import Beams from './Beams';

/**
 * EntranceScreen — Full-screen splash overlay with light beams and entry interaction.
 */
const EntranceScreen = ({ onEnter }) => {
  const [playChime] = useSound('/sounds/chime.mp3', { volume: 0.5 });

  // Start chime on mount (best effort - might be blocked by browser)
  React.useEffect(() => {
    playChime();
  }, [playChime]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <Beams 
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#F43F5E"
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <LogoAnimation onComplete={onEnter} />
      </div>
    </motion.div>
  );
};

export default EntranceScreen;
