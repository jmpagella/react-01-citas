import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, actualizarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    actualizarCitas([
      ...citas,
      cita
    ])
  }

  // Funcion que elimine una cita
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    actualizarCitas(nuevasCitas);
  }

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
    
      <div className="container">
        <div className="row">

          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>

          <div className="one-half column">
            <h2>
              { citas.length === 0 ? 'No hay citas' : 'Administra tus citas' }
            </h2>

            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
