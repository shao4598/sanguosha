import { RESULT, ROLE } from './enum'

export const dictResult = new Map<string, string>([
  [RESULT.ALL, '全部'],
  [RESULT.LOSE, '输'],
  [RESULT.WIN, '赢']
])

export const dictRole = new Map<string, string>([
  [ROLE.ALL, '全部'],
  [ROLE.LAND_LORD, '地主'],
  [ROLE.FARMER1, '农民1'],
  [ROLE.FARMER2, '农民2']
])
