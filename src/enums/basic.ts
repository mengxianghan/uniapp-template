import { createEnum } from 'xy-enum'

export const GENDER_ENUM = createEnum([
  { key: 'female', value: 0, label: '女' },
  { key: 'male', value: 1, label: '男' },
])
