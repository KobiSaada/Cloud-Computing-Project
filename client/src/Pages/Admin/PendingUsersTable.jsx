import React, { useState, useContext } from 'react';
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { AuthContext } from '../../context/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PendingUserEditModal from './PendingUserEditModal';
import DeleteUserModal from './DeleteUserModal';
import StyledTable from '../../components/StyledTable';
import TableSkeleton from '../../components/TableSkeleton';

const columns = [
  { title: 'User Name' },
  { title: 'Email' },
  { title: 'Actions' },
];

const PendingUsersTable = ({ allPendingUsers, fetchData, error }) => {
  const [userData, setUserData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeletMeodal] = useState(false);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const handleDeleteModal = () => {
    setOpenDeletMeodal(!openDeleteModal);
  };
  const handleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  return (
    <>
      {allPendingUsers ? (
        <StyledTable columns={columns}>
          {allPendingUsers.length > 0 ? (
            allPendingUsers?.map(userData =>
              userAction.userId !== userData.userId ? (
                <TableRow key={userData.userId}>
                  <TableCell>{userData.name}</TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setUserData(userData);
                          handleEditModal();
                        }}
                        aria-label="delete"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setUserData(userData);
                          handleDeleteModal();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ) : null
            )
          ) : (
            <TableRow>
              <TableCell>No results</TableCell>
            </TableRow>
          )}
        </StyledTable>
      ) : error ? (
        <Typography sx={{ m: 1 }} variant="h4">
          error fetching pending users
        </Typography>
      ) : (
        <TableSkeleton columns={columns} />
      )}

      {userData ? (
        <>
          <PendingUserEditModal
            open={openEditModal}
            fetchData={fetchData}
            close={handleEditModal}
            userData={userData}
          />
          <DeleteUserModal
            fetchData={fetchData}
            open={openDeleteModal}
            close={handleDeleteModal}
            userData={userData}
          />
        </>
      ) : null}
    </>
  );
};

export default PendingUsersTable;
