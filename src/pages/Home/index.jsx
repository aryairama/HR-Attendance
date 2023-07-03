import { Card } from '../../components/base';
// import { Datatable } from '../../components/module';
import style from './style.module.css';
import { IonIcon } from '@ionic/react';
import {
  analyticsOutline,
  cameraOutline,
  documentTextOutline,
  documentOutline,
  timeOutline,
  logIn,
  person,
  sad,
  home,
  calendarOutline,
  constructOutline,
} from 'ionicons/icons';
import { CardThemeWithoutGap, CardThemeFlexRow } from '../../components/base/Card';
import { useHome } from '../../hooks/local';

const Home = () => {
  const { tableListAttendance, listAttendance, navigate, authData, absentSummary } = useHome();
  return (
    <>
      <Card>
        <div className={style['greeting-text-layout']}>
          <div className={style['greeting-text-section']}>
            <p className={style['greeting-text']}>Selamat Siang</p>
            <p className={style['greeting-username']}>
              {authData.first_name} {authData.last_name}
            </p>
          </div>
          <div className={style['greeting-text-section']}>
            <div className={style['working-hours']}>Jam Kerja</div>
            <div className={style['working-hours-text']}>
              {authData.assignment.time_start} - {authData.assignment.time_end}
            </div>
          </div>
        </div>
        <Card.Divider></Card.Divider>
        <div className={style['list-menu-layout']}>
          <div className={style['list-menu']} onClick={() => navigate('/absent')}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#1b90de]`} icon={cameraOutline}></IonIcon>
            <p>Absensi</p>
          </div>
          <div className={style['list-menu']}>
            <IonIcon
              id="permit-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="permit-dropdown"
              data-dropdown-placement="bottom"
              className={`${style['list-menu-icon']} bg-[#FFB400]`}
              icon={documentOutline}
            ></IonIcon>
            <p>Izin</p>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
              id="permit-dropdown"
            >
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li className="flex items-center px-3 gap-1 hover:bg-gray-100" onClick={() => navigate('/permit')}>
                  <IonIcon icon={documentOutline} />
                  <a className="block px-4 py-2 text-sm text-gray-700">Izin</a>
                </li>
                <li className="flex items-center px-3 gap-1 hover:bg-gray-100" onClick={() => navigate('/leave')}>
                  <IonIcon icon={calendarOutline} />
                  <a className="block px-4 py-2 text-sm text-gray-700 ">Cuti</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={style['list-menu']} onClick={() => navigate('/overtime')}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#537b96]`} icon={timeOutline}></IonIcon>
            <p>Lembur</p>
          </div>
          <div className={style['list-menu']} onClick={() => navigate('/user-duties')}>
            <IonIcon className={`${style['list-menu-icon']} bg-[#754AED]`} icon={analyticsOutline}></IonIcon>
            <p>Laporan Pekerjaan</p>
          </div>
          <div className={style['list-menu']} onClick={() => window.open('http://203.176.177.245', '_blank')}>
            <IonIcon className={`${style['list-menu-icon']} bg-red-700`} icon={constructOutline}></IonIcon>
            <p>Stock Opname MAC</p>
          </div>
          <div className={style['list-menu']} onClick={() => navigate('/history')}>
            <IonIcon className={`${style['list-menu-icon']} bg-slate-400`} icon={documentTextOutline}></IonIcon>
            <p>History</p>
          </div>
        </div>
      </Card>
      <div className={style['status-attendance-layout']}>
        <Card
          theme={CardThemeWithoutGap}
          className={`${style['status-attendance-card']} ${
            authData.attendance.clock_in ? 'bg-green-500' : 'bg-gray-700'
          }`}
        >
          <p className={style['status-attendance-card-label']}>Absen Masuk</p>
          <p className={style['status-attendance-card-value']}>
            {authData.attendance.clock_in ? 'Hadir' : 'Belum Clock In'}
          </p>
        </Card>
        <Card
          theme={CardThemeWithoutGap}
          className={`${style['status-attendance-card']} ${
            authData.attendance.clock_out ? 'bg-green-500' : 'bg-gray-700'
          }`}
        >
          <p className={style['status-attendance-card-label']}>Absen Pulang</p>
          <p className={style['status-attendance-card-value']}>
            {authData.attendance.clock_out ? 'Sudah Absen' : 'Belum Clock Out'}
          </p>
        </Card>
      </div>
      <div className={style['latest-attendance-filter-layout']}>
        Absensi Bulan
        <select className={style['latest-attendance-filter-select']} name="month" id="month">
          <option value="01">Januari</option>
          <option value="02">Februari</option>
          <option value="03">Maret</option>
          <option value="04">April</option>
          <option value="05">Mei</option>
          <option value="06">Juni</option>
          <option value="07" selected>
            Juli
          </option>
          <option value="08">Agustus</option>
          <option value="09">September</option>
          <option value="10">Oktober</option>
          <option value="12">November</option>
          <option value="12">Desember</option>
        </select>
        <span>{new Date().getFullYear()}</span>
      </div>
      <div className={style['latest-attendance-filter-indicator-layout']}>
        <Card theme={CardThemeFlexRow} className={style['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-green-500" icon={logIn}></IonIcon>
          <div className={style['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={style['latest-attendance-filter-indicator-card-label']}>Hadir</p>
            <p className={style['latest-attendance-filter-indicator-card-value']}>{absentSummary?.attend || 0} Hari</p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={style['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-red-500" icon={person}></IonIcon>
          <div className={style['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={style['latest-attendance-filter-indicator-card-label']}>Telat</p>
            <p className={style['latest-attendance-filter-indicator-card-value']}>{absentSummary?.late || 0} Hari</p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={style['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-blue-300" icon={sad}></IonIcon>
          <div className={style['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={style['latest-attendance-filter-indicator-card-label']}>Sakit</p>
            <p className={style['latest-attendance-filter-indicator-card-value']}>{absentSummary?.sick || 0} Hari</p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={style['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-yellow-400" icon={home}></IonIcon>
          <div className={style['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={style['latest-attendance-filter-indicator-card-label']}>Cuti</p>
            <p className={style['latest-attendance-filter-indicator-card-value']}>{absentSummary?.leave || 0} Hari</p>
          </div>
        </Card>
      </div>
      {/* <p className="text-base font-medium text-black mb-1 mt-8">1 Minggu Terakhir</p>
      <Datatable table={tableListAttendance} totalData={listAttendance.pagination.countData} /> */}
    </>
  );
};

export default Home;
