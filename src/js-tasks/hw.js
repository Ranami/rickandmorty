function ceaser(str, num) {
  let result = str.split("").map((letter) => {
    let letterCode = letter.charCodeAt(0);
    let resultLetter = letter.charCodeAt(0) + num;
    if (letterCode >= 97 && letterCode <= 122) {
      if (resultLetter < 97) {
        return String.fromCharCode(resultLetter + 26);
      } else if (resultLetter > 122) {
        return String.fromCharCode(resultLetter - 26);
      } else {
        return String.fromCharCode(resultLetter);
      }
    } else if (letterCode >= 65 && letterCode <= 90) {
      if (resultLetter >= 65 && resultLetter <= 90) {
        return String.fromCharCode(resultLetter);
      } else if (resultLetter < 65) {
        return String.fromCharCode(resultLetter + 26);
      } else if (resultLetter > 90) {
        return String.fromCharCode(resultLetter - 26);
      }
    } else return letter;
  });
  return result.join("");
}

console.log(ceaser("Ifmmp", -1));

function visibleTower(arr) {
  let mainTower = arr[0];
  let visibleTowers = 0;
  let highestTower = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > highestTower) {
      visibleTowers++;
      highestTower = arr[i];
    } else if (mainTower > arr[i] && mainTower > highestTower) {
      visibleTowers++;
    }
  }
  return visibleTowers;
}

console.log(visibleTower([5, 7, 8, 4, 9, 9]));
