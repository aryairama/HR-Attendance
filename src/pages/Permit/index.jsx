import { Card, Input, Button, Pagination } from '../../components/base';
import { CardThemeFlexRowWrap } from '../../components/base/Card';
import { IonIcon } from '@ionic/react';
import { repeatOutline, addCircleOutline, checkmarkOutline, calendarOutline, chatbubbleOutline } from 'ionicons/icons';
import { usePermit } from '../../hooks/local';

const Permit = () => {
  const { listPermit } = usePermit();
  return (
    <>
      <Card theme={CardThemeFlexRowWrap}>
        <Input classNameContainer="md:!w-[calc(33.3333%-8px)]" label="Tanggal Mulai" validation={false} type="date" />
        <Input classNameContainer="md:!w-[calc(33.3333%-8px)]" label="Tanggal Akhir" validation={false} type="date" />
        <div className="md:!w-[calc(33.3333%-8px)] flex flex-wrap gap-2 justify-end">
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
          <Button className="!mb-0 !w-fit" size="small" schema="pills-yellow">
            <div className="flex items-center gap-1">
              <IonIcon icon={addCircleOutline} className="text-white text-xl" />
              Tambah
            </div>
          </Button>
        </div>
      </Card>
      <Card className="mt-5">
        <p className="font-medium text-base mb-3">Data Pengajuan Izin</p>
        {listPermit?.data?.map((value, index) => (
          <Card
            theme={{
              root: {
                base: CardThemeFlexRowWrap.root.base,
                children: `${CardThemeFlexRowWrap.root.children} justify-between`,
              },
            }}
            key={index}
          >
            <div className="flex flex-col flex-wrap">
              <p className="text-xs flex items-center gap-2 text-white mb-2">
                <span className="bg-green-700 rounded-md p-1">{value.name}</span>{' '}
                <span className="bg-purple-700 rounded-md p-1 ">{value.brand}</span>
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={calendarOutline} /> Mulai : {value.created_at}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={calendarOutline} /> Selesai : {value.created_at}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={chatbubbleOutline} /> Status : {value.product_status}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={chatbubbleOutline} /> {value.description}
              </p>
            </div>
          </Card>
        ))}
        <div className="ml-auto">
          <Pagination
            numberOfButtons={5}
            totalData={listPermit.pagination.countData || 0}
            pageSize={5}
            currentPage={1}
          />
        </div>
      </Card>
    </>
  );
};

export default Permit;
