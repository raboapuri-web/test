import React from 'react';
import {Composition} from 'remotion';
import {ThinkingNightSample} from './ThinkingNightSample';
import {ThinkingNightPilot} from './ThinkingNightPilot';

export const RemotionRoot: React.FC = () => {
  return (<>
    <Composition
      id="ThinkingNightSample"
      component={ThinkingNightSample}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="ThinkingNightPilot"
      component={ThinkingNightPilot}
      durationInFrames={480}
      fps={30}
      width={1920}
      height={1080}
    />
  </>);
};
