import React from 'react';
import ReactExport from 'react-export-excel';
import util from 'utils/util';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelColumn;

const Excel = ({ children, data,headers,name }) => {
  return (
    <ExcelFile element={{ ...children }} filename={name}>
      <ExcelSheet data={data} name="List">
        {headers.map((label,idx)=>{
          return <ExcelColumn label={label} value={col => col[label]} />
        })}
      </ExcelSheet>
    </ExcelFile>
  )
}

export default Excel;