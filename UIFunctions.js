//import { output } from './hexToMips.js'

//function checks() {
//    let userInput =  document.getElementById("input").value;
//    console.log(userInput);
//    document.getElementById("output").value = parseInput("01234567");
//    console.log(parseInput("01234567"));
//}
const inputs = "0x20080000\n0x20090001\n0x0089502A\n0x15400003\n0x01094020\n0x21290002\n0x08100002\n0x01001020\n0x03E00008";
function swap() {
    alert("Currently, you can only convert Instructions from Hex to readable MIPS format, not the other way around. This functionality will be developed soon!");
}

//document.getElementById("default").addEventListener("click", loadDefault, false);
document.getElementById("swap").addEventListener("click", swap, false);
