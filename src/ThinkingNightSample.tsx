import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BG = '#070A10';
const IVORY = '#E8E0D0';
const GOLD = '#B89A5D';
const DIM = '#706D66';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: 0.08,
        mixBlendMode: 'screen',
        backgroundImage: `repeating-radial-gradient(circle at ${40 + (frame % 7)}% ${50 + (frame % 5)}%, rgba(255,255,255,.18) 0px, rgba(255,255,255,.03) 1px, transparent 2px, transparent 5px)`,
      }}
    />
  );
};

const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const appear = spring({frame, fps, config: {damping: 16, stiffness: 80}});
  const zoom = interpolate(frame, [0, 120], [1.08, 1], clamp);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `scale(${zoom})`}}>
      <div style={{width: 2, height: interpolate(frame, [10, 45], [0, 110], clamp), background: GOLD, marginBottom: 40}} />
      <div style={{color: IVORY, fontFamily: 'Hiragino Mincho ProN, Yu Mincho, serif', fontWeight: 600, textAlign: 'center', lineHeight: 1.45, fontSize: 84, letterSpacing: '0.08em', opacity: appear, transform: `translateY(${(1 - appear) * 40}px)`}}>
        人はなぜ<br />
        <span style={{color: GOLD}}>他人と比べてしまう</span>のか
      </div>
      <div style={{position: 'absolute', bottom: 110, color: DIM, fontFamily: 'Arial', fontSize: 21, letterSpacing: '0.4em', opacity: interpolate(frame, [50, 100], [0, 0.8], clamp)}}>
        SOCIAL COMPARISON
      </div>
    </AbsoluteFill>
  );
};

const Person: React.FC<{x: number; amount: string; delay: number}> = ({x, amount, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 100}});
  return (
    <div style={{position: 'absolute', left: x, top: 250, width: 430, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 70}px)`}}>
      <div style={{color: GOLD, fontFamily: 'Georgia', fontSize: 54, marginBottom: 35}}>{amount}</div>
      <div style={{width: 130, height: 130, borderRadius: '50%', border: `2px solid ${IVORY}`, margin: 'auto'}} />
      <div style={{width: 210, height: 260, border: `2px solid ${IVORY}`, borderTop: 0, margin: '-1px auto', clipPath: 'polygon(24% 0, 76% 0, 100% 100%, 0 100%)'}} />
    </div>
  );
};

const SceneCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = interpolate(frame, [60, 105], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 90, width: '100%', textAlign: 'center', color: IVORY, fontFamily: 'Yu Mincho, serif', fontSize: 42, letterSpacing: '0.08em'}}>
        幸福は、金額そのものだけでは決まらない。
      </div>
      <Person x={320} amount="100" delay={15} />
      <Person x={1170} amount="200" delay={30} />
      <div style={{position: 'absolute', top: 450, left: 785, width: 350 * arrow, height: 2, background: GOLD, transformOrigin: 'left center'}} />
      <div style={{position: 'absolute', left: 915, bottom: 110, color: DIM, fontFamily: 'Arial', fontSize: 18, letterSpacing: '.3em', opacity: arrow}}>COMPARE</div>
    </AbsoluteFill>
  );
};

const SceneBars: React.FC = () => {
  const frame = useCurrentFrame();
  const left = interpolate(frame, [10, 80], [0, 0.58], clamp);
  const right = interpolate(frame, [30, 100], [0, 0.9], clamp);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{color: IVORY, fontFamily: 'Yu Mincho, serif', fontSize: 54, marginBottom: 90}}>問題は「持っている量」ではない。</div>
      <div style={{width: 900}}>
        <div style={{color: DIM, fontSize: 20, letterSpacing: '.25em', marginBottom: 12}}>ABSOLUTE VALUE</div>
        <div style={{height: 12, background: '#161A20', overflow: 'hidden'}}><div style={{height: '100%', width: `${left * 100}%`, background: IVORY}} /></div>
        <div style={{color: GOLD, fontSize: 20, letterSpacing: '.25em', marginTop: 65, marginBottom: 12}}>RELATIVE POSITION</div>
        <div style={{height: 12, background: '#161A20', overflow: 'hidden'}}><div style={{height: '100%', width: `${right * 100}%`, background: GOLD}} /></div>
      </div>
    </AbsoluteFill>
  );
};

const SceneConclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 55], [0, 1], clamp);
  const zoom = interpolate(frame, [0, 170], [0.92, 1.04], clamp);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: `scale(${zoom})`}}>
      <div style={{color: DIM, fontSize: 23, letterSpacing: '.35em', marginBottom: 42, opacity}}>THE PARADOX OF COMPARISON</div>
      <div style={{color: IVORY, fontFamily: 'Yu Mincho, serif', fontSize: 68, lineHeight: 1.65, textAlign: 'center', opacity}}>
        幸福は<br />
        <span style={{color: GOLD}}>「絶対値」ではなく<br />「相対値」</span>で揺れる。
      </div>
    </AbsoluteFill>
  );
};

export const ThinkingNightSample: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: BG, overflow: 'hidden'}}>
    <Sequence from={0} durationInFrames={120}><SceneTitle /></Sequence>
    <Sequence from={120} durationInFrames={150}><SceneCompare /></Sequence>
    <Sequence from={270} durationInFrames={150}><SceneBars /></Sequence>
    <Sequence from={420} durationInFrames={180}><SceneConclusion /></Sequence>
    <Grain />
    <AbsoluteFill style={{boxShadow: 'inset 0 0 220px rgba(0,0,0,.85)', pointerEvents: 'none'}} />
  </AbsoluteFill>
);
