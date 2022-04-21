const keySeparator = '.';

/**
 * This method is used to get the translated string according to the passed JSON data of respective language.
 * @param key          :string - key to be looked into the JSON data e.g 'OK','YES','ROLE.NAME'
 * @param substitution :object - object containing the substitute values e.g { roleName: 'Role Demo' }
 * @param data         :object - JSON object containing language translations e.g { "YES": "Yes", "NO": "No" }
 * @returns            :string - translated string or parsed string
 */
export const translate = (key, substitution, data) => {
  // This method passes the key and JSON data along with key seperator to the getValue() function
  // Once getting the translated value, it will check whether any substitute value present or not
  // If substitute present, then it will call the stringTemplateParser() function and returns the manipulated string or else the normal translated value
  const str = getValue(key, data, keySeparator) || key;
  if (!substitution) {
    return str;
  }
  return stringTemplateParser(str, substitution);
};

/**
 * This method is used to get the translated value by iterating on the JSON data.
 * @param key          :string - key to be looked into the JSON data e.g 'OK','YES','ROLE.NAME'
 * @param sourceJson   :object - JSON object containing language translations e.g { "YES": "Yes", "NO": "No" }
 * @param keySeparator :string - constant string which will act as a seperator for keys e.g '.'
 * @returns            :string - value present for the key on the JSON data
 */
const getValue = (key, sourceJson, keySeparator) => {
  // This method splits up the key according to the key separator and recursively iterates till it doesn't reach to the child level string
  // Once it reaches the leaf level of JSON,  it returns the key value present in sourceJson
  return key
    .split(keySeparator)
    .reduce(
      (acc, cur) => ((acc && acc[cur]) != null ? acc[cur] : null),
      sourceJson
    );
};

/**
 * This method is to parse the string template with dynamic values
 * @param strTemplate :string - string template e.g 'User name is {{displayname}}'
 * @param values      :object - object containing values e.g { displayname: 'john doe' }
 * @return            :string - parsed string e.g 'User name is john doe'
 */
const stringTemplateParser = (strTemplate, values) => {
  // This regex matches var names placed between {{}} in strTemplate.
  // E.g 'User name is {{displayname}}' matches {{displayname}} from strTemplate
  // Also extracts 'displayname' key and passes to replacer function.
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  return strTemplate.replace(
    templateMatcher,
    (substring, key) => values[key] || ''
  );
};
