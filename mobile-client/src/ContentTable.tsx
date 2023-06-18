import { Badge, Button, Table } from '@mantine/core'
import { useMemo } from 'react'
import type { ReactElement } from 'react'
import { type ContentTableProps } from './types'
import dayjs from 'dayjs'
import { dictResult, dictRole } from './model/dict'
import { RESULT } from './model/enum'

const headElements = [
  { name: '日期', maxSpan: 12 },
  { name: '结果', maxSpan: 12 },
  { name: '身份', maxSpan: 12 },
  { name: '地主', maxSpan: 8 },
  { name: '农民1', maxSpan: 8 },
  { name: '农民2', maxSpan: 8 },
  { name: '备注', maxSpan: 8 },
  { name: '操作', maxSpan: 12 }
]

const ContentTable = ({ col, data, onDeleteRecord }: ContentTableProps): ReactElement => {
  const rows = useMemo(() =>
    data.map((item) => {
      const requireContent = (
        <>
          <td>{dayjs.unix(Number(item.timestamp)).format('MM-DD')}</td>
          <td><Badge radius="xs" variant="filled" color={item.is_win === RESULT.WIN ? 'red' : 'blue'}>{dictResult.get(item.is_win)}</Badge></td>
          <td>{dictRole.get(item.role)}</td>
        </>
      )

      const operationButtons = (
        <>
          <td><Button onClick={() => { onDeleteRecord(item.guid) }}>删除</Button></td>
        </>
      )

      if (col === 8) {
        return (<tr key={item.guid}>
          {requireContent}
          <td>{item.landlord}</td>
          <td>{item.farmer1}</td>
          <td>{item.farmer2}</td>
          <td>{item.remarks}</td>
          {operationButtons}
        </tr>)
      }
      return (<tr key={item.guid}>
        {requireContent}
        {operationButtons}
      </tr>)
    }), [col, data])

  const heads = useMemo(() =>
    headElements.filter(item => item.maxSpan >= col).map(item => (
      <th key={item.name}>{item.name}</th>
    )), [col])

  return (
    <Table striped highlightOnHover withBorder>
      <thead><tr>{heads}</tr></thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default ContentTable
