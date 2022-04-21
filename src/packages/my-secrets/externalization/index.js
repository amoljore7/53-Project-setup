import en from './en';
import { translate as translateUtil } from '../../../utils/translation-util';

export const translate = (key, substitution) => translateUtil(key, substitution, en);
