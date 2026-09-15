import React from "react";

export type CharacterPose =
  | "standing"
  | "phone"
  | "lookingWindow"
  | "sitting"
  | "walking";

export type CharacterDirection = "left" | "right" | "front" | "back";
export type CharacterOutfit = "businessCasual" | "casual" | "formal";
export type CharacterProp = "none" | "phone" | "bag" | "coffee";

export type CharacterColors = {
  skin?: string;
  hair?: string;
  top?: string;
  bottom?: string;
  shirt?: string;
  shoes?: string;
  prop?: string;
};

export type CharacterBaseProps = {
  gender: "male" | "female";
  pose?: CharacterPose;
  direction?: CharacterDirection;
  outfit?: CharacterOutfit;
  prop?: CharacterProp;
  colors?: CharacterColors;
  scale?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
};

type PoseDefinition = {
  head: number;
  torso: number;
  leftArm: number;
  rightArm: number;
  leftLeg: number;
  rightLeg: number;
  torsoY: number;
};

const POSES: Record<CharacterPose, PoseDefinition> = {
  standing: {head: 0, torso: 0, leftArm: 8, rightArm: -8, leftLeg: 2, rightLeg: -2, torsoY: 0},
  phone: {head: 8, torso: 1, leftArm: 4, rightArm: -52, leftLeg: 0, rightLeg: 0, torsoY: 0},
  lookingWindow: {head: -5, torso: 2, leftArm: 3, rightArm: -3, leftLeg: 0, rightLeg: 0, torsoY: 0},
  sitting: {head: 0, torso: 0, leftArm: 12, rightArm: -12, leftLeg: 68, rightLeg: 68, torsoY: 36},
  walking: {head: 2, torso: 2, leftArm: 24, rightArm: -24, leftLeg: -18, rightLeg: 18, torsoY: 0},
};

const COLORS = {
  skin: "#D4A17C",
  shoe: "#171719",
  shirt: "#ECE5DC",
  prop: "#17191D",
  maleHair: "#24211F",
  femaleHair: "#332824",
  outfits: {
    male: {
      businessCasual: {top: "#293241", bottom: "#22252B"},
      casual: {top: "#4B5563", bottom: "#2F3136"},
      formal: {top: "#1D2530", bottom: "#171B22"},
    },
    female: {
      businessCasual: {top: "#70606D", bottom: "#3C363C"},
      casual: {top: "#8A746F", bottom: "#4D4347"},
      formal: {top: "#39313A", bottom: "#262227"},
    },
  },
} as const;

const PhoneProp: React.FC<{color: string}> = ({color}) => (
  <rect x="248" y="426" width="22" height="42" rx="5" fill={color} />
);

const BagProp: React.FC<{color: string}> = ({color}) => (
  <g>
    <rect x="244" y="430" width="28" height="36" rx="6" fill={color} />
    <path d="M250 430 Q258 416 266 430" stroke="#BDA996" strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
);

const CoffeeProp: React.FC = () => (
  <g>
    <rect x="246" y="428" width="24" height="28" rx="5" fill="#F2ECE6" />
    <path d="M270 434 Q278 438 270 446" stroke="#C9BEB1" strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
);

