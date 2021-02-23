import {storage} from '@core/utils'

const defaultStorage = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  
}

export const initialState = storage('excel-state') ?
  storage('excel-state') : defaultStorage
