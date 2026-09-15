import React from "react";

export type ChildGender = "boy" | "girl";
export type ChildAge = 2 | 3 | 4;
export type ChildPose = "standing" | "sitting" | "running";
export type ChildDirection = "front" | "left" | "right" | "back";

export type ChildColors = {
  skin?: string;
  hair?: string;
  top?: string;
  bottom?: string;
  shoes?: string;
  accent?: string;
};

export type ChildCharacterProps = {
  gender?: ChildGender;
  age?: ChildAge;
  pose?: ChildPose;
  direction?: ChildDirection;
  colors?: ChildColors;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

const DEFAULTS = {
  skin: "#F1C7A5",
  hair: "#33251F",
  top: "#7BB7D9",
  bottom: "#D8A85E",
  shoes: "#5B5B61",
  accent: "#F3E7D5",
};

const ageScale: Record<ChildAge, number> = {
  2: 0.88,
  3: 0.95,
  4: 1,
};

const bodyYOffset: Record<ChildAge, number> = {
  2: 22,
  3: 11,
  4: 0,
};

const headScale: Record<ChildAge, number> = {
  2: 1.12,
  3: 1.06,
  4: 1,
};

const getFacingScaleX = (direction: ChildDirection) => {
  if (direction === "left") return -1;
  return 1;
};

const ChildHead: React.FC<{
  skin: string;
  hair: string;
  direction: ChildDirection;
  age: ChildAge;
}> = ({ skin, hair, direction, age }) => {
  const hs = headScale[age];
  const back = direction === "back";

  return (
    <g transform={`translate(160 88) scale(${hs}) translate(-160 -88)`}>
      <circle cx="160" cy="88" r="44" fill={skin} />

      {back ? (
        <>
          <path
            d="M116 84 C117 43 138 31 160 31 C187 31 207 49 205 88
               C197 65 179 55 159 56 C141 56 126 65 116 84 Z"
            fill={hair}
          />
          <path
            d="M122 73 C129 43 145 35 162 35 C183 35 198 50 201 72
               C195 102 186 122 160 128 C137 123 126 103 122 73 Z"
            fill={hair}
          />
        </>
      ) : (
        <>
          <path
            d="M116 86 C116 52 135 31 161 31
               C187 31 206 51 205 84
               C194 70 181 64 162 64
               C142 64 128 71 116 86 Z"
            fill={hair}
          />
          <path
            d="M118 70 C125 45 142 34 159 34
               C181 34 197 47 204 67
               C190 59 178 57 162 57
               C145 57 132 61 118 70 Z"
            fill={hair}
          />
        </>
      )}
    </g>
  );
};

export const ChildCharacterBase: React.FC<ChildCharacterProps> = ({
  gender = "boy",
  age = 3,
  pose = "standing",
  direction = "front",
  colors,
  width = 320,
  height = 520,
  className,
  style,
}) => {
  const c = { ...DEFAULTS, ...colors };
  const scale = ageScale[age];
  const yOffset = bodyYOffset[age];
  const flipX = getFacingScaleX(direction);
  const back = direction === "back";

  const torsoPath =
    gender === "girl"
      ? "M122 185 Q160 163 198 185 L210 286 Q160 306 110 286 Z"
      : "M120 185 Q160 166 200 185 L202 284 Q160 298 118 284 Z";

  const standing = (
    <>
      <path d={torsoPath} fill={c.top} />
      <g stroke={c.skin} strokeWidth="24" strokeLinecap="round" fill="none">
        <path d="M123 205 L95 280" />
        <path d="M197 205 L225 280" />
      </g>
      {gender === "girl" ? (
        <path d="M122 279 L198 279 L215 343 L105 343 Z" fill={c.bottom} />
      ) : (
        <>
          <path d="M120 279 L158 279 L153 350 L111 350 Z" fill={c.bottom} />
          <path d="M162 279 L200 279 L209 350 L167 350 Z" fill={c.bottom} />
        </>
      )}
      <g stroke={c.skin} strokeWidth="28" strokeLinecap="round">
        <path d="M136 342 L132 440" />
        <path d="M184 342 L188 440" />
      </g>
      <g fill={c.shoes}>
        <ellipse cx="127" cy="456" rx="30" ry="15" />
        <ellipse cx="193" cy="456" rx="30" ry="15" />
      </g>
    </>
  );

  const sitting = (
    <>
      <path d={torsoPath} fill={c.top} />
      <g stroke={c.skin} strokeWidth="24" strokeLinecap="round" fill="none">
        <path d="M123 205 L103 272" />
        <path d="M197 205 L217 272" />
      </g>
      {gender === "girl" ? (
        <path d="M119 278 Q160 296 201 278 L211 332 Q160 345 109 332 Z" fill={c.bottom} />
      ) : (
        <>
          <path d="M122 280 L158 281 L150 337 L112 333 Z" fill={c.bottom} />
          <path d="M162 281 L198 280 L208 333 L170 337 Z" fill={c.bottom} />
        </>
      )}
      <g stroke={c.skin} strokeWidth="28" strokeLinecap="round" fill="none">
        <path d="M132 329 L105 372 L64 372" />
        <path d="M188 329 L215 372 L256 372" />
      </g>
      <g fill={c.shoes}>
        <ellipse cx="54" cy="375" rx="28" ry="14" />
        <ellipse cx="266" cy="375" rx="28" ry="14" />
      </g>
    </>
  );

  const running = (
    <>
      <path d={torsoPath} fill={c.top} />
      <g stroke={c.skin} strokeWidth="24" strokeLinecap="round" fill="none">
        <path d="M123 207 L83 245 L105 285" />
        <path d="M197 207 L232 175 L257 215" />
      </g>
      {gender === "girl" ? (
        <path d="M121 279 L199 279 L216 337 L104 337 Z" fill={c.bottom} />
      ) : (
        <>
          <path d="M121 279 L158 279 L152 340 L109 337 Z" fill={c.bottom} />
          <path d="M162 279 L199 279 L211 337 L168 340 Z" fill={c.bottom} />
        </>
      )}
      <g stroke={c.skin} strokeWidth="28" strokeLinecap="round" fill="none">
        <path d="M137 334 L100 388 L61 407" />
        <path d="M184 334 L215 383 L252 398" />
      </g>
      <g fill={c.shoes}>
        <ellipse cx="49" cy="412" rx="30" ry="14" transform="rotate(-18 49 412)" />
        <ellipse cx="264" cy="402" rx="30" ry="14" transform="rotate(18 264 402)" />
      </g>
    </>
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 520"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform={`translate(160 ${yOffset}) scale(${flipX * scale} ${scale}) translate(-160 0)`}
      >
        <ChildHead skin={c.skin} hair={c.hair} direction={direction} age={age} />
        <rect x="149" y="123" width="22" height="46" rx="11" fill={c.skin} />
        {back && (
          <path
            d="M126 180 Q160 165 194 180"
            stroke={c.accent}
            strokeWidth="4"
            opacity="0.35"
            fill="none"
          />
        )}
        {pose === "standing" && standing}
        {pose === "sitting" && sitting}
        {pose === "running" && running}
      </g>
    </svg>
  );
};

export default ChildCharacterBase;
