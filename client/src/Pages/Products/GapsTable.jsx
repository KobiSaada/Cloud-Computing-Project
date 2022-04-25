import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  TableRow,
  TableCell,
  Grid,
  ListSubheader,
} from '@mui/material';
import { PageHeaderContainer } from '../../styles/styledComponents';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';
import { useFetchData } from '../../hooks/useFetchData';
import products from './../../requests/products';
import StyledTable from '../../components/StyledTable';
import TableSkeleton from '../../components/TableSkeleton';
// import products from '../../requests/products';
import { ExportDataContext } from './../../context/DataExport';

const columns = [
  {
    title: 'Product Name',
  },
  {
    title: 'Total Quantity in location',
  },
  {
    title: 'Supposed Quantity',
  },
  {
    title: 'Gap',
  },
];

const GapsTable = ({ warehouse }) => {
  // const { state: allGaps, error, setState } = useFetchData(products.getGaps);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { headers: headersGaps, fileName: fileNameGaps, data: dataGaps, changeDataExport: changeDataExportGaps } =
    useContext(ExportDataContext);

  const [allGaps, setAllGaps] = useState([]);
  const getGapsByLocation = async (warehouse) => {

    const location = {
      locationId: warehouse
    }
    const result = await products.getGaps(userAction, location);
    console.log('result', result);
    setAllGaps(result)
  };

  useEffect(() => {
    if (warehouse.length > 0) {
      getGapsByLocation(warehouse);
    }
  }, [warehouse]);

  useEffect(() => {
    changeDataExportGaps('Gaps', allGaps);
  }, [allGaps]);


  return (
    <>
      <PageHeaderContainer sx={{ mt: 5, mb: 3 }}>
        <Typography sx={{ m: 1 }} variant="h4">
          Gaps
        </Typography>
        <Box sx={{ m: 1 }}>
          {fileNameGaps && headersGaps && dataGaps ? (
            <CSVLink
              style={{ textDecoration: 'none', color: '#3F3FBE' }}
              filename={fileNameGaps}
              data={dataGaps}
              headers={headersGaps}
            >
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
              >
                Export To Excel
              </Button>
            </CSVLink>
          ) : null}
        </Box>
      </PageHeaderContainer>

      {allGaps ? (
        <StyledTable columns={columns}>
          {allGaps.length > 0 ? (
            allGaps.map(row => (
              <TableRow key={row.gapId}>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.quantityInLocation}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.gap}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No results</TableCell>
            </TableRow>
          )}
        </StyledTable>
      ) : <TableSkeleton columns={columns} />}
    </>)
};

export default GapsTable;
