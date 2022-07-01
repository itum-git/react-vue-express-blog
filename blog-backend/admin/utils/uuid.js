

function uniqIdFromTime ( length ) {
  const timeArr = Date.now().toString().split("").slice(-length>>1);
  let uniqString = "";
  timeArr.forEach( item => {
    let randomNum = 48 + (Math.random()*20>>1) + (17 + 32*(Math.random()*4>>1) + (Math.random()*32>>1))*(Math.random()*4>>1)
    uniqString += String.fromCharCode(randomNum) + item
  })
  return uniqString;
}

module.exports = {
  uniqIdFromTime,
}