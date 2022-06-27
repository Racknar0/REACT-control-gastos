import React from 'react'
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);


    useEffect(() => {
        const totalGastado = gastos.reduce((acumulador, gasto) => {
            return acumulador + gasto.cantidad;
        }, 0);

        const totalDisponible = presupuesto - totalGastado;
        //Calculo el porcentaje
        const porcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100;
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout(() => {
            setPorcentaje(porcentaje);
        }, 1000);

    }, [gastos]);



    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <CircularProgressbar 
            value={porcentaje}
            text={`${porcentaje.toFixed(2)}% Gastado`}
            styles={buildStyles({
                pathColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor : '#F5F5F5',
                textColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
            })}
        />

        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
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
