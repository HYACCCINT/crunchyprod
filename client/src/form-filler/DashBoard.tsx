import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import {  useQuery } from 'urql';
import { allFormQuery} from '../query';
import {Search,DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, OverflowMenu, OverflowMenuItem} from 'carbon-components-react'
import './DashBoard.scss'

export const DashBoard = () => {
    const history = useHistory();
    const [searchInput, setSearchInput] = useState('');
    const [resultAll] = useQuery({
      query: allFormQuery
    });
    const search = { // make sure all required component's inputs/Props keys&types match
    id:"searchForm",
    labelText:"Procedure ID",
    onChange: (event:any) => setSearchInput(event.target.value)
  }
  const overflow = { 
  itemText:"Fill",
  onClick: (row:any) => history.push('/fillform/' + row.id)
}



  let rows = resultAll.data? resultAll.data.forms.map((item:any)=>  ({id: item.id, procedureID:item.procedureID, lastm: item.lastModified})): [];
  const headers = [{key:"id", header:"ID"}, {key:"procedureID", header:"Procedure ID"}, {key:"lastm", header:"Last Modifed"}]
  return (
    <div className="dashBoard">
    <div className="searchWrap"><Search {...search} /></div>
    <div className="tableWrap">
    <DataTable rows={searchInput == '' ? rows : rows.filter((row:any)=> row.procedureID.includes(searchInput) || row.id.includes(searchInput))} headers={headers}>
    {({ rows, headers}: any) => (
      <TableContainer title="SDCForms" description="Procedure">
        <Table >
          <TableHead>
            <TableRow>
              {headers.map((header: any) => (
                <TableHeader key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row:any) => (
              <TableRow key={row.id}>
                {row.cells.map((cell:any) => (
                  <TableCell key={cell.id} onClick={()=>history.push('/formfill/' + row.id)}>{cell.value}</TableCell>
))}
                {/* <TableCell className="bx--table-column-menu">
                  <OverflowMenu light flipped>
                    <OverflowMenuItem {...overflow} onClick={ (row:any) => history.push('/fill/' + row.id)}/>
                  </OverflowMenu>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
  </div>
    </div>
  )
};
