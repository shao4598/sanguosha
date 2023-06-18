import { MantineProvider, Burger, Grid } from '@mantine/core'
import SiderBar from './SiderBar'
import ContentTable from './ContentTable'
import type { FilterParams, GameData, SearchParams } from './types'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useState, type ReactElement } from 'react'

function App (): ReactElement {
  const matches = useMediaQuery('(max-width: 40em) and (min-width: 20em)')

  function onSearch (params: SearchParams, filterParams: FilterParams): void {
    console.log('SearchParams', params, 'FilterParams', filterParams)
    fetch(`http://192.168.1.112:3000/records/games/s21294?start=${params.start}&end=${params.end}`).then(async res => await res.json()).then(({ data }) => { setTableData(data) }).catch(() => { })
  }

  function onDeleteRecord (guid: string): void {
    console.log('guid', guid)
  }

  const [opened, { toggle }] = useDisclosure(false)
  const label = opened ? 'Close navigation' : 'Open navigation'
  const [tableData, setTableData] = useState<GameData[]>([])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Burger display={matches ? 'block' : 'none'} opened={opened} onClick={toggle} aria-label={label} />
      <Grid>
        <Grid.Col span={matches ? 12 : 'content'} display={matches && !opened ? 'none' : 'block'}><SiderBar onSearch={onSearch} /></Grid.Col>
        <Grid.Col span={matches ? 12 : 8}><ContentTable col={matches ? 12 : 8} data={tableData} onDeleteRecord={onDeleteRecord} /></Grid.Col>
        <Grid.Col span={2}>2</Grid.Col>
      </Grid>
    </MantineProvider>
  )
}

export default App
