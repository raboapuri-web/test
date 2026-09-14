import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';

const ink = '#070A10';
const ivory = '#E8E0D0';
const gold = '#B89A5D';
const muted = '#8D877B';
const ease = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const mincho = 'Hiragino Mincho ProN, Yu Mincho, Noto Serif CJK JP, serif';

const SceneBase: React.FC<{children: React.ReactNode; label: string}> = ({children, label}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, #1A1B20 0%, ${ink} 68%)`,
        color: ivory,
        overflow: 'hidden',
        opacity: interpolate(frame, [0, 12, 106, 120], [0, 1, 1, 0], ease),
      }}
    >
      <div style={{position: 'absolute', top: 66, left: 92, color: gold, fontSize: 20, letterSpacing: '0.35em'}}>考える夜</div>
      <div style={{position: 'absolute', top: 70, right: 92, color: muted, fontFamily: 'Georgia, serif', fontSize: 18, letterSpacing: '0.25em'}}>{label}</div>
      <div style={{position: 'absolute', left: 92, right: 92, bottom: 76, height: 1, background: '#655941', opacity: 0.65}} />
      {children}
      <AbsoluteFill style={{boxShadow: 'inset 0 0 220px rgba(0,0,0,.75)', pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};

const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBase label="01 / QUESTION">
      <div style={{position: 'absolute', left: 280, top: 259, width: 2, height: interpolate(frame, [4, 76], [0, 555], ease), background: gold}} />
      <div
        style={{
          position: 'absolute', left: 352, top: 276,
          fontFamily: mincho, fontSize: 112, lineHeight: 1.55, letterSpacing: '0.07em',
          opacity: interpolate(frame, [12, 43], [0, 1], ease),
          transform: `translateY(${interpolate(frame, [12, 50], [45, 0], ease)}px)`,
        }}
      >
        選んでいるのは<br /><span style={{color: gold}}>誰なのか。</span>
      </div>
      <div style={{position: 'absolute', left: 360, bottom: 154, color: muted, fontFamily: 'Georgia, serif', fontSize: 23, letterSpacing: '0.37em'}}>WHO CHOOSES?</div>
    </SceneBase>
  );
};

const Door: React.FC<{left: number; delay: number}> = ({left, delay}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute', top: 256, left, width: 310, height: 500,
        border: `2px solid ${gold}`, borderBottom: 0,
        boxShadow: 'inset 0 0 80px rgba(184,154,93,.13), 0 0 100px rgba(184,154,93,.07)',
        background: 'linear-gradient(180deg, #28241E, #0C0E13)',
        opacity: interpolate(frame, [delay, delay + 35], [0, 0.8], ease),
        transform: `translateY(${interpolate(frame, [delay, delay + 50], [48, 0], ease)}px)`,
      }}
    >
      <div style={{position: 'absolute', inset: 18, border: '1px solid rgba(184,154,93,.35)'}} />
    </div>
  );
};

const Choice: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBase label="02 / POSSIBILITY">
      <AbsoluteFill style={{transform: `scale(${interpolate(frame, [0, 120], [1.05, 1], ease)})`}}>
        <Door left={410} delay={10} />
        <Door left={1200} delay={23} />
        <div style={{position: 'absolute', left: 910, top: 426, width: 98, height: 98, borderRadius: '50%', background: '#111215', border: `3px solid ${ivory}`, boxShadow: '0 0 42px rgba(232,224,208,.11)'}} />
        <div style={{position: 'absolute', left: 860, top: 528, width: 198, height: 344, background: 'linear-gradient(160deg, #292826, #0B0C10)', clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0 100%)', border: `1px solid ${muted}`}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 126, textAlign: 'center', fontFamily: mincho, fontSize: 54, letterSpacing: '0.15em', opacity: interpolate(frame, [60, 88], [0, 1], ease)}}>選択の前に</div>
    </SceneBase>
  );
};

const Influence: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [15, 84], [0, 1], ease);
  const lines = [
    {label: '記憶', x: 320, y: 388, delay: 0},
    {label: '環境', x: 320, y: 590, delay: 15},
  ];
  return (
    <SceneBase label="03 / CONTEXT">
      <div style={{position: 'absolute', left: 310, top: 220, fontFamily: mincho, fontSize: 62, letterSpacing: '0.11em'}}>何が、見えていた？</div>
      {lines.map(({label, x, y, delay}) => (
        <React.Fragment key={label}>
          <div style={{position: 'absolute', left: x, top: y, color: ivory, fontFamily: mincho, fontSize: 61, opacity: interpolate(frame, [10 + delay, 36 + delay], [0, 1], ease)}}>{label}</div>
          <div style={{position: 'absolute', left: 535, top: y + 43, width: 740 * interpolate(frame, [24 + delay, 85 + delay], [0, 1], ease), height: 2, background: gold}} />
        </React.Fragment>
      ))}
      <div style={{position: 'absolute', left: 1288, top: 355, width: 338, height: 338, borderRadius: '50%', border: `2px solid ${gold}`, boxShadow: '0 0 120px rgba(184,154,93,.16), inset 0 0 90px rgba(184,154,93,.09)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: mincho, fontSize: 70, opacity: progress}}>選択</div>
      <div style={{position: 'absolute', left: 317, bottom: 145, color: muted, fontFamily: 'Georgia, serif', fontSize: 21, letterSpacing: '0.27em'}}>MEMORY  /  ENVIRONMENT  /  CHOICE</div>
    </SceneBase>
  );
};

const Reflection: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneBase label="04 / REFLECTION">
      <div style={{position: 'absolute', left: 1220, top: 225, width: 480, height: 610, borderRadius: '48% 48% 8% 8%', border: '2px solid rgba(184,154,93,.8)', background: 'radial-gradient(ellipse at 52% 35%, #343027, #0B0D12 72%)', boxShadow: '0 0 160px rgba(184,154,93,.11)', transform: `scale(${interpolate(frame, [0, 120], [0.96, 1.05], ease)})`}} />
      <div style={{position: 'absolute', left: 1390, top: 440, width: 130, height: 130, borderRadius: '50%', background: '#08090C', opacity: 0.85}} />
      <div style={{position: 'absolute', left: 1340, top: 562, width: 230, height: 280, background: '#08090C', clipPath: 'polygon(27% 0, 73% 0, 100% 100%, 0 100%)', opacity: 0.85}} />
      <div style={{position: 'absolute', left: 310, top: 380, fontFamily: mincho, fontSize: 104, lineHeight: 1.6, letterSpacing: '0.1em', opacity: interpolate(frame, [12, 51], [0, 1], ease)}}>本当に<br /><span style={{color: gold}}>自由か。</span></div>
      <div style={{position: 'absolute', left: 320, bottom: 143, color: muted, fontFamily: 'Georgia, serif', fontSize: 22, letterSpacing: '0.3em'}}>A QUESTION TO TAKE INTO THE NIGHT</div>
    </SceneBase>
  );
};

export const ThinkingNightPilot: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: ink}}>
    <Sequence from={0} durationInFrames={120}><Opening /></Sequence>
    <Sequence from={120} durationInFrames={120}><Choice /></Sequence>
    <Sequence from={240} durationInFrames={120}><Influence /></Sequence>
    <Sequence from={360} durationInFrames={120}><Reflection /></Sequence>
  </AbsoluteFill>
);
