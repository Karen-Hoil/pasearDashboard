import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Admin() {
  const [admin, setAdmin] = useState([])
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [showModalEditar, setShowModalEditar] = useState(false);
  const [adminSeleccionadoEditar, setAdminSeleccionadoEditar] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:3001/usuarios')
        .then(respuesta=>{
            setAdmin(respuesta.data.listaAdmin);
        })
        .catch(error=> console.error(error));
    },[])

    const add = ()=>{
        axios.post('http://localhost:3001/usuarios',{
          usuario: usuario,
          contraseña: contraseña
        }).then(()=>{
          console.log("Usuario registrado")
        })
      }

      const handleActualizarAdmin = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch(
            `http://localhost:3001/usuarios/${adminSeleccionadoEditar.id_usuario}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(adminSeleccionadoEditar),
            }
          );
    
          if (response.ok) {
            setShowModalEditar(false);
            setAdminSeleccionadoEditar({});
          } else {
            console.error("Error al actualizar el admin");
          }
        } catch (error) {
          console.error("Error al comunicarse con la API", error);
        }
        window.location.reload();
      };
      const handleAbrirModalEditar = (usuario) => {
        setAdminSeleccionadoEditar(usuario);
        setShowModalEditar(true);
      };
    
      const handleEliminarAdmin = async (usuario) => {
        try {
          const response = await fetch(
            `http://localhost:3001/usuarios/${usuario.id_usuario}`,
            {
              method: "DELETE",
            }
          );
    
          if (response.ok) {
            // Si la solicitud fue exitosa, actualiza el estado de los productos sin el producto eliminado
            const adminActualizados = usuario.filter(
              (u) => u.id_usuario !== usuario.id_usuario
            );
            setAdmin(adminActualizados);
          } else {
            // Maneja el caso en que la solicitud no sea exitosa
            console.error("Error al eliminar el Admin");
          }
        } catch (error) {
          console.error("Error al comunicarse con la API", error);
        }
    window.location.reload();
      };
  return (
    <>
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <Header />
      </div>
      <div style={{ marginLeft: '300px', marginRight:30}}>
        <h1 style={{marginTop:20}}>Administradores</h1>
        <form>
          <label class="form-label">Usuario:</label>
          <input type="text" class="form-control" placeholder="Inserta nuevo usuario" onChange={(event)=>{
                    setUsuario(event.target.value)
                  }}/>
          <label class="form-label">Contraseña:</label>
          <input type="text" class="form-control" placeholder="Asígnale una contraseña" onChange={(event)=>{
                    setContraseña(event.target.value)
                  }}/>
          <button class="btn btn-outline-success" style={{marginTop:20}} onClick={add}>Guardar</button>
        </form>
      <table className="data-table" style={{marginTop:40}}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody>
      {admin.map(administrador => (
          <tr key={administrador.id_usuario}>
            <td>{administrador.usuario}</td>
            <td>
              <button class="btn btn-outline-primary" style={{marginLeft:20, marginRight:40}} onClick={() => handleAbrirModalEditar(administrador)}>Editar</button>
              <button class="btn btn-outline-danger" onClick={() => handleEliminarAdmin(administrador)}>Eliminar</button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
        </div>
        <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Administradores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleActualizarAdmin}>
            <Form.Group className="mb-3">
              <Form.Label>Administradores</Form.Label>
              <Form.Control
                type="text"
                placeholder="administradores"
                value={adminSeleccionadoEditar.usuario || ""}
                onChange={(event) =>
                  setAdminSeleccionadoEditar({
                    ...adminSeleccionadoEditar,
                    usuario: event.target.value,
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
  )
}

export default Admin
