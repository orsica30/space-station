import {
  Button,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Nave } from "../models/Nave";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";

// Estilo para modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const validationSchema = yup.object({
  nombre: yup.string().required("Ingresa el nombre"),
  peso: yup.number().required("Ingresa el peso"),
  empuje: yup.number().required("Ingresa el empuje"),
  combustible: yup.string().required("Ingresa el combustible"),
  pais: yup.string().required("Ingresa el pais"),
  tipo: yup.string().required("Selecciona un tipo de vehículo"),
});

const App = () => {
  // Hook para abrir modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  // Hook de arreglo vacio para agregar vehículos
  const [rows, setRows] = useState([]);

  // Hook para filtrar en el arreglo.
  const [filter, setFilter] = useState("");
  // Función
  let handleFilter = (e) => {
    setFilter(e.target.value);
  };
  

  // Arreglo de objetos para el selecter de tipo vehículo.
  const models = [
    {
      id: 1,
      value: "Vehículo Lanzadera",
      label: "Vehículo Lanzadera",
    },
    {
      id: 2,
      value: "Naves espaciales no tripuladas",
      label: "Naves espaciales no tripuladas",
    },
    {
      id: 3,
      value: "Naves espaciales tripuladas",
      label: "Naves espaciales tripuladas",
    },
  ];

  // Arreglo de objetos para el selecter país.
  const paises = [
    {
      value: "EE.UU.",
      label: "EE.UU.",
    },
    {
      value: "Europa",
      label: "Europa",
    },
    {
      value: "Japón",
      label: "Japón",
    },
    {
      value: "China",
      label: "China",
    },
    {
      value: "Unión Soviética",
      label: "Unión Soviética",
    },
  ];

  // Función que recibe las datos para agregarlos en un arreglo vacío
  // y finalmente ese arreglo devolverlo en el arreglo principal vacío.
  let formatRows = (rows) => {
    let arregloFormateado = [];

    rows.map((x) => {
      let nuevaNave = new Nave(
        x.tipo,
        x.nombre,
        x.peso,
        x.empuje,
        x.combustible,
        x.pais
      );
      arregloFormateado.push(nuevaNave);
    });
    return setRows(arregloFormateado);
  };

  useEffect(() => {
    axios
      .get(`/nave/obtener`)
      .then((res) => {
        const { ok, msg, rows } = res.data;

        if (ok) {
          formatRows(rows);
          Swal.fire({
            icon: "info",
            title: msg,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!1",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!2",
        });
      });
  }, []);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      nombre: "",
      peso: "",
      empuje: "",
      combustible: "",
      pais: "",
      tipo: "",
    },
    validationSchema: validationSchema, //Se le pasa la costante de formato de cada campo
    onSubmit: (values, { resetForm }) => {
      //Si llega acá es porque pasó todas las validaciones, le enviamos los values
      //de cada campo en el formulario, se obtienen con el nombre de cada campo.
      
      addValues(values);
      resetForm();      
    },
  });

  // Función que agregar valores a la base de dato.
  let addValues = (values) => {
    const payload = {
      tipo: values.tipo,
      nombre: values.nombre,
      peso: values.peso,
      empuje: values.empuje,
      combustible: values.combustible,
      pais: values.pais,
    };

    axios
      .post(`/nave/guardar`, payload)
      .then((res) => {
        const { ok, msg } = res.data;
        if (ok) {
          Swal.fire({
            icon: "success",
            title: msg,
          });

          // Se agrega a la tabla.

          let naveDinamica = new Nave(
            values.tipo,
            values.nombre,
            values.peso,
            values.empuje,
            values.combustible,
            values.pais
          );
          setOpen(false);
          setRows([...rows, naveDinamica]);
        } else {
          Swal.fire({
            icon: "error",
            title: msg,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Algo salió mal.",
        });
      });
  };

  return (
    <>
      <Header filter={filter} handleFilter={handleFilter} />

      {/* Body */}
      <Container>
        <Grid item xs={12}>
          {/*Modal con inputs y buttons  */}
          <Grid item xs={12} marginTop={4} >
            <Grid textAlign="center">
              <Button
                variant='text'
                color='inherit'
                fullWidth
                sx={{ color: "#232223" }}
                onClick={handleOpen}
                endIcon={<AddCircleRoundedIcon />}
              >
                <Typography variant="h6">Agregar nave</Typography>
              </Button>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* Titulo del modal */}
                <Grid textAlign="center" marginBottom={2}>
                  <Typography variant="h6">Space Station</Typography>
                </Grid>

                <form onSubmit={formik.handleSubmit}>
                  <Grid container>
                    {/* Input, listado de tipos de vehículo. */}
                    <Grid item xs={12} marginBottom={1}>
                      <TextField
                        id="outlined-select-currency"
                        select
                        name="tipo"
                        label="Seleccione"
                        fullWidth
                        value={formik.values.tipo}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.tipo && Boolean(formik.errors.tipo)
                        }
                        helperText={formik.touched.tipo && formik.errors.tipo}
                      >
                        {models.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid container justifyContent="space-around">
                      {/* Input, nombre */}
                      <Grid item xs={5.9}>
                        <TextField
                          id="outlined-basic"
                          label="Nombre"
                          variant="outlined"
                          fullWidth
                          autoComplete="off"
                          name="nombre"
                          value={formik.values.nombre}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.nombre &&
                            Boolean(formik.errors.nombre)
                          }
                          helperText={
                            formik.touched.nombre && formik.errors.nombre
                          }
                        />
                      </Grid>
                      {/* Input, peso. */}
                      <Grid item xs={5.9}>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          label="Peso"
                          variant="outlined"
                          fullWidth
                          autoComplete="off"
                          name="peso"
                          value={formik.values.peso}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.peso && Boolean(formik.errors.peso)
                          }
                          helperText={formik.touched.peso && formik.errors.peso}
                        />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="space-around" marginTop={1}>
                      {/* Input, Empuje */}
                      <Grid item xs={5.9}>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          label="Empuje"
                          variant="outlined"
                          fullWidth
                          autoComplete="off"
                          name="empuje"
                          value={formik.values.empuje}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.empuje &&
                            Boolean(formik.errors.empuje)
                          }
                          helperText={
                            formik.touched.empuje && formik.errors.empuje
                          }
                        />
                      </Grid>
                      {/* Input, Combustible. */}
                      <Grid item xs={5.9}>
                        <TextField
                          id="outlined-basic"
                          label="Combustible"
                          variant="outlined"
                          fullWidth
                          autoComplete="off"
                          name="combustible"
                          value={formik.values.combustible}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.combustible &&
                            Boolean(formik.errors.combustible)
                          }
                          helperText={
                            formik.touched.combustible &&
                            formik.errors.combustible
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container marginTop={1}>
                      {/* Input, Pais */}
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-select-currency"
                          select
                          name="pais"
                          label="País"
                          fullWidth
                          value={formik.values.pais}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.pais && Boolean(formik.errors.pais)
                          }
                          helperText={formik.touched.pais && formik.errors.pais}
                        >
                          {paises.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-between"
                      marginTop={6}
                    >
                      {/* Botones guardar, limpiar y salir. */}
                      <Grid item xs={5.9}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="success"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      </Grid>
                      <Grid item xs={5.9}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="warning"
                          onClick={formik.resetForm}
                        >
                          Limpiar
                        </Button>
                      </Grid>
                      <Grid item xs={12} marginTop={1}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="inherit"
                          onClick={handleClose}
                        >
                          Salir
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Modal>
          </Grid>
          {/* Visual de tablas. */}
          <Grid item xs={12} >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ background: "#F0F0F1" }}>
                  <TableRow>
                    <TableCell>Tipo de vehículo</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Peso (T)</TableCell>
                    <TableCell align="right">Empuje (T)</TableCell>
                    <TableCell align="right">Combustible</TableCell>
                    <TableCell align="right">Pais</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows
                    .filter((x) => {
                      if (filter == "") {
                        return x;
                      } else if (
                        x.tipo.toLowerCase().includes(filter.toLowerCase()) ||
                        x.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                        x.peso.toString().includes(filter) ||
                        x.empuje.toString().includes(filter) ||
                        x.combustible
                          .toLowerCase()
                          .includes(filter.toLowerCase()) ||
                        x.pais.toLowerCase().includes(filter.toLowerCase())
                      ) {
                        return x;
                      }
                    })
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row._tipo}
                        </TableCell>
                        <TableCell align="right">{row._nombre}</TableCell>
                        <TableCell align="right">{row._peso}</TableCell>
                        <TableCell align="right">{row._empuje}</TableCell>
                        <TableCell align="right">{row._combustible}</TableCell>
                        <TableCell align="right">{row._pais}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
