import React, { useEffect, useState, useMemo } from "react";
import { Card, Button } from "@mui/material";
import { Label, MoreVert } from "@mui/icons-material";
import { connect } from "react-redux";

import {
  getAllAdmins,
  handleActivateDeactivateAdmin,
} from "../../firebaseActions/dataServices";
import { DataTable } from "./Table";
import { ActionsMenu } from "./ActionsMenu";
import ActionsDialog from "./Dialog";

const getAdminStatus = (status) => {
  const mapping = {
    active: "Active",
    inactive: "Disabled",
    pending: "Pending Approval",
  };

  return mapping[status] || "";
};

const getAdminStatusColor = (status) => {
  const mapping = {
    active: "#2e7d32",
    inactive: "#d32f2f",
    pending: "#ed6c02",
  };

  return mapping[status] || "auto";
};

function AdminsPage({ user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAdmins = () => {
    setLoading(true);
    getAllAdmins(user.userInfo)
      .then(setData)
      .finally(() => setLoading(false));
  };
  const handleClose = () => {
    setSelectedUser(null);
    setShowDialog(false);
  };

  const handleActivateDeactivate = async () => {
    await handleActivateDeactivateAdmin(selectedUser);
    await getAdmins();
    handleClose();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        sortable: true,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        Cell: ({ row }) => {
          return (
            <strong style={{ color: getAdminStatusColor(row.original.status) }}>
              {getAdminStatus(row.original.status)}
            </strong>
          );
        },
      },
      {
        Header: "Last Login",
        accessor: "lastLogin",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const newStatus =
            row.original.status == "active" ? "Deactivate" : "Activate";
          return (
            <ActionsMenu
              label={newStatus}
              onClick={() => {
                setSelectedUser(row.original);
                setShowDialog(true);
              }}
            >
              <MoreVert/>
            </ActionsMenu>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div>
      <h2>Alumnae Portal Admins</h2>
      <DataTable columns={columns} data={data} loading={loading} />
      <ActionsDialog
        open={showDialog}
        handleClose={handleClose}
        onAccept={handleActivateDeactivate}
        onReject={handleClose}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AdminsPage);
