import { useOvertime } from '../../hooks/local';
import { Card, Input, Button, Pagination } from '../../components/base';
import { CardThemeFlexRowWrap } from '../../components/base/Card';
import {
  repeatOutline,
  addCircleOutline,
  checkmarkOutline,
  calendarOutline,
  chatbubbleOutline,
  pencilOutline,
  timeOutline,
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { createPortal } from 'react-dom';
import { ModalDialog } from '../../components/module';

const Overtime = () => {
  const {
    setModalAddForm,
    handlerEditForm,
    listOvertime,
    modalAddForm,
    handlerCloseModal,
    Form,
    Formik,
    formOvertime,
    filter,
    setFilter,
    refFormik,
    handlerSubmit,
  } = useOvertime();
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
          <Button onClick={() => setModalAddForm(true)} className="!mb-0 !w-fit" size="small" schema="pills-yellow">
            <div className="flex items-center gap-1">
              <IonIcon icon={addCircleOutline} className="text-white text-xl" />
              Tambah
            </div>
          </Button>
        </div>
      </Card>
      <Card className="mt-5">
        <p className="font-medium text-base mb-3">Data Permohonan Lembur</p>
        {listOvertime?.data?.map((value, index) => (
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
                <span className="bg-purple-700 rounded-md p-1 ">{value.approval_status}</span>
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={calendarOutline} /> {value.start_date} - {value.end_date}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={timeOutline} /> Mulai Lembur : {value.start_time} - {value.end_time}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={chatbubbleOutline} /> {value.description}
              </p>
            </div>
            <IonIcon
              onClick={() => handlerEditForm(value.id)}
              className="bg-yellow-400 text-white p-1 rounded-md cursor-pointer"
              icon={pencilOutline}
            />
          </Card>
        ))}
        <div className="ml-auto">
          <Pagination
            numberOfButtons={5}
            totalData={listOvertime.pagination.total || 0}
            pageSize={10}
            currentPage={filter.page}
            setPage={(e) => setFilter((old) => ({ ...old, page: e }))}
          />
        </div>
      </Card>
      {createPortal(
        <ModalDialog
          modalId="modal-url-activation-digisign"
          showModal={modalAddForm}
          className="md:!w-[70%] sm:!w-10/12 !w-11/12"
          closeModal={handlerCloseModal}
        >
          <p className="text-lg font-bold w-full">Form Permohonan Lembur</p>
          <Formik
            innerRef={refFormik}
            enableReinitialize={true}
            initialValues={formOvertime}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, formik) => handlerSubmit(values, formik)}
          >
            {(formik) => (
              <Form className="mt-5" onSubmit={formik.handleSubmit}>
                <Input name="name" id="name" label="Nama" disabled />
                <Input name="start_date" id="start_date" label="Mulai Lembur" type="date" />
                <Input name="start_time" id="start_time" label="Jam Mulai" type="time" />
                <Input name="end_date" id="end_date" label="Akhir Lembur" type="date" />
                <Input name="end_time" id="end_time" label="Jam Akhir" type="time" />
                <Input name="description" id="description" label="Keterangan" />
                <Button type="submit" className="!mb-0 mt-3" size="small" schema="pills-purple">
                  Simpan
                </Button>
              </Form>
            )}
          </Formik>
        </ModalDialog>,
        document.getElementById('root-modal')
      )}
    </>
  );
};

export default Overtime;
