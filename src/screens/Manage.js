import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { fetch, deleteData } from "../apis/index";
import EditModal from "./EditModal";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./Manage.css";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  mainBox: {
    height: "80vh",
    flexDirection: "column",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTable: {
    width: 650,
  },
  hand: {
    cursor: "pointer",
  },
});

const Manage = () => {
  const classes = useStyles();
  const [showModal, setshowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const FetchAPI = async () => {
      const data = setData(await fetch());
    };
    FetchAPI();
  }, []);
  const showEditModal = (data) => {
    setshowModal(true);
    setModalData(data);
  };
  const closeModal = () => {
    setshowModal(false);
  };
  const openModal = () => {
    setshowModal(true);
  };
  const deleteContent = async (id) => {
    const data = await deleteData(id);
    window.location.reload();
  };
  const emptyModal = () => {
    setModalData({ t: "s" });
    setshowModal(true);
  };
  return (
    <div className={classes.mainBox}>
      <Button
        variant="contained"
        onClick={emptyModal}
        style={{ float: "right" }}
      >
        New Company
      </Button>
      <Table aria-label="simple table" className="respTable">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Company Name</b>
            </TableCell>
            <TableCell align="right" className={classes.hand}>
              <b>Edit</b>
            </TableCell>
            <TableCell align="right" className={classes.hand}>
              <b>Delete</b>
            </TableCell>
            <TableCell align="right" className={classes.hand}>
              <b>View</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {item.CompanyName}
              </TableCell>
              <TableCell align="right">
                <FaEdit
                  className={classes.hand}
                  onClick={() => showEditModal(item)}
                />
              </TableCell>
              <TableCell align="right">
                <FaTrashAlt
                  className={classes.hand}
                  onClick={() => deleteContent(item._id)}
                />
              </TableCell>
              <TableCell align="right">
                <Link
                  to={{ pathname: `reviews/${encodeURI(item.CompanyName)}` }}
                >
                  <FaEye className={classes.hand} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal data={modalData} close={setshowModal} show={showModal} />
    </div>
  );
};
export default Manage;
