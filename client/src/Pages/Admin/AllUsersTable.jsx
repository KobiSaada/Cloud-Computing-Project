import React, { useState, useContext } from 'react';
import {
  Typography,
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserEditModal from './UserEditModal';
import DeleteUserModal from './DeleteUserModal';
import { AuthContext } from '../../context/auth';
import StyledTable from '../../components/StyledTable';
import TableSkeleton from '../../components/TableSkeleton';

const columns = [
  { title: 'User Name' },
  { title: 'Email' },
  { title: 'Permission' },
  { title: 'Actions' },
];

const AllUsersTable = ({ allUsers, fetchData, error }) => {
  const [userData, setUserData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeletMeodal] = useState(false);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const handleDeleteModal = () => setOpenDeletMeodal(!openDeleteModal);
  const handleEditModal = () => setOpenEditModal(!openEditModal);

  return (
    <>
      {allUsers ? (
        <StyledTable columns={columns}>
          {allUsers.length > 0 ? (
            allUsers?.map(userData =>
              userAction.userId !== userData.userId ? (
                <TableRow key={userData.userId}>
                  <TableCell>{userData.name}</TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.permission}</TableCell>
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
          error fetching all users
        </Typography>
      ) : (
        <TableSkeleton columns={columns} />
      )}

      {userData ? (
        <>
          <UserEditModal
            fetchData={fetchData}
            open={openEditModal}
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

export default AllUsersTable;
