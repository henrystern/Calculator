export const buttonFuncs = {
  // row 1
  CPT: { primary: "", secondary: "ENTER" },
  ENTER: { primary: "", secondary: "SET" },
  "↑": { primary: "", secondary: "DEL" },
  "↓": { primary: "", secondary: "INS" },
  "ON|OFF": { primary: "toggleOn" },
  // row 2
  "2ND": { primary: "toggleSecondary" },
  CF: { primary: "" },
  NPV: { primary: "" },
  IRR: { primary: "" },
  "→": { primary: "delete" },
  // row 3
  N: { primary: "", secondary: "xP/Y" },
  "I/Y": { primary: "", secondary: "P/Y" },
  PV: { primary: "", secondary: "AMORT" },
  PMT: { primary: "", secondary: "BGN" },
  FV: { primary: "", secondary: "CLR TVM" },
  // row 4
  "%": { primary: "instantOperation", secondary: "K" },
  "√𝑥": { primary: "instantOperation" },
  "𝑥²": { primary: "instantOperation" },
  "1/𝑥": { primary: "instantOperation" },
  "÷": { primary: "infixOperation", secondary: "RAND" },
  // row 5
  INV: { primary: "setMode", secondary: "HYP" },
  "(": { primary: "", secondary: "SIN" },
  ")": { primary: "", secondary: "COS" },
  yᵡ: { primary: "infixOperation", secondary: "TAN" },
  "×": { primary: "infixOperation", secondary: "𝑥!" },
  // row 6
  LN: { primary: "instantOperation", secondary: "eᵡ" },
  7: { primary: "appendNumber", secondary: "DATA" },
  8: { primary: "appendNumber", secondary: "STAT" },
  9: { primary: "appendNumber", secondary: "BOND" },
  "-": { primary: "infixOperation", secondary: "nPr" },
  // row 7
  STO: { primary: "setMode", secondary: "ROUND" },
  4: { primary: "appendNumber", secondary: "DEPR" },
  5: { primary: "appendNumber", secondary: "◺%" },
  6: { primary: "appendNumber", secondary: "BRKEVN" },
  "+": { primary: "infixOperation", secondary: "nCr" },
  // row 8
  RCL: { primary: "setMode" },
  1: { primary: "appendNumber", secondary: "DATE" },
  2: { primary: "appendNumber", secondary: "ICONV" },
  3: { primary: "appendNumber", secondary: "PROFIT" },
  "=": { primary: "compute", secondary: "ANS" },
  // row 9
  "CE|C": { primary: "clear", secondary: "CLR WORK" },
  0: { primary: "appendNumber", secondary: "MEM" },
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
  "RAND": { primary: "instantOperation"},
  // row 5
  "HYP": { primary: "setMode"},
  "SIN": { primary: "instantOperation"},
  "COS": { primary: "instantOperation"},
  "TAN": { primary: "instantOperation"},
  "𝑥!": { primary: "instantOperation" },
  // row 6
  "eᵡ": { primary: "instantOperation" },
  "DATA": { primary: "selectSheet"},
  "STAT": { primary: "selectSheet"},
  "BOND": { primary: "selectSheet"},
  "nPr": { primary: "infixOperation" },
  // row 7
  "ROUND": { primary: "instantOperation"},
  "DEPR": { primary: "selectSheet"},
  "◺%": { primary: "selectSheet" },
  "BRKEVN": { primary: "selectSheet"},
  "nCr": { primary: "infixOperation" },
  // row 8
  "DATE": { primary: "selectSheet"},
  "ICONV": { primary: "selectSheet"},
  "PROFIT": { primary: "selectSheet"},
  "ANS": { primary: "viewMemory"},
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