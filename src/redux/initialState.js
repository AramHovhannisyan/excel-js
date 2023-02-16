import { defaultStyles, defaultTitle } from "@/constants";
import { clone } from "@core/utils";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle || 'Default Title',
  dateOpened: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles,
})

export function normalizeInitialState (state) {
  return state ? normalize(state) : clone(defaultState)
}