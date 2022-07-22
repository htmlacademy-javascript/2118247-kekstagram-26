function randomNumber(min, max)
{
  if(min > max || min < 0) {
    throw Error;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stringLengthValidation(str, maxLen)
{
  if(str.length <= maxLen) {
    return(true);
  }
  return(false);
}

export {randomNumber, stringLengthValidation};

