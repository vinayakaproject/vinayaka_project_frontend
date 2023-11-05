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
import logo from '../../assets/Logo.png'; // Import your logo image
import audioFile from '../../assets/audios/bgmusic.mpeg';
import { useFeatureFlagEnabled } from 'posthog-js/react';

const navigations = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Contact',
    path: '/contact'
  }
]

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
  }

  const toggleMute = () => {
    setMusicMuted(!musicMuted);
  };

  useEffect(() => {
    const audioPlayer = new Audio(audioFile);

    audioPlayer.loop = true;
    audioPlayer.volume = musicMuted ? 0 : 1;

    if (musicPlaying && !musicMuted) {
      audioPlayer.play().catch(error => {
        console.error('Failed to start audio playback:', error);
      });
    } else {
      audioPlayer.pause();
    }

    return () => {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    };
  }, [musicPlaying, musicMuted]);

  useEffect(() => {
    // Start playing the audio automatically when the component mounts
    flagEnabled && setMusicPlaying(true);
  }, []);

  return (
    <header className="bg-black text-gray-600 body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-20 object-contain"
            style={{ paddingLeft: '35px' }}
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto text-white flex flex-wrap items-center text-base justify-center">
          {/* Previous navigation elements */}
          {
            navigations.map((navigation) => {
              return (
                <Link to={navigation.path} key={navigation.name} className="mr-5 hover:text-white">{navigation.name}</Link>
              )
            })
          }
          {!user && <Link to={'/login'} className="mr-5 hover:text-white">Login</Link>}
        </nav>
        <Flex direction={'row'} gap={4}>
          {/* Rest of the code... */}
          {
            flagEnabled && 
            <div
              onClick={toggleMute}
              className={`inline-flex items-center text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0 cursor-pointer ${musicMuted ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"}`}
              size="md"
            >
              {musicMuted ? "Unmute Music" : "Mute Music"}
            </div>
          }
          {/* Rest of the code... */}
          <Link to={'/cart'} className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0">Go to Cart
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {
            user && 
            <Menu>
              <MenuButton cursor={'pointer'} className="mt-3 lg:mt-0 md:mt-0" as={Avatar} src={avatar}>
              </MenuButton>
              <MenuList>
                <MenuGroup title={'User - ' +user.email}>
                  <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          }
        </Flex>
      </div>
    </header>
  );
};

export default Header;