export const CharacterBase: React.FC<CharacterBaseProps> = ({
  gender,
  pose = "standing",
  direction = "front",
  outfit = "businessCasual",
  prop = "none",
  colors,
  scale = 1,
  width = 400,
  className,
  style,
}) => {
  const p = POSES[pose];
  const preset = COLORS.outfits[gender][outfit];
  const skin = colors?.skin ?? COLORS.skin;
  const hair = colors?.hair ?? (gender === "male" ? COLORS.maleHair : COLORS.femaleHair);
  const top = colors?.top ?? preset.top;
  const bottom = colors?.bottom ?? preset.bottom;
  const shirt = colors?.shirt ?? COLORS.shirt;
  const shoes = colors?.shoes ?? COLORS.shoe;
  const propColor = colors?.prop ?? COLORS.prop;
  const showPhone = prop === "phone" || pose === "phone";
  const flip = direction === "left";
  const isBack = direction === "back";

  const characterTransform = flip ? "translate(400 0) scale(-1 1)" : undefined;
  const torsoFront = gender === "male"
    ? "M135 250 Q200 220 265 250 L280 510 H120 Z"
    : "M145 250 Q200 226 255 250 L268 510 H132 Z";
  const torsoBack = gender === "male"
    ? "M135 252 Q200 226 265 252 L278 510 H122 Z"
    : "M145 252 Q200 228 255 252 L266 510 H134 Z";

  return (
    <svg
      viewBox="0 0 400 800"
      width={width * scale}
      height={(width * 2) * scale}
      className={className}
      style={{overflow: "visible", ...style}}
      aria-hidden="true"
    >
      <g transform={characterTransform}>
        <g transform={`rotate(${p.leftLeg} 175 520)`}>
          <rect x="150" y="500" width="42" height="210" rx="20" fill={bottom} />
          <rect x="146" y="690" width="58" height="28" rx="12" fill={shoes} />
        </g>

        <g transform={`rotate(${p.rightLeg} 225 520)`}>
          <rect x="208" y="500" width="42" height="210" rx="20" fill={bottom} />
          <rect x="202" y="690" width="58" height="28" rx="12" fill={shoes} />
        </g>

        <g transform={`translate(0 ${p.torsoY}) rotate(${p.torso} 200 330)`}>
          <path d={isBack ? torsoBack : torsoFront} fill={top} />
          {!isBack && <path d="M181 250 L200 295 L219 250" fill={shirt} />}
        </g>

        <g transform={`rotate(${p.leftArm} 145 275)`}>
          <rect x="118" y="270" width="42" height="190" rx="20" fill={top} />
          <circle cx="138" cy="452" r="18" fill={skin} />
        </g>

        <g transform={`rotate(${p.rightArm} 255 275)`}>
          <rect x="240" y="270" width="42" height="190" rx="20" fill={top} />
          <circle cx="260" cy="452" r="18" fill={skin} />
          {showPhone && <PhoneProp color={propColor} />}
          {!showPhone && prop === "bag" && <BagProp color={propColor} />}
          {!showPhone && prop === "coffee" && <CoffeeProp />}
        </g>

        <rect x="184" y="218" width="32" height="50" rx="14" fill={skin} />

        <g transform={`rotate(${p.head} 200 160)`}>
          <ellipse cx="200" cy="160" rx={gender === "male" ? 60 : 56} ry="70" fill={skin} />

          {gender === "male" ? (
            isBack ? (
              <path d="M142 152 Q148 82 200 84 Q252 82 258 152 Q258 212 230 236 Q210 252 200 252 Q188 252 168 236 Q142 214 142 152" fill={hair} />
            ) : (
              <path d="M142 150 Q145 82 200 84 Q255 82 260 148 Q242 118 216 116 Q188 106 142 150" fill={hair} />
            )
          ) : isBack ? (
            <>
              <path d="M144 150 Q144 82 200 78 Q258 82 258 150 Q258 224 230 268 Q216 290 200 290 Q184 290 170 268 Q144 222 144 150" fill={hair} />
              <path d="M176 246 Q188 298 188 332" stroke={hair} strokeWidth="20" strokeLinecap="round" />
              <path d="M224 246 Q212 298 212 332" stroke={hair} strokeWidth="20" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M142 154 Q140 82 200 78 Q265 82 260 160 Q250 110 205 106 Q162 108 142 154" fill={hair} />
              <path d="M148 130 Q124 218 162 255" stroke={hair} strokeWidth="26" strokeLinecap="round" />
              <path d="M252 130 Q278 218 238 255" stroke={hair} strokeWidth="26" strokeLinecap="round" />
            </>
          )}
        </g>
      </g>
    </svg>
  );
};
