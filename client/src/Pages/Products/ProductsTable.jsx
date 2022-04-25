import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { ExportDataContext } from './../../context/DataExport';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import MoveProductModal from './MoveProductModal';
import { useFetchData } from '../../hooks/useFetchData';

import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from 'moment';
import StyledTable from '../../components/StyledTable';
import TableSkeleton from '../../components/TableSkeleton';

const StyledDateTableCell = { minWidth: 90 };
let columns = [];

const ProductsTable = ({ fetchData, allproducts, error }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const { changeDataExport } = useContext(ExportDataContext);

  if (user?.permission !== 'Viewer') {
    columns = [
      { title: 'productName' },
      { title: 'serialNumber' },
      { title: 'PONumber' },
      { title: 'locationName' },
      { title: 'date' },
      { title: 'warranty' },
      { title: 'Actions' },
    ];
  } else {
    columns = [
      { title: 'productName' },
      { title: 'serialNumber' },
      { title: 'PONumber' },
      { title: 'locationName' },
      { title: 'date' },
      { title: 'warranty' },
    ];
  }

  const handleDeleteModal = product => {
    setDeleteModal(!deleteModal);
    setSelectedProduct(product);
  };
  const handleMoveModal = product => {
    setMoveModal(!moveModal);
    setSelectedProduct(product);
  };
  const handleEditModal = product => {
    setEditModal(!editModal);
    setSelectedProduct(product);
  };

  useEffect(() => {
    changeDataExport('Products', allproducts);
  }, [allproducts]);

  return (
    <>
      <div></div>

    </>
  );
};

export default ProductsTable;
