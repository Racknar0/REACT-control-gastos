import React from 'react'
import { useEffect, useState } from 'react';

const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);



    useEffect(() => {
        const totalGastado = gastos.reduce((acumulador, gasto) => {
            return acumulador + gasto.cantidad;
        }, 0);

        setGastado(totalGastado);
    }, [gastos]);



    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <p>Grafica Aqui</p>

        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
