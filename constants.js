export const buttonFuncs = {
  // row 1
  CPT: { primary: "setMode", secondary: "ENTER" },
  ENTER: { primary: "", secondary: "SET" },
  "↑": { primary: "", secondary: "DEL" },
  "↓": { primary: "", secondary: "INS" },
  "ON|OFF": { primary: "toggleOn" },
  // row 2
  "2ND": { primary: "toggleAlternate" },
  CF: { primary: "", recall: "getMemory" },
  NPV: { primary: "", recall: "getMemory" },
  IRR: { primary: "", recall: "getMemory" },
  "→": { primary: "delete" },
  // row 3
  N: { primary: "", secondary: "xP/Y" },
  "I/Y": { primary: "", secondary: "P/Y" },
  PV: { primary: "", secondary: "AMORT" },
  PMT: { primary: "", secondary: "BGN" },
  FV: { primary: "", secondary: "CLR TVM" },
  // row 4
  "%": { primary: "postfixOperation", secondary: "K" },
  "√𝑥": { primary: "postfixOperation" },
  "𝑥²": { primary: "postfixOperation" },
  "1/𝑥": { primary: "postfixOperation" },
  "÷": { primary: "infixOperation", secondary: "RAND" },
  // row 5
  INV: { primary: "toggleAlternate", secondary: "HYP" },
  "(": { primary: "", secondary: "SIN" },
  ")": { primary: "", secondary: "COS" },
  yᵡ: { primary: "infixOperation", secondary: "TAN" },
  "×": { primary: "infixOperation", secondary: "𝑥!" },
  // row 6
  LN: { primary: "postfixOperation", secondary: "eᵡ" },
  7: { primary: "appendNumber", secondary: "DATA", recall: "getMemory", store: "setMemory" },
  8: { primary: "appendNumber", secondary: "STAT", recall: "getMemory", store: "setMemory" },
  9: { primary: "appendNumber", secondary: "BOND", recall: "getMemory", store: "setMemory" },
  "-": { primary: "infixOperation", secondary: "nPr" },
  // row 7
  STO: { primary: "setMode", secondary: "ROUND" },
  4: { primary: "appendNumber", secondary: "DEPR", recall: "getMemory", store: "setMemory" },
  5: { primary: "appendNumber", secondary: "◺%", recall: "getMemory", store: "setMemory" },
  6: { primary: "appendNumber", secondary: "BRKEVN", recall: "getMemory", store: "setMemory" },
  "+": { primary: "infixOperation", secondary: "nCr" },
  // row 8
  RCL: { primary: "setMode" },
  1: { primary: "appendNumber", secondary: "DATE", recall: "getMemory", store: "setMemory" },
  2: { primary: "appendNumber", secondary: "ICONV", recall: "getMemory", store: "setMemory" },
  3: { primary: "appendNumber", secondary: "PROFIT", recall: "getMemory", store: "setMemory" },
  "=": { primary: "compute", secondary: "ANS", recall: "getMemory" },
  // row 9
  "CE|C": { primary: "clear", secondary: "CLR WORK" },
  0: { primary: "appendNumber", secondary: "MEM", recall: "getMemory", store: "setMemory" },
  ".": { primary: "appendNumber", secondary: "FORMAT" },
  "+|-": { primary: "changeSign", secondary: "RESET" },

  // Secondary
  // row 1
  "QUIT": { primary: "setMode"},
  "INS": { primary: ""},
  // row 3
  "xP/Y": { primary: "changeSettings"},
  "P/Y": { primary: "changeSettings"},
  "AMORT": { primary: "selectSheet"},
  "BGN": { primary: "changeSettings"},
  "CLR TVM": { primary: "clearMemory"},
  // row 4
  "K": { primary: ""},
  "RAND": { primary: "postfixOperation"},
  // row 5
  "HYP": { primary: "toggleAlternate"},
  "SIN": { primary: "postfixOperation"},
  "COS": { primary: "postfixOperation"},
  "TAN": { primary: "postfixOperation"},
  "𝑥!": { primary: "postfixOperation" },
  // row 6
  "eᵡ": { primary: "postfixOperation" },
  "DATA": { primary: "selectSheet"},
  "STAT": { primary: "selectSheet"},
  "BOND": { primary: "selectSheet"},
  "nPr": { primary: "infixOperation" },
  // row 7
  "ROUND": { primary: "postfixOperation"},
  "DEPR": { primary: "selectSheet"},
  "◺%": { primary: "selectSheet" },
  "BRKEVN": { primary: "selectSheet"},
  "nCr": { primary: "infixOperation" },
  // row 8
  "DATE": { primary: "selectSheet"},
  "ICONV": { primary: "selectSheet"},
  "PROFIT": { primary: "selectSheet"},
  "ANS": { primary: "getMemory"},
  // row 9
  "CLR WORK": { primary: "clearMemory"},
  "MEM": { primary: "viewMemory"},
  "FORMAT": { primary: "changeSettings"},
  "RESET": { primary: "reset"},

};

export const keyFuncs = {
  "~": "+|-",
  "/": "÷",
  "*": "×",
  "^": "yᵡ",
  Enter: "=",
  Escape: "CE|C",
  P: "nPr",
  C: "nCr",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowRight: "→",
  "!": "𝑥!",
  PCT: "◺%",
};

export const indicators = {
      "On": true,
      "2nd": false,
      INV: false,
      HYP: false,
      COMPUTE: false,
      ENTER: false,
      SET: false,
      "⇅": false,
      DEL: false,
      INS: false,
      BGN: false,
      RAD: false,
      "◁": false,
      "⁎": false,
}

export const settings = {
    decimals: 2,
    angle: "DEG",
    dates: "US",
    separator: "US",
    method: "Chn",
};

export const memory = {
  ANS: "",
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  N: "",
  "I/Y": "",
  PV: "",
  PMT: "",
  FV: ""
}