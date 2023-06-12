export interface SearchParams {
    start: string;
    end: string;
}

export interface FilterParams {
    hero: string;
    role: string;
    player: string;
    isWin: string;
}

export interface SiderBarProps {
    onSearch: (params: SearchParams) => void;
    onFilter: (params: FilterParams) => void;
}