import React, {FC} from 'react'

interface Route {
    label: string;
    href: string;
    icon: FC
  } 

function NavLink({route}) {

  return (
    <div className='flex items-center justify-center'>
        <div className='text-green-500'>{route.icon}</div>
        <p className='text-white'>{route.label}</p>
    </div>
  )
}

export default NavLink