import React from "react";
import {
  ChildCharacterBase,
  ChildCharacterProps,
} from "./ChildCharacterBase";

export type BoyChildCharacterProps = Omit<ChildCharacterProps, "gender">;

export const BoyChildCharacter: React.FC<BoyChildCharacterProps> = (props) => {
  return (
    <ChildCharacterBase
      gender="boy"
      colors={{
        top: "#69A9D1",
        bottom: "#D59D54",
        shoes: "#5B5B61",
        ...props.colors,
      }}
      {...props}
    />
  );
};

export default BoyChildCharacter;
