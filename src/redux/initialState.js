import { storage } from "@core/utils"
import { defaultStyles, defaultTitle } from "@/constants";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle || 'Default Title'
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState