import styleHome from '../Home/style.module.css';
import { Card, Button } from '../../components/base';
import { useAbsent } from '../../hooks/local';
import Webcam from 'react-webcam';
import { fingerPrintOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Absent = () => {
  const { time, latLong, submitAbsent, accessAbsent, authData } = useAbsent();
  return (
    <>
      <Card>
        <div className={styleHome['greeting-text-layout']}>
          <div className={styleHome['greeting-text-section']}>
            <p className={styleHome['greeting-text']}>Selamat Siang</p>
            <p className={styleHome['greeting-username']}>
              {authData.first_name} {authData.last_name}
            </p>
          </div>
          <div className={styleHome['greeting-text-section']}>
            <div className={styleHome['working-hours']}>Jam Kerja</div>
            <div className={styleHome['working-hours-text']}>
              {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
            </div>
          </div>
        </div>
        <p className="w-full text-black text-center -mb-4 font-bold">{authData.assignment.place}</p>
        <p className="w-full text-black text-center text-sm">
          Lat-Long:{latLong.lat},{latLong.long} <br />
          {accessAbsent.radius ? 'Dalam Jangkauan' : 'Diluar Jangkauan'}
        </p>
        <Card.Divider />
        <Webcam
          className="mx-auto -scale-x-[1]"
          audio={false}
          height={400}
          screenshotFormat="image/jpeg"
          width={360}
          videoConstraints={{
            facingMode: 'selfie',
            mirrored: true,
          }}
          onError={(error) => {
            console.log(error);
          }}
        >
          {({ getScreenshot }) => (
            <>
              {!authData.attendance.clock_in && !authData.attendance.clock_out && (
                <Button
                  disabled={accessAbsent.camera && accessAbsent.location && accessAbsent.radius ? false : true}
                  onClick={() => submitAbsent(getScreenshot, 'clock_in')}
                  className="!mb-0 !w-fit mx-auto hover:disabled:bg-gray-400 disabled:bg-gray-400"
                  size="small"
                  schema="pills-purple"
                >
                  <div className="flex items-center gap-1">
                    <IonIcon icon={fingerPrintOutline} className="text-white text-xl" />
                    Clock In
                  </div>
                </Button>
              )}
              {authData.attendance.clock_in && !authData.attendance.clock_out && (
                <Button
                  disabled={accessAbsent.camera && accessAbsent.location && accessAbsent.radius ? false : true}
                  onClick={() => submitAbsent(getScreenshot, 'clock_out')}
                  className="!mb-0 !w-fit mx-auto hover:disabled:bg-gray-400 disabled:bg-gray-400"
                  size="small"
                  schema="pills-purple"
                >
                  <div className="flex items-center gap-1">
                    <IonIcon icon={fingerPrintOutline} className="text-white text-xl" />
                    Clock Out
                  </div>
                </Button>
              )}
            </>
          )}
        </Webcam>
      </Card>
    </>
  );
};

export default Absent;
