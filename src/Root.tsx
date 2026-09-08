import React from 'react';
import {Composition} from 'remotion';
import {ThinkingNightSample} from './ThinkingNightSample';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ThinkingNightSample"
      component={ThinkingNightSample}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
