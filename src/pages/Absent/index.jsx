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
        <p className="w-full text-black text-center">
          Lat-Long:{latLong.lat},{latLong.long} <br />
          {accessAbsent.radius ? 'Dalam Jangkauan' : 'Diluar Jangkauan'}
        </p>
        <Card.Divider />
        <Webcam
          className="mx-auto -scale-x-[1]"
          audio={false}
          height={500}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={{
            facingMode: 'selfie',
            mirrored: true,
          }}
          onError={(error) => {
            console.log(error);
          }}
        >
          {({ getScreenshot }) => (
            <Button
              disabled={accessAbsent.camera && accessAbsent.location && accessAbsent.radius ? false : true}
              onClick={() => submitAbsent(getScreenshot)}
              className="!mb-0 !w-fit mx-auto disabled:bg-gray-400"
              size="small"
              schema="pills-purple"
            >
              <div className="flex items-center gap-1">
                <IonIcon icon={fingerPrintOutline} className="text-white text-xl" />
                Attend
              </div>
            </Button>
          )}
        </Webcam>
      </Card>
    </>
  );
};

export default Absent;
