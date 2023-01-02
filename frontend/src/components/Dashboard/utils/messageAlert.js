import axios from "axios";
import Swal from "sweetalert2";

const messageDelete = (props) => {
  const { url, objectData, refresh, name, letterA } = props;

  Swal.fire({
    title: `¿Desea eliminar ${
      letterA ? "esta" : "este"
    } ${name.toLowerCase()}?`,
    text: "Recuerde que una vez eliminado el registro no podrá recuperar los datos",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Si, ${
      letterA ? "Elimínala" : "Elimínalo"
    }`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(url, { data: objectData }).then(({ data }) => {
        const { results } = data;
        if (results.affectedRows === 1) {
          Swal.fire({
            icon: "success",
            title: "Ok",
            text: `${name} ha sido ${
              letterA ? "eliminada" : "eliminado"
            } correctamente`,
          });
          refresh();
        }

        if (results.errno) {
          Swal.fire({
            icon: "warning",
            title: "Atención",
            text: `No es posible eliminar ${
              letterA ? "esta" : "este"
            } ${name.toLowerCase()}, está vinculado con registros existentes`,
          });
        }
      });
    }
  });
};

const messageSave = (config) => {
  const { url, objectData, reset, refresh, name, letterA } = config;
  let minName = name.toLowerCase();
  Swal.fire({
    title: `¿Desea guardar ${letterA ? "esta" : "este"} ${minName} ?`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Guardalo!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(url, objectData).then(({ data }) => {
        if (data.status) {
          return Swal.fire({
            icon: "success",
            title: "OK",
            text: `${name} ha sido ${
              letterA ? "guardada" : "guardado"
            } correctamente`,
          }).then((ok) => {
            if (ok.isConfirmed || ok.isDismissed) {
              refresh();
              reset();
            }
          });
        }
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: data.error,
        });
      });
    }
  });
};

const messageUpdate = (config) => {
  const { url, objectData, reset, refresh, name, letterA } = config;
  let minName = name.toLowerCase();
  Swal.fire({
    title: `¿Desea modificar ${letterA ? "esta" : "este"} ${minName} ?`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Modificalo!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.put(url, objectData).then(({ data }) => {
        if (data.status) {
          return Swal.fire({
            icon: "success",
            title: "OK",
            text: `${name} ha sido ${
              letterA ? "modificada" : "modificado"
            } correctamente`,
          }).then((ok) => {
            if (ok.isConfirmed || ok.isDismissed) {
              refresh();
              reset();
            }
          });
        }
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: data.error,
        });
      });
    }
  });
};

export { messageDelete, messageSave, messageUpdate };
