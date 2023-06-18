import { useState } from 'react'
import type { ReactElement } from 'react'
import { DatePicker } from '@mantine/dates'
import type { DatesRangeValue } from '@mantine/dates'
import dayjs from 'dayjs'
import type { FilterParams, SearchParams, SiderBarProps } from './types'
import { Button, TextInput, SegmentedControl, Stack } from '@mantine/core'
import { ROLE, PLAYER, RESULT } from './model/enum'

const SiderBar = ({ onSearch }: SiderBarProps): ReactElement => {
  const [datetime, setDatetime] = useState<[Date | null, Date | null]>([dayjs().toDate(), dayjs().toDate()])
  function onChangeDate ([startDate, endDate]: DatesRangeValue): void {
    setDatetime([startDate, endDate])
    searchParams.start = dayjs(startDate).unix().toString()
    searchParams.end = dayjs(endDate).unix().toString()
  }

  const [heroName, setHeroName] = useState('')
  function onInputHeroName (value: string): void {
    setHeroName(value)
    filterParams.hero = value
  }

  const [role, setRole] = useState(ROLE.ALL)
  function onSetRole (value: ROLE): void {
    setRole(value)
    filterParams.role = value
  }

  const [player, setPlayer] = useState(PLAYER.SELF)
  function onSetPlayer (value: PLAYER): void {
    setPlayer(value)
    filterParams.player = value
  }

  const [result, setResult] = useState(RESULT.ALL)
  function onSetResult (value: RESULT): void {
    setResult(value)
    filterParams.isWin = value
  }

  const searchParams: SearchParams = {
    start: dayjs(datetime[0]).unix().toString(),
    end: dayjs(datetime[1]).unix().toString()
  }

  const filterParams: FilterParams = {
    hero: '',
    role: ROLE.ALL,
    player: PLAYER.SELF,
    isWin: RESULT.ALL
  }

  function onClickSearch (): void {
    onSearch(searchParams, filterParams)
  }

  return (
    <Stack spacing="sm" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
      <DatePicker type="range" value={datetime} onChange={onChangeDate} />
      <TextInput value={heroName} onInput={(event) => { onInputHeroName(event.currentTarget.value) }} />
      <SegmentedControl
        color="pink"
        value={role}
        onChange={onSetRole}
        data={[
          { label: '全部', value: ROLE.ALL },
          { label: '地主', value: ROLE.LAND_LORD },
          { label: '农民1', value: ROLE.FARMER1 },
          { label: '农民2', value: ROLE.FARMER2 }
        ]}
      />
      <SegmentedControl
        color="pink"
        value={player}
        onChange={onSetPlayer}
        data={[
          { label: '本人', value: PLAYER.SELF },
          { label: '对手', value: PLAYER.REIVAL }
        ]}
      />
      <SegmentedControl
        color="pink"
        value={result}
        onChange={onSetResult}
        data={[
          { label: '全部', value: RESULT.ALL },
          { label: '胜', value: RESULT.WIN },
          { label: '负', value: RESULT.LOSE }
        ]}
      />
      <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={onClickSearch}>搜索</Button>
    </Stack>
  )
}

export default SiderBar
