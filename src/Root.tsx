import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';

const Sandbox: React.FC = () => <AbsoluteFill style={{backgroundColor: '#000'}} />;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Sandbox"
      component={Sandbox}
      durationInFrames={30}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
