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

function manyH2B(hexVal) {
    let letters = hexVal.length 
    let output = ""
    for(let i = 0; i < letters; i++){
        let convert = h2b(hexVal.slice(i, i+1))
        output += convert

    }
    return output
}
function b2h(binVal){
    //consider switching to take the entire binary
    var hex = "0x"
    const numHex = binVal.length / 4
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

        value += parseInt(binVal[numBits - i - 1], 10) * Math.pow(2,i)

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
            break;


    }
    

}
//reterns register name given 5 bit binary
function getRegister(binVal) {
    const val = parseInt(b2d(binVal))
    return ("$" + String(registers[val]))
}

function parseRType(binValue){
    const output = []
    const opcode = binValue.slice(0, 6) //not used in r-type, comment out when finalizing
    const rsBin = binValue.slice(6,11)
    const rtBin = binValue.slice(11,16)
    const rdBin = binValue.slice(16,21)
    const saBin = binValue.slice(21,26)
    const funcBin = binValue.slice(26,32)
    const typeId = String(funcBin.slice(0,2)) // Fetch operation name
    var opname = ""
    if(typeId === "00") {
        opname = rType00[b2d(funcBin.slice(2,6))]
    }
    else if(typeId === "01") {
        opname = rType01[b2d(funcBin.slice(2,6))]
    }
    else if(typeId === "10") {
        opname = rType10[b2d(funcBin.slice(2,6))]
    }
    else {
        opname =  "Error: Invalid 2 most significant bits"
    }

    output.push(opname)

    // Fetch order of fields and error handle
    func3 = funcBin.slice(0,4)

    if (func3 === "0000") { // rd, rt, sa
        output.push(getRegister(rdBin))
        output.push(getRegister(rtBin))
        output.push(getRegister(saBin))
    }
    else if (func3 === "0001") { // rd, rt, rs
        output.push(getRegister(rdBin))
        output.push(getRegister(rtBin))
        output.push(getRegister(rsBin))
    }
    else if (func3 === "0010"){ // rs or rd, rs
        if (funcBin.slice(5,6) === "0") { // jr
            output.push(getRegister(rsBin))
        }
        else if (funcBin.slice(5,6) === "1") { // jalr
            output.push(getRegister(rdBin))
            output.push(getRegister(rsBin))
        }
        else{
            print("Error, incorrect binary")

        }
    }
    else if (func3 == "0011"){
        print("no fields, syscall and break")

    }

    else if (func3 == "0100"){// rd if even decimal,  rs if odd decimal")
        let oddOrEven = b2d(funcBin.slice(4,6))
        if (oddOrEven % 2 === 0) { // print("00 or 10")
            output.push(getRegister(rdBin))
        }
        else  { // print("01 or 11")
            output.push(getRegister(rsBin))
        }


    } 

    else if (func3 === "0110") { // rs, rt
        output.push(getRegister(rsBin))
        output.push(getRegister(rtBin))
    }
    else if ((func3 == "1000" || func3 == "1001") || func3 == "1010") { // rd, rs, rt
        output.push(getRegister(rdBin))
        output.push(getRegister(rsBin))
        output.push(getRegister(rtBin))
    }
    else{
        output.push("Error: Invalid Function Bits")

    }

    return output
}

// parses fields for i-type instructions    
function parseIType(binValue){
    let output = []
    let opcode = binValue.slice(0,6)
    let rsBin = binValue.slice(6,11)
    let rtBin = binValue.slice(11,16)
    let immBin = binValue.slice(16,32)
    let typeId = String(opcode.slice(0,2))
    let funcBin = opcode.slice(2,6)
    var opname = ""
    if (typeId === "00"){
        let num = b2d(opcode)
        if (num === 1) {
            if (b2d(rtBin) <= 1) {
                opname = iType00[b2d(rtBin)]
            }
            else {
                opname = "Error, BLTZ/BGEZ require rt of 000000 or 000001"
            }
                
        }

        else {
            if (b2d(opcode) > 5) {
                if (str(opcode.slice(0,3)) === "000") {
                    if (rtBin === "000000"){
                        opname = iType00[b2d(funcBin)]
                    }
                    else {
                        opname = "Error, BLEZ/BGTZ require rt of 000000"
                    }
                }
                else {
                    opname = iType00[b2d(funcBin)]
                }   
            }
            else if (b2d(opcode) > 3){
                opname = iType00[b2d(funcBin)]
            }
                
            else {
                opname = "Error: Invalid i-type opcode"
            }      
        }
    }
        
    else if (typeId === "10") {
        opname = iType10[b2d(funcBin)]

    }

    else if (typeId === "11") {
        opname = iType11[b2d(funcBin)]

    }

    else {
        opname = "Error Invalid Binary Opcode"

    } 

    output.push(opname)
    let func3 = opcode.slice(2,6)
    let firstBit = String(opcode.slice(0,1))
    let funcDec = b2d(func3)
    if (firstBit === "0") {
        if (funcDec > 5 || funcDec < 2) { // rs, label
            if (String(opcode.slice(2,3)) == "0") {
                output.push(getRegister(rsBin))
                output.push(b2h(immBin))
            }

            else { // rt, rs, label
                output.push(getRegister(rtBin))
                output.push(getRegister(rsBin))
                output.push(b2h(immBin))
            }
        }
        
        else {
            output.push(getRegister(rsBin))
            output.push(getRegister(rtBin))
            output.push(b2h(immBin))
        }
    }
    
    else if (firstBit === "1") {
        output.push(getRegister(rtBin))
        let label = b2h(immBin) + "(" + getRegister(rsBin) + ")"
        output.push(label)
    }


    else {
        // print("bruh")
        output.push("bruh")
    }


    return output


}
 
function parseJType(binValue){
    let output = []
    let opcode = binValue.slice(0,6)
    let labelBin = binValue.slice(6,32)
    let opname = jType[parseInt(opcode.slice(5,6), 10)]
    output.push(opname)
    labelBin = "00" + labelBin
    output.push(b2h(labelBin))
    return output
}
// converts hex instruction to binary and parses based on instruction type
function parseInput(hex) {
    let instrType = getType(hex.slice(0,2))
    let convBinary = ""

    convBinary = manyH2B(hex)
    console.log(convBinary)
    let output = []
    // split binary based on type 
    switch(parseInt(instrType, 10)){
        case 0:
            output = parseRType(convBinary)
            break;
        case 1:
            output = parseJType(convBinary)
            break;
        default:
            output = parseIType(convBinary)
            break;
    }
 
    let mips = ""
    for(let i = 0; i < output.length; i++) {
        if (i === 0 || i == (output.length) - 1) { // first or last object
            mips += output[i] + " "
        }
        else { // objects in middle
            mips += output[i] + ", "
        }

    }
    return mips
}

function checks() {
    let tester = []
    var startTime = performance.now()
    
    tester = parseInput("12345678")
        
    var endTime = performance.now()
    
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    document.getElementById("output").value = "tester"
}
document.getElementById ("swap").addEventListener ("click", checks, false);

