import React from "react";
import {
  ChildCharacterBase,
  ChildCharacterProps,
} from "./ChildCharacterBase";

export type GirlChildCharacterProps = Omit<ChildCharacterProps, "gender">;

export const GirlChildCharacter: React.FC<GirlChildCharacterProps> = (props) => {
  return (
    <ChildCharacterBase
      gender="girl"
      colors={{
        top: "#E68BA6",
        bottom: "#E5B75B",
        shoes: "#625B68",
        ...props.colors,
      }}
      {...props}
    />
  );
};

export default GirlChildCharacter;
