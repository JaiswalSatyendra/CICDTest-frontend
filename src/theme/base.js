import { PureLightTheme } from './schemes/PureLightTheme';
import { GreyGooseTheme } from './schemes/GreyGooseTheme';
import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';
import { DarkSpacesTheme } from './schemes/DarkSpacesTheme';
import { PurpleFlowTheme } from './schemes/PurpleFlowTheme';
import { GreenFieldsTheme } from './schemes/GreenFieldsTheme';
import { BlackLightTheme } from './schemes/BlackLightTheme';

const themeMap = {
  PureLightTheme,
  GreyGooseTheme,
  PurpleFlowTheme,
  NebulaFighterTheme,
  DarkSpacesTheme,
  GreenFieldsTheme,
  BlackLightTheme
};

export function themeCreator(theme) {
  return themeMap[theme];
}
