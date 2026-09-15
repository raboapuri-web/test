import React from "react";

export type CharacterPose =
  | "standing"
  | "phone"
  | "lookingWindow"
  | "sitting";

export type CharacterDirection = "left" | "right" | "front" | "back";
export type CharacterOutfit = "businessCasual" | "casual" | "formal";
export type CharacterProp = "none" | "phone";

export type CharacterBaseProps = {
  gender: "male" | "female";
  pose?: CharacterPose;
  direction?: CharacterDirection;
  outfit?: CharacterOutfit;
  prop?: CharacterProp;
  scale?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
};

type PoseDefinition = {
  head: number;
  leftArm: number;
  rightArm: number;
  leftLeg: number;
  rightLeg: number;
  torsoY: number;
};

const POSES: Record<CharacterPose, PoseDefinition> = {
  standing: {
    head: 0,
    leftArm: 8,
    rightArm: -8,
    leftLeg: 2,
    rightLeg: -2,
    torsoY: 0,
  },
  phone: {
    head: 8,
    leftArm: 4,
    rightArm: -52,
    leftLeg: 0,
    rightLeg: 0,
    torsoY: 0,
  },
  lookingWindow: {
    head: -5,
    leftArm: 3,
    rightArm: -3,
    leftLeg: 0,
    rightLeg: 0,
    torsoY: 0,
  },
  sitting: {
    head: 0,
    leftArm: 12,
    rightArm: -12,
    leftLeg: 68,
    rightLeg: 68,
    torsoY: 36,
  },
};

const COLORS = {
  skin: "#D4A17C",
  shoe: "#171719",
  shirt: "#ECE5DC",
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

export const CharacterBase: React.FC<CharacterBaseProps> = ({
  gender,
  pose = "standing",
  direction = "front",
  outfit = "businessCasual",
  prop = "none",
  scale = 1,
  width = 400,
  className,
  style,
}) => {
  const p = POSES[pose];
  const palette = COLORS.outfits[gender][outfit];
  const hair = gender === "male" ? COLORS.maleHair : COLORS.femaleHair;
  const showPhone = prop === "phone" || pose === "phone";
  const flip = direction === "left";
  const isBack = direction === "back";

  const characterTransform = flip ? "translate(400 0) scale(-1 1)" : undefined;

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
          <rect x="150" y="500" width="42" height="210" rx="20" fill={palette.bottom} />
          <rect x="146" y="690" width="58" height="28" rx="12" fill={COLORS.shoe} />
        </g>

        <g transform={`rotate(${p.rightLeg} 225 520)`}>
          <rect x="208" y="500" width="42" height="210" rx="20" fill={palette.bottom} />
          <rect x="202" y="690" width="58" height="28" rx="12" fill={COLORS.shoe} />
        </g>

        <g transform={`translate(0 ${p.torsoY})`}>
          <path
            d={
              gender === "male"
                ? "M135 250 Q200 220 265 250 L280 510 H120 Z"
                : "M145 250 Q200 226 255 250 L268 510 H132 Z"
            }
            fill={palette.top}
          />
          <path d="M181 250 L200 295 L219 250" fill={COLORS.shirt} />
        </g>

        <g transform={`rotate(${p.leftArm} 145 275)`}>
          <rect x="118" y="270" width="42" height="190" rx="20" fill={palette.top} />
          <circle cx="138" cy="452" r="18" fill={COLORS.skin} />
        </g>

        <g transform={`rotate(${p.rightArm} 255 275)`}>
          <rect x="240" y="270" width="42" height="190" rx="20" fill={palette.top} />
          <circle cx="260" cy="452" r="18" fill={COLORS.skin} />
          {showPhone && <rect x="248" y="426" width="22" height="42" rx="5" fill="#17191D" />}
        </g>

        <rect x="184" y="218" width="32" height="50" rx="14" fill={COLORS.skin} />

        <g transform={`rotate(${p.head} 200 160)`}>
          <ellipse
            cx="200"
            cy="160"
            rx={gender === "male" ? 60 : 56}
            ry="70"
            fill={COLORS.skin}
          />

          {gender === "male" ? (
            <path
              d="M142 150 Q145 82 200 84 Q255 82 260 148 Q242 118 216 116 Q188 106 142 150"
              fill={hair}
            />
          ) : (
            <>
              <path
                d="M142 154 Q140 82 200 78 Q265 82 260 160 Q250 110 205 106 Q162 108 142 154"
                fill={hair}
              />
              <path d="M148 130 Q124 218 162 255" stroke={hair} strokeWidth="26" strokeLinecap="round" />
              <path d="M252 130 Q278 218 238 255" stroke={hair} strokeWidth="26" strokeLinecap="round" />
            </>
          )}

          {isBack && (
            <ellipse
              cx="200"
              cy="154"
              rx={gender === "male" ? 60 : 58}
              ry="68"
              fill={hair}
              opacity="0.96"
            />
          )}
        </g>
      </g>
    </svg>
  );
};
