import en from './en.json';
import fr from './fr.json';
import oc from './oc.json';
import de from './de.json';
import it from './it.json';
import zhCN from './zh-CN.json';
import nl from './nl.json';
import ru from './ru.json';
import esAR from './es-AR.json';

const languagesMap = {
  en,
  fr,
  oc,
  de,
  it,
  zhCN,
  nl,
  ru,
  esAR,
};

/**
 * Return best match for lang and variant.
 * @param {string} language string from navigator configuration or cookie.
 * @returns the translation dict
 */
export function getTranslations(language = '') {
  const [lang, variant] = language.split('-');

  if (languagesMap.hasOwnProperty(`${lang}${variant}`)) {
    return languagesMap[`${lang}${variant}`];
  }

  if (languagesMap.hasOwnProperty(lang)) {
    return languagesMap[lang];
  }

  return languagesMap['en'];
}
