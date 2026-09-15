import React from "react";
import {
  CharacterBase,
  type CharacterBaseProps,
} from "./CharacterBase";

export type FemaleCharacterProps = Omit<CharacterBaseProps, "gender">;

export const FemaleCharacter: React.FC<FemaleCharacterProps> = (props) => {
  return <CharacterBase gender="female" {...props} />;
};
