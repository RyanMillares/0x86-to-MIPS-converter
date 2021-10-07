
validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
binVals = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"]
# R-type instructions
rType00 = ["sll", "", "srl", "sra", "sllv", "", "srlv", "srav", "jr", "jalr", "", "", "syscall", "break"] #length 13
rType01 = ["mfhi", "mthi", "mflo", "mtlo", "", "", "", "", "mult", "multu", "div", "divu"] # length 11
rType10 = ["add", "addu", "sub", "subu", "and", "or", "xor", "nor", "", "", "slt", "sltu"] # length 11
# I-type  instructions


#print (binVals[validChars.index("D")])
def h2b(hexVal):
    print("est")

def validInput(input):
    res = isinstance(input, str)
    if res:
        #print("main code")
        if len(input) == 10 and input[0:2] == "0x":
            #print("main block")
            hexOut = input[2:10]
            for i in range(len(hexOut) - 1):
                currChar = hexOut[i:(i+1)]
                if currChar in validChars:
                    print("\n")
                else:
                    raise NameError


            return hexOut
            
        else: # string input is not of correct length or incorrectly formatted
            raise ValueError


    else: # input is not of type string
        raise TypeError

def getType(chars):
    #0 = r-type, 1 = i-type, 2 = j-type
    print(binVals[validChars.index(chars[0:1])] + binVals[validChars.index(chars[1:2])])
    
def parseInput(hex):
    getType(hex[0:2])
    #print("test")


def main():
    while(True):
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