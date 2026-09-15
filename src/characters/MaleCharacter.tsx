import React from "react";
import {
  CharacterBase,
  type CharacterBaseProps,
} from "./CharacterBase";

export type MaleCharacterProps = Omit<CharacterBaseProps, "gender">;

export const MaleCharacter: React.FC<MaleCharacterProps> = (props) => {
  return <CharacterBase gender="male" {...props} />;
};
