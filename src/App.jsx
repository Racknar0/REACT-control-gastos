import React from 'react';
import { useState } from 'react';
import Header from './components/Header.jsx';
import ListadoGastos from './components/ListadoGastos.jsx';
import Modal from './components/Modal.jsx';

import { generarId } from './helpers/index';

import IconoNuevoGasto from './img/nuevo-gasto.svg';

const App = () => {
    const [presupuesto, setPresupuesto] = useState(0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

    const [modal , setModal] = useState(false);
    const [animarModal , setAnimarModal] = useState(false);

    const [gastos, setGastos] = useState([]);

    const handleNuevoGasto = () => {
        setModal(true)

        setTimeout(() => {
            setAnimarModal(true)
        }, 500);

    }

    const guardarGasto = gasto => {
        gasto.id = generarId();
        gasto.fecha = Date.now();

        setGastos([...gastos, gasto]);
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    /* console.log(gastos);
 */
    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                <main>
                    <ListadoGastos 
                    gastos={gastos}
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
                />
            )}
        </div>
    );
};

export default App;
