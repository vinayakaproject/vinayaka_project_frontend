import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Button,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import supabaseClient from '../../utils/supabaseClient';
import avatar from '../../avatar.jpg';
import { useGlobalContext } from '../../utils/context';
import logo from '../../assets/Logo.png';
import audioFile from '../../assets/audios/bgmusic.mpeg';
import { useFeatureFlagEnabled } from 'posthog-js/react';

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
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [musicMuted, setMusicMuted] = useState(false);

  const flagEnabled = useFeatureFlagEnabled('auto-music');

  const signOut = async () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('allOrders');
    await supabaseClient.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const toggleMute = () => {
    setMusicMuted(!musicMuted);
  };

  useEffect(() => {
    // Start playing the audio automatically when the component mounts
    !flagEnabled && setMusicPlaying(true);
  }, []);

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
              className="mr-5 hover:text-white relative group"
            >
              {navigation.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          ))}
          {!user && (
            <Link
              to={'/login'}
              className="mr-5 hover:text-white relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform transform scale-x-0 group-hover:scale-x-100"></span>
            </Link>
          )}
        </nav>
        <Flex direction={'row'} gap={4}>
          {!flagEnabled && (
            <div
              onClick={toggleMute}
              className={`inline-flex items-center text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0 cursor-pointer ${
                musicMuted
                  ? 'bg-red-500 hover:bg-red-700'
                  : 'bg-blue-500 hover:bg-blue-700'
              }`}
              size="md"
            >
              {musicMuted ? 'Unmute Music' : 'Mute Music'}
            </div>
          )}
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
                <MenuGroup title={'User - ' + user.email}>
                  <MenuItem onClick={() => navigate('/orders')}>
                    Orders
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </div>
    </header>
  );
};

export default Header;
