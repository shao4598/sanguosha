export interface SearchParams {
  start: string
  end: string
}

export interface FilterParams {
  hero: string
  role: string
  player: string
  isWin: string
}

export interface SiderBarProps {
  onSearch: (searchParams: SearchParams, filterParams: FilterParams) => void
}

export interface GameData {
  guid: string
  player_id: string
  room: string
  landlord: string
  farmer1: string
  farmer2: string
  is_win: string
  role: string
  multiple: string
  golds: string
  beans: string
  is_flee: string
  remarks: string
  timestamp: string
}

export interface ContentTableProps {
  col: number
  data: GameData[]
  onDeleteRecord: (guid: string) => void
}
