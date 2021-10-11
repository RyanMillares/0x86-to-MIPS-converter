# Converts Hex Assembly Instructions into MIPS Instructions
# Began: October 5, 2021
# by Ryan Millares

# Hex Validation
validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
binVals = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"]

#Registers
registers = ["0","at","v0","v1","a0","a1","a2","a3","t0","t1","t2","t3","t4","t5","t6","t7","s0","s1","s2","s3","s4","s5","s6","s7","t8","t9","k0","k1","gp","sp","fp","ra"]

# R-type instructions 
rType00 = ["sll", "", "srl", "sra", "sllv", "", "srlv", "srav", "jr", "jalr", "", "", "syscall", "break"] #length 13
rType01 = ["mfhi", "mthi", "mflo", "mtlo", "", "", "", "", "mult", "multu", "div", "divu"] # length 11
rType10 = ["add", "addu", "sub", "subu", "and", "or", "xor", "nor", "", "", "slt", "sltu"] # length 11

# I-type  instructions
iType00 = []
iType10 = []
iType11 = []

# J-type instructions
jType = ["j", "jal"]
# Converts hex character to 4-bit binary
def h2b(hexVal):
    #assuming input is one character
    return binVals[validChars.index(hexVal)]

def b2h(binVal):
    decValue = b2d(binVal)
    return validChars[decValue]

# Converts binary value to decimal value
def b2d(binVal):
    print(binVal)
    numBits = len(binVal)
    value = 0
    for i in range(numBits):
        #returned = int(binVal[(numBits - i):(numBits - i + 1)])
        value += int(binVal[numBits - i - 1]) * pow(2,i)
        #test = int(str(value))

    return value
#print(b2d("1011"))

# validates if input is in correct 32-bit assembly instruction format
def validInput(input):
    res = isinstance(input, str)
    if res:
        if len(input) == 10 and input[0:2] == "0x":
            hexOut = input[2:10]
            for i in range(len(hexOut)):
                currChar = hexOut[i:(i+1)]
                if currChar not in validChars: 
                    raise NameError

            return hexOut
            
        else: # string input is not of correct length or incorrectly formatted
            raise ValueError

    else: # input is not of type string
        raise TypeError

# returns instruction type
# 0 = r-type, 1 = j-type, 2 = i-type
def getType(chars):
    opCode = (h2b(chars[0:1]) + h2b(chars[1:2]))[0:6]
    if opCode == "000000":
        print("R-Type")
        return 0

    elif (opCode == "000010" or opCode == "000011"):
        print("j-type")
        return 1

    else:
        print("i-type")
        return 2

# returns register name given 5-bit binary value
def getRegister(binVal):
    val = int(b2d(binVal))
    return "$" + str(registers[val])
    
# parses fields for r-type instructions
def parseRType(binValue):
    output = []
    opcode = binValue[0:6] #not used in r-type, comment out when finalizing
    rsBin = binValue[6:11]
    rtBin = binValue[11:16]
    rdBin = binValue[16:21]
    saBin = binValue[21:26]
    funcBin = binValue[26:32]
    typeId = str(funcBin[0:2]) # Fetch operation name
    if typeId == "00":
        opname = rType00[b2d(funcBin[2:6])]

    elif typeId== "01":
        opname = rType01[b2d(funcBin[2:6])]

    elif typeId == "10":
        opname = rType10[b2d(funcBin[2:6])]

    else:
        print(typeId)
        opname = "Error: Invalid function bits"

    output.append(opname)

    # Fetch order of fields and error handle
    func3 = funcBin[0:4]
    if func3 == "0000": # rd, rt, sa
        output.append(getRegister(rdBin))
        output.append(getRegister(rtBin))
        output.append(getRegister(saBin))

    elif func3 == "0001": # rd, rt, rs
        output.append(getRegister(rdBin))
        output.append(getRegister(rtBin))
        output.append(getRegister(rsBin))

    elif func3 == "0010":
        print("rs or rd, rs")
        if funcBin[5:6] == "0": # jr
            output.append(getRegister(rsBin))

        elif funcBin[5:6] == "1": # jalr
            output.append(getRegister(rdBin))
            output.append(getRegister(rsBin))

        else:
            print("Error, incorrect binary")

    elif func3 == "0011":
        print("no fields, syscall and break")

    elif func3 == "0100": # rd if even decimal,  rs if odd decimal")
        oddOrEven = b2d(funcBin[4:6])
        if oddOrEven % 2 == 0: # print("00 or 10")
            output.append(getRegister(rdBin))
            
        elif oddOrEven % 2 == 1: # print("01 or 11")
            output.append(getRegister(rsBin))

    elif func3 == "0110": # rs, rt
        output.append(getRegister(rsBin))
        output.append(getRegister(rtBin))

    elif (func3 == "1000" or func3 == "1001") or func3 == "1010": # rd, rs, rt
        output.append(getRegister(rdBin))
        output.append(getRegister(rsBin))
        output.append(getRegister(rtBin))

    else:
        print("error")

    return output
    
# parses fields for i-type instructions    
def parseIType(binValue):
    output = []
    opcode = binVals[0:6]
    rs = binValue[6:11]
    rt = binValue[11:16]
    immBin = binVals[16:32]
    output.append("i-type")
    output.append("hello-world")
    return output

# parses fields for j-type instructions
def parseJType(binValue):
    output = []
    opcode = binValue[0:6]
    labelBin = binValue[6:32]
    opname = jType[int(opcode[5:6])]
    output.append(opname)

    labelBin = "00" + labelBin
    label = "0x"
    numHex = len(labelBin) / 4
    for i in range(int(numHex)):
        label += b2h(labelBin[(4*i):(4*(i+1))])
        
    output.append(label)
    return output

# converts hex instruction to binary and parses based on instruction type
def parseInput(hex):
    instrType = getType(hex[0:2])
    convBinary = ""
    for i in range(len(hex)):
        convBinary += h2b(hex[i:(i+1)])

    # split binary based on type 
    if instrType == 0: 
        output = parseRType(convBinary)

    elif instrType == 1: 
        print("j")
        output = parseJType(convBinary)

    else: 
        print("i")
        output = parseIType(convBinary)

    mips = ""
    for i in range(len(output)):
        if i == 0 or i == (len(output) - 1): # first or last object
            mips += output[i] + " "

        else: # objects in middle
            mips += output[i] + ", "

    return mips
    #match instrType: use this once all issues with 3.10 are resolved
    #   case 0: print("r")
    #  case 1: print("j")

def main():
    while(True):
        # Note, when refactoring for line-by-line, remove while loop and
        # set up a default hexData value for errors.
        # Convert main to function that accepts one line input
        # Make new main that passes each line to function and append output to file
        print("Hello, welcome to 0x86 to MIPS Converter!")
        print("Please input a valid 0x86 assembly instruction in Hex (Include the \"0x\" at the start):")
        userInput = input() 
        try:
            hexData = validInput(userInput)

        except TypeError:
            print("Input needs to be a string.")

        except ValueError:
            print("Input needs to be 10 characters, and start with \"0x\"")

        except NameError:
            print("Hex value can only contain valid hexadecimal characters.")

        else:
            break

        finally:
            print("\n")

    print(parseInput(hexData))

if __name__ == "__main__":
    main()