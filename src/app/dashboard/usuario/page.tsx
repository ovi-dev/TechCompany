import React from 'react'

import LoginModal from '@/components/auth/LoginForm';

export const metadata = {
 title: 'Usuarios',
 description: 'Usuarios',
};

const Usuario = () => {
  return (
    <div>
      <LoginModal/>
    </div>
  )
}

export default Usuario
