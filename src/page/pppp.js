import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Appp() {
  const [lugares, setLugares] = useState([]);
  const [lugar, setLugar] = useState("");
  const [imagen, setImagen] = useState("");
  const [editLugar, setEditLugar] = useState(null); // Nuevo estado para almacenar el lugar que se está editando
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [lugarSeleccionadoEditar, setLugarSeleccionadoEditar] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/lugares")
      .then((respuesta) => {
        setLugares(respuesta.data.listaLugares);
      })
      .catch((error) => console.error(error));
  }, []);

  const add = async () => {
    await axios
      .post("http://localhost:3001/lugares", {
        lugares: lugar,
        imagen: imagen,
      })
      .then(() => {
        console.log("Lugar registrado");
        setLugar("");
        setImagen("");
      });
  };
  const handleActualizarLugar = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/lugares/${lugarSeleccionadoEditar.id_lugares}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lugarSeleccionadoEditar),
        }
      );

      if (response.ok) {
        setShowModalEditar(false);
        setLugarSeleccionadoEditar({});
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
    window.location.reload();
  };
  const handleAbrirModalEditar = (lugar) => {
    setLugarSeleccionadoEditar(lugar);
    setShowModalEditar(true);
  };

  const handleEliminarLugar = async (lugar) => {
    try {
      const response = await fetch(
        `http://localhost:3001/lugares/${lugar.id_lugares}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, actualiza el estado de los productos sin el producto eliminado
        const lugaresActualizados = lugar.filter(
          (u) => u.id_lugares !== lugar.id_lugares
        );
        setLugares(lugaresActualizados);
      } else {
        // Maneja el caso en que la solicitud no sea exitosa
        console.error("Error al eliminar el lugar");
      }
    } catch (error) {
      console.error("Error al comunicarse con la API", error);
    }
window.location.reload();
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Header />
      </div>
      <div style={{ marginLeft: "300px", marginRight: 30 }}>
        <h1 style={{ marginTop: 20 }}>Lugares</h1>
        <form>
          <label class="form-label">Lugar:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Inserta nuevo lugar"
            onChange={(event) => {
              setLugar(event.target.value);
            }}
          />
          <label class="form-label">Imagen:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Inserta el url de la imagen"
            onChange={(event) => {
              setImagen(event.target.value);
            }}
          />
          <button
            class="btn btn-outline-success"
            style={{ marginTop: 20 }}
            onClick={add}
          >
            Guardar
          </button>
        </form>
        <table className="data-table" style={{ marginTop: 40 }}>
          <thead>
            <tr>
              <th>Lugar</th>
              <th style={{ width: 200 }}>Imagen</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            {lugares.map((lugar) => (
              <tr>
                <td>{lugar.lugares}</td>
                <td style={{ width: 200 }}>
                  <img
                    src={lugar.imagen}
                    alt={`Imagen de ${lugar.lugares}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </td>
                <td>
                  <button
                    class="btn btn-outline-primary"
                    style={{ marginLeft: 20, marginRight: 40 }}
                   
                    onClick={() => handleAbrirModalEditar(lugar)}
                  >
                    Editar
                  </button>
                  <button class="btn btn-outline-danger"  onClick={() => handleEliminarLugar(lugar)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
      
      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Lugar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleActualizarLugar}>
            <Form.Group className="mb-3">
              <Form.Label>Lugar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lugar"
                value={lugarSeleccionadoEditar.lugares || ""}
                onChange={(event) =>
                  setLugarSeleccionadoEditar({
                    ...lugarSeleccionadoEditar,
                    lugares: event.target.value,
                  })
                }
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="5000"
                value={lugarSeleccionadoEditar.imagen || ""}
                onChange={(event) =>
                  setLugarSeleccionadoEditar({
                    ...lugarSeleccionadoEditar,
                    imagen: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Appp;
