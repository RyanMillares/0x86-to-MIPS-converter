const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
const binVals = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"]

//Registers
 const registers = ["0","at","v0","v1","a0","a1","a2","a3","t0","t1","t2","t3","t4","t5","t6","t7","s0","s1","s2","s3","s4","s5","s6","s7","t8","t9","k0","k1","gp","sp","fp","ra"]

// R-type instructions 
const rType00 = ["sll", "", "srl", "sra", "sllv", "", "srlv", "srav", "jr", "jalr", "", "", "syscall", "break"] // length 13
const rType01 = ["mfhi", "mthi", "mflo", "mtlo", "", "", "", "", "mult", "multu", "div", "divu"] // length 11
const rType10 = ["add", "addu", "sub", "subu", "and", "or", "xor", "nor", "", "", "slt", "sltu"] // length 11

// I-type  instructions
const iType00 = ["bltz","bgez","","","beq","bne","blez","bgtz","addi","addiu","slti","sltiu","andi","ori","xori","lui"] // length 16
const iType10 = ["lb","lh","","lw","lbu","lhu","","","sb","sh","","sw"] // length 12
const iType11 = ["lwc1","swc1"] // length 2

// J-type instructions
const jType = ["j", "jal"]

// Converts hex character to 4-bit binary
function h2b(hexVal){
    //assuming input is one character
    return binVals[validChars.indexOf(hexVal.toUpperCase())]

}


function b2h(binVal){
    //consider switching to take the entire binary
    var hex = "0x"
    const numHexs = len(binVal) / 4
    for(let i = 0; i < numHex; i++){
        hex += validChars[b2d(binVal.slice(4*i, 4*(i+1)))]
        //hex += validChars[b2d(binVal[(4*i):(4*(i+1))])]
    }
       
    return hex

}

// Converts binary value to decimal value
function b2d(binVal){
    const numBits = binVal.length
    var value = 0
    for(let i = 0; i < numBits; i++){

        value += int(binVal[numBits - i - 1]) * Math.pow(2,i)

    }

    return value
}
// validates if input is in correct 32-bit assembly instruction format
function validInput(input){
    const res = (typeof input === 'string' || input instanceof String)
    if (res){
        if (input.length === 10 && input.slice(0,2) === "0x"){
            const hexOut = input.slice(2,10)
            for (let i = 0; i < hexOut.length; i++){

                const currChar = hexOut.slice(i, (i+1))
                if (currChar.toUpperCase().indexOf(validChars) <= -1) {
                    throw 'NameError'
                }

            }
 
            return hexOut
            
        }
        
           
        else{ // string input is not of correct length or incorrectly formatte
            throw 'ValueError'
            //raise ValueError
        } 
    }
    else { //# input is not of type string
        throw 'TypeError'
        //raise TypeError
    } 

}

// returns instruction type
// 0 = r-type, 1 = j-type, 2 = i-type
function getType(chars) {
    //const opCode = (h2b(chars.slice(0,1) + h2b(chars.slice(1,2))).slice(0,6))
    const opCode = (h2b(chars.slice(0,1)) + h2b(chars.slice(1,2))).slice(0, 6)
    switch (opCode) {
        case "000000":
            // R-type
            console.log("r-type")
            return 0
            break;
        case "000010":
        case "000011":
            // j-type
            console.log("j-type")
            return 1
            break;
        default:
            // i-type
            console.log("i-type")
            return 2


    }
    

}
console.log(getType("AAAAAAAA"))
