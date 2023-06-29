import { Card } from '../../components/base';
import style from './style.module.css';
import { IonIcon } from '@ionic/react';
import { analyticsOutline, cameraOutline, documentTextOutline, documentOutline, timeOutline } from 'ionicons/icons';
import { CardThemeWithoutGap } from '../../components/base/Card';

const Home = () => {
  return (
    <>
      <Card>
        <div className={style['greeting-text-layout']}>
          <div className={style['greeting-text-section']}>
            <p className={style['greeting-text']}>Selamat Siang</p>
            <p className={style['greeting-username']}>Arya Irama Wahono</p>
          </div>
          <div className={style['greeting-text-section']}>
            <div className={style['working-hours']}>Jam Kerja</div>
            <div className={style['working-hours-text']}>06:30:00 - 16:30:00</div>
          </div>
        </div>
        <Card.Divider></Card.Divider>
        <div className={style['list-menu-layout']}>
          <div className={style['list-menu']}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#1b90de]`} icon={cameraOutline}></IonIcon>
            <p>Absensi</p>
          </div>
          <div className={style['list-menu']}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#FFB400]`} icon={documentOutline}></IonIcon>
            <p>Izin</p>
          </div>
          <div className={style['list-menu']}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#1b90de]`} icon={timeOutline}></IonIcon>
            <p>Lembur</p>
          </div>
          <div className={style['list-menu']}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#754AED]`} icon={analyticsOutline}></IonIcon>
            <p>Laporan Pekerjaan</p>
          </div>
          <div className={style['list-menu']}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#1DCC70]`} icon={documentTextOutline}></IonIcon>
            <p>HIstory</p>
          </div>
        </div>
      </Card>
      <div className={style['status-attendance-layout']}>
        <Card theme={CardThemeWithoutGap} className={`${style['status-attendance-card']} bg-[#1b90de]`}>
          <p className={style['status-attendance-card-label']}>Absen Masuk</p>
          <p className={style['status-attendance-card-value']}>Belum Absen</p>
        </Card>
        <Card theme={CardThemeWithoutGap} className={`${style['status-attendance-card']} bg-[#8494A8]`}>
          <p className={style['status-attendance-card-label']}>Absen Pulang</p>
          <p className={style['status-attendance-card-value']}>Belum Absen</p>
        </Card>
      </div>
    </>
  );
};

export default Home;
