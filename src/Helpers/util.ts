

/**
 * This function is use to remove html tags= require(string
 *
 * @param {string} str   String to sanitize
 * @return {string}  String converted
 */
function stripTags(str: string): string {
  return str.toString().replace(/(<([^>]+)>)/gi, '');
}

function inputValidation(input: string): string {
  const word = stripTags(input.toString());
  return word.trim();
}

export {
  inputValidation,
  stripTags
};

