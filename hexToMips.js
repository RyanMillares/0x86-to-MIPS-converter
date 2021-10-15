const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
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
    hex = "0x"
    numHex = len(binVal) / 4
    for
    for i in range(int(numHex)){
        hex += validChars[b2d(binVal[(4*i):(4*(i+1))])]
    }
        
    return hex

}
