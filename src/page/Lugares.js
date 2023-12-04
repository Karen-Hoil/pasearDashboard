// import {useState, useEffect} from 'react'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/header'
// import axios from 'axios';

// function Lugares() {
//   const id_user = window.location.href.split("/")[4];
//   const [lugares,setLugares] =useState([]);
//     const [lugar, setLugar] = useState('');
//     const [imagen, setImagen] = useState('')

//     useEffect(()=>{
//         axios.get('http://localhost:3001/lugares')
//         .then(respuesta=>{
//             setLugares(respuesta.data.listaLugares);
//         })
//         .catch(error=> console.error(error));
//     },[])

//     const add = async(event)=>{
//         event.preventDefault();
//         await axios.post('http://localhost:3001/lugares',{
//           lugares: lugar,
//           imagen: imagen
//         }).then(()=>{
//           console.log("Lugar registrado")
//         })
//       }

//       const actualizar = async () => {
//         await axios.post('http://localhost:3001/lugares',{

//         id_lugar:id_user,
//         lugares:lugar,
//         imagen:imagen, 
//         }).then(()=>{
//           console.log("Update con exito!!")
//         })
        
//       }
    
//   return (
//     <>
//     <div style={{ display: 'flex' }}>
//         <Sidebar />
//         <Header />
//       </div>
//       <div style={{ marginLeft: '300px', marginRight:30}}>
//         <h1 style={{marginTop:20}}>Lugares</h1>
//         <form>
//           <label class="form-label">Lugar:</label>
//           <input type="text" class="form-control" placeholder="Inserta nuevo lugar" onChange={(event)=>{
//             setLugar(event.target.value)}}/>
//           <label class="form-label">Imagen:</label>
//           <input type="text" class="form-control" placeholder="Inserta el url de la imagen" onChange={(event)=>{
//             setImagen(event.target.value)
//           }}/>
//           <button class="btn btn-outline-success" style={{marginTop:20}} onClick={add}>Guardar</button>
//         </form>
//       <table className="data-table" style={{marginTop:40}}>
//       <thead>
//         <tr>
//           <th>Lugar</th>
//           <th style={{width:200}}>Imagen</th>
//           <th>Funciones</th>
//         </tr>
//       </thead>
//       <tbody>
//       {lugares.map(lugar => (
//           <tr>
//             <td>{lugar.lugares}</td>
//             <td style={{ width: 200 }}><img
//             src={lugar.imagen}
//             alt={`Imagen de ${lugar.lugares}`}
//             style={{ maxWidth: '100%', height: 'auto' }}
//           /></td>
//             <td>
//               <button class="btn btn-outline-primary" style={{marginLeft:20, marginRight:40}} data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
//               <button class="btn btn-outline-danger">Eliminar</button>
//             </td>
//           </tr>
//           ))}
//       </tbody>
//     </table>
//         </div>
//         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Lugar</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//       <form>
//           <label class="form-label">Lugar:</label>
//           <input type="text" class="form-control" placeholder="Inserta nuevo lugar"/>
//           <label class="form-label">Imagen:</label>
//           <input type="text" class="form-control" placeholder="Inserta el url de la imagen"/>
//           <button style={{marginTop:20, marginRight:20}} type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
//           <button style={{marginTop:20}} type="button" class="btn btn-outline-primary" data-bs-dismiss="modal" onClick={actualizar()}>Actualizar</button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   )
// }

// export default Lugares
