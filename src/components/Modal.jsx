import { useState } from 'react';
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState(0);



    const ocultarModal = () => {  
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);

    }

  return (
    <div className="modal">
     <div className="cerrar-modal">
         <img src={CerrarBtn} alt="Cerrar Modal" onClick={ocultarModal}/>
     </div>
     
        <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>Nuevo Gasto</legend>

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id='nombre'
                    type="text" 
                    placeholder='Añadir Nombre de Gasto'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    id='cantidad'
                    type="number" 
                    placeholder='Añadir Cantidad de Gasto ej: 100'
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Categoría</label>
                <select
                    id='categoria'
                    value={categoria}
                    onChange={(e) => setCategoria(Number(e.target.value))}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>

            </div>

            <input type="submit"
                value="Añadir Gasto"
            />

        </form>

    </div>
  )
}

export default Modal
