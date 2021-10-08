
from typing import Match

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

# Converts hex character to 4-bit binary
def h2b(hexVal):
    #assuming input is one character
    return binVals[validChars.index(hexVal)]

# Converts binary value to decimal value
def b2d(binVal):
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
                if currChar in validChars: #change this to "not in" when done and replace code with else error raise
                    #Debug line
                    print(str(currChar) + " was found at index " + str(validChars.index(currChar)))
                else:             
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


def parseRType(binValue):
    print("r")
    opcode = binVals[0:6]
    rs = binVals[6:11]
    rt = binVals[11:16]
    rd = binVals[16:21]
    shamt = binVals[21:26]
    func = binVals[26:32]

    

def parseIType(binValue):
    print("i")

def parseJType(binValue):
    print("j")


def parseInput(hex):
    instrType = getType(hex[0:2])

    convBinary = ""
    for i in range(len(hex)):
        convBinary += h2b(hex[i:(i+1)])


    
    if instrType == 0: print("r")
    elif instrType == 1: print("j")
    else: print("i")

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
    print(hexData)
    parseInput(hexData)





if __name__ == "__main__":
    main()