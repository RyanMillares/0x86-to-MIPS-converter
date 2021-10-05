


def h2b(hexVal):
    print("est")

def parseInput(input):
    res = isinstance(input, str)
    if res:
        print("main code")
        if len(input) == 10 and input[0:2] == "0x":
            print("main block")
            return input[2:10]
            
        else: # string input is not of correct length or incorrectly formatted
            raise ValueError


    else: # input is not of type string
        raise TypeError

def main():
    while(True):
        print("Hello, welcome to 0x86 to MIPS Converter!")
        print("Please input a valid 0x86 assembly instruction in Hex (Include the \"0x\" at the start):")
        userInput = input() 
        try:
            hexData = parseInput(userInput)
        except TypeError:
            print("Input needs to be a string.")
        except ValueError:
            print("Input needs to be 10 characters, and start with \"0x\"")
        else:
            break
        finally:
            print("\n")
    print(hexData)




if __name__ == "__main__":
    main()