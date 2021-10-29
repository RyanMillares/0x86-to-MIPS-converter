import {parseInput} from './hexToMips.js'

//function checks() {
//    let userInput =  document.getElementById("input").value;
//    console.log(userInput);
//    document.getElementById("output").value = parseInput("01234567");
//    console.log(parseInput("01234567"));
//}
function swap() {
    alert("Currently, you can only convert Instructions from Hex to readable MIPS format, not the other way around. This functionality will be developed soon!")
}
document.getElementById("swap").addEventListener("click", swap, false);
