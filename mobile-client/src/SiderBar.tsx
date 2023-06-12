import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import type { DatesRangeValue } from '@mantine/dates';
import dayjs from 'dayjs'
import type { FilterParams, SearchParams, SiderBarProps } from './types'
import { Button, TextInput } from '@mantine/core';
import { ROLE, PLAYER, RESULT } from './model/enum'
import { SegmentedControl } from '@mantine/core';
import { Stack } from '@mantine/core';

const SiderBar = ({ onSearch, onFilter }: SiderBarProps) => {
  const [datetime, setDatetime] = useState<[Date | null, Date | null]>([dayjs().toDate(), dayjs().toDate()]);
  function onChangeDate([startDate, endDate]: DatesRangeValue) {
    setDatetime([startDate, endDate])
    searchParams.start = dayjs(startDate).format('YYYY-MM-DD')
    searchParams.end = dayjs(endDate).format('YYYY-MM-DD')
  }

  const [heroName, setHeroName] = useState('')
  function onInputHeroName(value: string) {
    setHeroName(value)
    filterParams.hero = value
  }

  const [role, setRole] = useState(ROLE.ALL)
  function onSetRole(value: ROLE) {
    setRole(value)
    filterParams.role = value
  }

  const [player, setPlayer] = useState(PLAYER.SELF)
  function onSetPlayer(value: PLAYER) {
    setPlayer(value)
    filterParams.player = value
  }

  const [result, setResult] = useState(RESULT.ALL)
  function onSetResult(value: RESULT) {
    setResult(value)
    filterParams.isWin = value
  }

  const searchParams: SearchParams = {
    start: dayjs(datetime[0]).format('YYYY-MM-DD'),
    end: dayjs(datetime[1]).format('YYYY-MM-DD')
  }

  const filterParams: FilterParams = {
    hero: '',
    role: ROLE.ALL,
    player: PLAYER.SELF,
    isWin: RESULT.ALL,
  }

  function onClickSearch() {
    onSearch(searchParams)
    onFilter(filterParams)
  }

  return (
    <Stack spacing="sm" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
      <DatePicker type="range" value={datetime} onChange={onChangeDate} />
      <TextInput value={heroName} onInput={(event) => onInputHeroName(event.currentTarget.value)} />
      <SegmentedControl
        color="pink"
        value={role}
        onChange={onSetRole}
        data={[
          { label: '全部', value: ROLE.ALL },
          { label: '地主', value: ROLE.LAND_LORD },
          { label: '农民1', value: ROLE.FARMER1 },
          { label: '农民2', value: ROLE.FARMER2 },
        ]}
      />
      <SegmentedControl
        color="pink"
        value={player}
        onChange={onSetPlayer}
        data={[
          { label: '本人', value: PLAYER.SELF },
          { label: '对手', value: PLAYER.REIVAL },
        ]}
      />
      <SegmentedControl
        color="pink"
        value={result}
        onChange={onSetResult}
        data={[
          { label: '全部', value: RESULT.ALL },
          { label: '胜', value: RESULT.WIN },
          { label: '负', value: RESULT.LOSE },
        ]}
      />
      <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={onClickSearch}>搜索</Button>
    </Stack>
  );
}

export default SiderBar