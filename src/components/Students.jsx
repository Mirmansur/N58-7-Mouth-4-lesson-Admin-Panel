import { useState, useEffect } from "react";
import axios from "axios";
import {
  styled,
  createTheme,
  ThemeProvider,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import { mainListItems } from "./ListItems";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTeacherFirstName, setNewTeacherFirstName] = useState("");
  const [newTeacherLastName, setNewTeacherLastName] = useState("");
  const [newTeacherGroup, setNewTeacherGroup] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/name`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (teacherId) => {
    const teacher = data.find((t) => t.id === teacherId);
    setSelectedTeacher(teacher);
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:3000/name/${selectedTeacher.id}`, selectedTeacher)
      .then(() => {
        fetchData();
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
      });
  };

  const handleDelete = (teacherId) => {
    const teacher = data.find((t) => t.id === teacherId);
    setSelectedTeacher(teacher);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://localhost:3000/name/${selectedTeacher.id}`)
      .then(() => {
        fetchData();
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting teacher:", error);
      });
  };

  const handleAddTeacher = () => {
    const newTeacher = {
      firstName: newTeacherFirstName,
      lastName: newTeacherLastName,
      group: newTeacherGroup,
    };

    axios
      .post(`http://localhost:3000/name`, newTeacher)
      .then(() => {
        fetchData();
        setAddModalOpen(false);
        setNewTeacherFirstName("");
        setNewTeacherLastName("");
        setNewTeacherGroup("");
      })
      .catch((error) => {
        console.error("Error adding teacher:", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Students Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Link to="/fill">
                  {" "}
                  <PersonIcon />
                </Link>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 20, mb: 4 }}>
            <Grid container spacing={0}>
              <Stack spacing={0} direction="row">
                <Stack sx={{ mt: -17, mb: 4 }} width={700}>
                  <TextField
                    label="Search"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Stack>
                <Stack width={200} sx={{ mt: -17, mb: 4, ml: 3 }}>
                  <TextField
                    label="Group"
                    select
                    fullWidth
                    size="small"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="N58">N58</MenuItem>
                    <MenuItem value="N30">N30</MenuItem>
                    <MenuItem value="N52">N52</MenuItem>
                  </TextField>
                </Stack>
                <Stack sx={{ mt: -17, mb: 4, ml: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setAddModalOpen(true)}
                  >
                    Add Students
                  </Button>
                </Stack>
              </Stack>
              <Stack>
                <Table
                  className="tableALLL"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 1100 }}
                      size="medium"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">First Name</TableCell>
                          <TableCell align="center">Last Name</TableCell>
                          <TableCell align="center">Group</TableCell>
                          <TableCell align="center">Edit</TableCell>
                          <TableCell align="center">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          ?.filter((teacher) =>
                            teacher.firstName
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          ?.filter((teacher) =>
                            selectedGroup === "All"
                              ? true
                              : teacher.group === selectedGroup
                          )
                          ?.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="center">
                                {row.firstName}
                              </TableCell>
                              <TableCell align="center">
                                {row.lastName}
                              </TableCell>
                              <TableCell align="center">{row.group}</TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleEdit(row.id)}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(row.id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Table>
              </Stack>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Students</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={selectedTeacher ? selectedTeacher.firstName : ""}
            onChange={(e) =>
              setSelectedTeacher({
                ...selectedTeacher,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={selectedTeacher ? selectedTeacher.lastName : ""}
            onChange={(e) =>
              setSelectedTeacher({
                ...selectedTeacher,
                lastName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="group"
            label="Group"
            type="text"
            fullWidth
            value={selectedTeacher ? selectedTeacher.group : ""}
            onChange={(e) =>
              setSelectedTeacher({
                ...selectedTeacher,
                group: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete {selectedTeacher?.firstName}{" "}
            {selectedTeacher?.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <DialogTitle>Add New Students</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newTeacherFirstName"
            label="First Name"
            type="text"
            fullWidth
            value={newTeacherFirstName}
            onChange={(e) => setNewTeacherFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="newTeacherLastName"
            label="Last Name"
            type="text"
            fullWidth
            value={newTeacherLastName}
            onChange={(e) => setNewTeacherLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="newStudentGroup"
            label="Group"
            type="text"
            fullWidth
            value={newTeacherGroup}
            onChange={(e) => setNewTeacherGroup(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTeacher} color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Dashboard;
