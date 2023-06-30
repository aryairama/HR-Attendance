import { Card, Input, Button, Pagination, InputFile } from '../../components/base';
import { CardThemeFlexRowWrap } from '../../components/base/Card';
import { IonIcon } from '@ionic/react';
import { repeatOutline, addCircleOutline, checkmarkOutline, calendarOutline, chatbubbleOutline } from 'ionicons/icons';
import { usePermit } from '../../hooks/local';
import { ModalDialog } from '../../components/module';
import { createPortal } from 'react-dom';

const Permit = () => {
  const {
    listPermit,
    modalAddForm,
    setModalAddForm,
    handlerCloseModal,
    Form,
    Formik,
    formPermit,
    handlerFile,
    filter,
    setFilter,
    refFormik,
    handlerSubmit,
  } = usePermit();
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
                <span className="bg-green-700 rounded-md p-1">{value.name}</span>
                <span className="bg-purple-700 rounded-md p-1 ">Berkas</span>
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={calendarOutline} /> Mulai : {value.start_date}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={calendarOutline} /> Selesai : {value.end_date}
              </p>
              <p className="text-xs text-gray-600 mb-[1px]">
                <IonIcon icon={chatbubbleOutline} /> Status : {value.approval_status}
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
            totalData={listPermit.pagination.total || 0}
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
          <p className="text-lg font-bold w-full">Tambah Pengajuan Izin</p>
          <Formik
            innerRef={refFormik}
            enableReinitialize={true}
            initialValues={formPermit}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, formik) => handlerSubmit(values, formik)}
          >
            {(formik) => (
              <Form className="mt-5" onSubmit={formik.handleSubmit}>
                <Input name="name" id="name" label="nama" disabled />
                <Input name="start_date" id="start_date" label="Tanggal Mulai" type="date" />
                <Input name="end_date" id="end_date" label="Tanggal Akhir" type="date" />
                <InputFile
                  label="Tanda Terima Invoice"
                  id="document"
                  name="document"
                  accept="image/jpeg, image/jpg, image/png, application/pdf"
                  namefile={
                    formik.values.document?.name ? formik.values.document?.name : 'File type: jpg, jpeg, png, dan pdf.'
                  }
                  onChange={(e) => handlerFile(e, formik)}
                />
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

export default Permit;
