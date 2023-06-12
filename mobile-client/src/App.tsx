import { MantineProvider } from '@mantine/core';
import SiderBar from './SiderBar';
import ContentTable from './ContentTable';
import type { FilterParams, SearchParams } from './types';
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function App() {
  const matches = useMediaQuery('(max-width: 40em) and (min-width: 20em)');

  function onSearch(params: SearchParams) {
    console.log('SearchParams', params);
  }
  function onFilter(params: FilterParams) {
    console.log('FilterParams', params);
  }

  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Burger display={matches ? 'block' : 'none'} opened={opened} onClick={toggle} aria-label={label} />
      <Grid>
        <Grid.Col span={matches ? 12 : 'content'} display={matches && !opened ? 'none' : 'block'}><SiderBar onSearch={onSearch} onFilter={onFilter} /></Grid.Col>
        <Grid.Col span={matches ? 12 : 8}><ContentTable /></Grid.Col>
        <Grid.Col span={2}>2</Grid.Col>
      </Grid>



    </MantineProvider>
  )
}

export default App
