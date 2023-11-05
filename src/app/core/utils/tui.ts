import { TuiCountryIsoCode } from '@taiga-ui/i18n';

export const countries: readonly TuiCountryIsoCode[] = [
  TuiCountryIsoCode.BY,
  TuiCountryIsoCode.RU,
  TuiCountryIsoCode.UA,
  TuiCountryIsoCode.PL,
];

export function getTuiCountryIsoCode(phone: string): TuiCountryIsoCode {
  if (!phone) {
    return TuiCountryIsoCode.BY;
  }

  if (phone.startsWith('+375')) {
    return TuiCountryIsoCode.BY;
  }

  if (phone.startsWith('+7')) {
    return TuiCountryIsoCode.RU;
  }

  if (phone.startsWith('+380')) {
    return TuiCountryIsoCode.UA;
  }

  if (phone.startsWith('+48')) {
    return TuiCountryIsoCode.PL;
  }

  return TuiCountryIsoCode.BY;
}
