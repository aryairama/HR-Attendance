import { repeatOutline, checkmarkOutline, logIn, person, sad, home } from 'ionicons/icons';
import { Button, Card, Input } from '../../components/base';
import { IonIcon } from '@ionic/react';
import { CardThemeFlexRowWrap, CardThemeFlexRow } from '../../components/base/Card';
import styleHome from '../Home/style.module.css';
import { useHistory } from '../../hooks/local';
import { Datatable } from '../../components/module';

const History = () => {
  const { tableListAbsentHistory, listAbsentHistory, absentSummary } = useHistory();
  return (
    <>
      <Card theme={CardThemeFlexRowWrap}>
        <Input classNameContainer="md:!w-[calc(33.3333%-8px)]" label="Tanggal Mulai" validation={false} type="date" />
        <Input classNameContainer="md:!w-[calc(33.3333%-8px)]" label="Tanggal Akhir" validation={false} type="date" />
        <div className="md:!w-[calc(33.3333%-8px)] flex flex-wrap gap-2 md:justify-end">
          <Button className="!mb-0 !w-fit" size="small" schema="pills-purple">
            <div className="flex items-center gap-1">
              <IonIcon icon={checkmarkOutline} className="text-white text-xl" />
              Tampilkan
            </div>
          </Button>
          <Button className="!mb-0 !w-fit" size="small" schema="pills-green">
            <div className="flex items-center gap-1">
              <IonIcon icon={repeatOutline} className="text-white text-xl" />
              Clear
            </div>
          </Button>
        </div>
      </Card>
      <div className={`${styleHome['latest-attendance-filter-indicator-layout']} !mt-5`}>
        <Card theme={CardThemeFlexRow} className={styleHome['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-green-500" icon={logIn}></IonIcon>
          <div className={styleHome['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={styleHome['latest-attendance-filter-indicator-card-label']}>Hadir</p>
            <p className={styleHome['latest-attendance-filter-indicator-card-value']}>
              {absentSummary?.attend || 0} Hari
            </p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={styleHome['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-red-500" icon={person}></IonIcon>
          <div className={styleHome['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={styleHome['latest-attendance-filter-indicator-card-label']}>Telat</p>
            <p className={styleHome['latest-attendance-filter-indicator-card-value']}>
              {absentSummary?.late || 0} Hari
            </p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={styleHome['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-blue-300" icon={sad}></IonIcon>
          <div className={styleHome['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={styleHome['latest-attendance-filter-indicator-card-label']}>Sakit</p>
            <p className={styleHome['latest-attendance-filter-indicator-card-value']}>
              {absentSummary?.sick || 0} Hari
            </p>
          </div>
        </Card>
        <Card theme={CardThemeFlexRow} className={styleHome['latest-attendance-filter-indicator-card']}>
          <IonIcon className="text-[25px] text-yellow-400" icon={home}></IonIcon>
          <div className={styleHome['latest-attendance-filter-indicator-card-value-layout']}>
            <p className={styleHome['latest-attendance-filter-indicator-card-label']}>Cuti</p>
            <p className={styleHome['latest-attendance-filter-indicator-card-value']}>
              {absentSummary?.leave || 0} Hari
            </p>
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <Datatable table={tableListAbsentHistory} totalData={listAbsentHistory?.pagination?.total || 0} />
      </Card>
    </>
  );
};

export default History;
