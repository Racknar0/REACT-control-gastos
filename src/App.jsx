import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos.jsx';
import Modal from './components/Modal.jsx';

import { generarId } from './helpers/index';

import IconoNuevoGasto from './img/nuevo-gasto.svg';


const App = () => {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [gastos, setGastos] = useState(
        JSON.parse(localStorage.getItem('gastos')) ?? []
    );

    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal , setModal] = useState(false);
    const [animarModal , setAnimarModal] = useState(false);
    
    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro , setFiltro] = useState('');
    const [gastosFiltrados , setGastosFiltrados] = useState([]);

    useEffect(() => {

        if (Object.keys(gastoEditar).length > 0) {
            setModal(true)
    
            setTimeout(() => {
                setAnimarModal(true)
            }, 500);
        }

    }, [gastoEditar]);



    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);


    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);


    useEffect(() => {
        if(filtro) {
            // Filtrar gastos por categoria
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);


    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);




    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true) 
        }, 500);

    }

    const guardarGasto = gasto => {
        if (gasto.id) {
            //Actualizar
            const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
            setGastoEditar({});

        } else {
            //Agregar
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id);
        console.log(gastosActualizados);
        setGastos(gastosActualizados);
        
    }


    /* console.log(gastos);
 */
    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                <main>
                    <Filtros 
                        filtro={filtro}
                        setFiltro={setFiltro}
                    />
                    <ListadoGastos 
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                    />
                </main>
                <div className="nuevo-gasto">
                    <img
                        src={IconoNuevoGasto}
                        alt="Nuevo Gastos"
                        onClick={handleNuevoGasto}
                    />
                </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
};

export default App;
