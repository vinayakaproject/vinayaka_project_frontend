import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import supabaseClient from '../../utils/supabaseClient';
import avatar from '../../avatar.jpg';
import { useGlobalContext } from '../../utils/context';
import logo from '../../assets/Logo.png';

const navigations = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

const Header = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const signOut = async () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('allOrders');
    await supabaseClient.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-black text-white body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={'/'}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-20 object-contain"
            style={{ paddingLeft: '35px' }}
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto text-white flex flex-wrap items-center text-base justify-center">
          {navigations.map((navigation) => (
            <Link
              key={navigation.name}
              to={navigation.path}
              className="font-bold mr-5 hover:text-white relative group text-lg"
            >
              {navigation.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          ))}
          {!user && (
            <Link
              to={'/login'}
              className="font-bold mr-5 hover:text-white relative group text-lg"
            >
              Login
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          )}
        </nav>
        <div className='flex gap-2'>
          <Link
            to={'/cart'}
            className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0"
          >
            Go to Cart
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {user && (
            <Menu>
              <MenuButton
                cursor={'pointer'}
                className="mt-3 lg:mt-0 md:mt-0"
                as={Avatar}
                src={avatar}
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/orders')}>
                  <p className='text-black'>Orders</p>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <p className='text-black'>Logout</p>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;