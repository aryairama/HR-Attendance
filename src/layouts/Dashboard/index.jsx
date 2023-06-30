import { Outlet } from 'react-router-dom';
import style from './style.module.css';
import { Dropdown } from 'flowbite';
import { useEffect } from 'react';
// import PropTypes from 'prop-types';
import iconBrand from '../../assets/icons/hrattendance.png';
import { IonIcon } from '@ionic/react';
import { homeOutline, cameraOutline, calendarOutline, documentTextOutline, personOutline } from 'ionicons/icons';
import { useNavigate, useLoaderData } from 'react-router-dom';
import iconUser from '../../assets/icons/default-profile.png';

const DashboardLayout = () => {
  const authData = useLoaderData();
  const navigate = useNavigate();
  const handlerLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  useEffect(() => {
    new Dropdown(document.getElementById('user-dropdown'), document.getElementById('user-menu-button'));
  }, []);
  return (
    <div className={style['main-wrapper']}>
      {/* <div className={style['sidebar']}></div> */}
      <nav className="bg-[#1b90de] border-gray-200 fixed w-full z-50">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="items-center justify-between flex w-auto " id="mobile-menu-2">
            <ul className="flex flex-col font-medium rounded-lg bg-transparent md:flex-row space-x-8">
              <li className="w-6 h-6"></li>
            </ul>
          </div>
          <a className="flex items-center" onClick={() => navigate('/dashboard')}>
            <img src={iconBrand} className="h-8 mr-3" alt="hrattendance-logo" />
          </a>
          <div className="flex items-center ">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 "
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={iconUser} alt="user photo" />
            </button>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {authData.first_name} {authData.last_name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={handlerLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Keluar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className={style['main']}>
        <div className={style['main-divider']}></div>
        <div className={style['main-content']}>
          <Outlet context={[authData]} />
        </div>
      </div>
      <div className={style['main-footer']}>
        <div className={style['main-footer-content']} onClick={() => navigate('/dashboard')}>
          <IonIcon className="text-2xl" icon={homeOutline}></IonIcon>
          <p>Home</p>
        </div>
        <div className={style['main-footer-content']} onClick={() => navigate('/absent')}>
          <IonIcon className="text-2xl" icon={cameraOutline}></IonIcon>
          <p>Absen</p>
        </div>
        <div className={style['main-footer-content']} onClick={() => navigate('/leave')}>
          <IonIcon className="text-2xl" icon={calendarOutline}></IonIcon>
          <p>Cuti</p>
        </div>
        <div className={style['main-footer-content']}>
          <IonIcon className="text-2xl" icon={documentTextOutline}></IonIcon>
          <p>History</p>
        </div>
        <div className={style['main-footer-content']}>
          <IonIcon className="text-2xl" icon={personOutline}></IonIcon>
          <p>Profil</p>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {};

export default DashboardLayout;
