import RegisterFormClientes from '@/components/clientes/RegisterFormClientes';
import React from 'react'

export const metadata = {
 title: 'Nuevo Cliente',
 description: 'Nuevo Cliente',
};

const NuevoCliente = () => {
  return (
    <div>
      <RegisterFormClientes/>
    </div>
  )
}

export default NuevoCliente
