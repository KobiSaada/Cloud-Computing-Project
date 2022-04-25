import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
  ListSubheader,
} from '@mui/material';
import { useForm } from '../../hooks/useForm';
import products from './../../requests/products';
import ProductsTable from './ProductsTable';
import DownloadIcon from '@mui/icons-material/Download';
import PageContainer from '../../components/PageContainer';
import AddProductsModal from './AddProductsModal';
import { useFetchData } from '../../hooks/useFetchData';
//csv
import { CSVLink } from 'react-csv';
import { ExportDataContext } from './../../context/DataExport';
import TextFieldSelect from '../../components/TextFieldSelect';
import Banner from '../../components/Banner';
import { PageHeaderContainer } from '../../styles/styledComponents';
import GapsTable from './GapsTable';

const ProductsPage = () => {
  const [warehouse, setWarehouse] = useState('');
  const [country, setCountry] = useState('');
  const [addModal, setAddModal] = useState(false);
  // const { user, token } = useContext(AuthContext);

  // const userAction = {
  //   userId: user.id,
  //   token: token,
  // };
  const { headers, fileName, data, changeDataExport } =
    useContext(ExportDataContext);


  const { headers: headersGaps, fileName: fileNameGaps, data: dataGaps, changeDataExport: changeDataExportGaps } =
    useContext(ExportDataContext);

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  return (
    <>
      <PageContainer>
        <PageHeaderContainer>
          {country ? <Banner country={country} /> : <Banner country={''} />}

          <Typography sx={{ m: 1 }} variant="h4">
            Products
          </Typography>
          <Box sx={{ m: 1 }}>
            {fileName && headers && data ? (
              <CSVLink
                style={{ textDecoration: 'none', color: '#3F3FBE' }}
                filename={fileName}
                data={data}
                headers={headers}
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
            {/* {user && user?.name == 'Admin' || user?.name == 'Editor' ? ( */}

            {/* {console.log('asasasas', user)} */}
            <Button
              onClick={handleAddModal}
              color="secondary"
              variant="contained"
            >
              Add Product
            </Button>

          </Box>
        </PageHeaderContainer>
      </PageContainer>
    </>
  );
};

export default ProductsPage;
