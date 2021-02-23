import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultStorage = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currnetStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) : defaultStorage
