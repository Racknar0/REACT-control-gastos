import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
}) => {
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido');

            return;
        }
        setMensaje('');
        setIsValidPresupuesto(true);
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                        value={presupuesto}
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Agrega tu presupuesto"
                    />
                </div>

                <input className="button" type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
