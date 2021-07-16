import { scaleFont } from './mixins';
import { Platform } from 'react-native';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';
export const FONT_FAMILY_ITALIC = 'Roboto-Italic';
export const FONT_FAMILY_BLACK = 'Roboto-Black';
export const FONT_FAMILY_LIGHT = 'Roboto-Light';
export const FONT_FAMILY_MEDIUM = 'Roboto-Medium';
export const FONT_FAMILY_THIN = 'Roboto-Thin';

export const FONT_SECONDARY = 'IndieFlower-Regular';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_50 = Platform.OS === 'ios' ? 50 : scaleFont(50);
export const FONT_SIZE_40 = Platform.OS === 'ios' ? 40 : scaleFont(40);
export const FONT_SIZE_30 = Platform.OS === 'ios' ? 30 : scaleFont(30);
export const FONT_SIZE_25 = Platform.OS === 'ios' ? 25 : scaleFont(25);
export const FONT_SIZE_24 = Platform.OS === 'ios' ? 24 : scaleFont(24);
export const FONT_SIZE_22 = Platform.OS === 'ios' ? 22 : scaleFont(22);
export const FONT_SIZE_21 = Platform.OS === 'ios' ? 20 : scaleFont(21);
export const FONT_SIZE_20 = Platform.OS === 'ios' ? 20 : scaleFont(20);
export const FONT_SIZE_18 = Platform.OS === 'ios' ? 18 : scaleFont(18);
export const FONT_SIZE_17 = Platform.OS === 'ios' ? 17 : scaleFont(17);
export const FONT_SIZE_16 = Platform.OS === 'ios' ? 16 : scaleFont(16);
export const FONT_SIZE_15 = Platform.OS === 'ios' ? 15 : scaleFont(15);
export const FONT_SIZE_14 = Platform.OS === 'ios' ? 14 : scaleFont(14);
export const FONT_SIZE_13 = Platform.OS === 'ios' ? 13 : scaleFont(13);
export const FONT_SIZE_12 = Platform.OS === 'ios' ? 12 : scaleFont(12);
export const FONT_SIZE_11 = Platform.OS === 'ios' ? 11 : scaleFont(11);
