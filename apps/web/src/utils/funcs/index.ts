import { Token } from '@lumi/types';
import { TokenEnum } from '@lumi/database/enums';

export const getTokenByType = (
  tokens: Token[],
  type: TokenEnum.AUTHORIZATION,
) => tokens.find(token => token.type == type);

export const getAvatarFallback = (value: string): string => {
  const words = value.split(' ');

  const initials = words.reduce((acc: string, word: string) => {
    if (word.length > 0) return acc + word.slice(0, 2).toUpperCase();

    return acc;
  }, '');

  return initials;
};

