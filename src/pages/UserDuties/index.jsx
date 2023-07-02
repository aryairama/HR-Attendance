import { Card, Button, MultipleInputFile } from '../../components/base';
import { CardThemeFlexRowWrap } from '../../components/base/Card';
import styleHome from '../Home/style.module.css';
import { useUserDuties } from '../../hooks/local';
import { Datatable } from '../../components/module';
import { IonIcon } from '@ionic/react';
import { time } from 'ionicons/icons';

const UserDuties = () => {
  const {
    dutiesAreas,
    selectedArea,
    setSelectedArea,
    tableListuserDutiesAreasFilter,
    handlerSubmit,
    document,
    setDocument,
    currentDocument,
    handlerRemoveFile,
  } = useUserDuties();
  return (
    <>
      <Card theme={CardThemeFlexRowWrap}>
        <div className={`${styleHome['latest-attendance-filter-layout']} !mt-0`}>
          Daftar Area
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className={styleHome['latest-attendance-filter-select']}
            name="month"
            id="month"
          >
            {(selectedArea === undefined || selectedArea === '') && <option value="">Pilih Area</option>}
            {dutiesAreas.map((value, index) => (
              <option key={index} value={value.area_id}>
                {value.area_name}
              </option>
            ))}
          </select>
        </div>
        <Datatable classNameContainer="border shadow-md" pagination={false} table={tableListuserDutiesAreasFilter} />
        {selectedArea && (
          <>
            <p className="font-bold w-full -mb-2">Daftar berkas terunggah</p>
            <ul className="w-full list-disc ml-4 text-blue-500">
              {currentDocument?.map((value, index) => (
                <li
                  className="cursor-pointer"
                  onClick={() => window.open(value.original_url, '_blank').focus()}
                  key={index}
                >
                  {value.file_name}
                </li>
              ))}
            </ul>
          </>
        )}
        {Object.keys(tableListuserDutiesAreasFilter.getState().rowSelection).length > 0 && (
          <>
            <MultipleInputFile
              onChange={(e) => setDocument([...document, ...e.target.files])}
              accept="image/jpeg, image/jpg, image/png"
              id="document"
              typeButton="2"
              validation={false}
              textButtonUpload="Unggah Berkas"
            >
              {document.map((file, index) => (
                <MultipleInputFile.File
                  customIconFile={<IonIcon icon={time} className="text-white font-bold" />}
                  iconFile={false}
                  functionRemoveFile={() => handlerRemoveFile(index)}
                  key={index}
                  fileName={file.name}
                />
              ))}
            </MultipleInputFile>
            <Button onClick={handlerSubmit} className="!mb-0 !w-fit mx-auto" size="small" schema="pills-purple">
              Simpan
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

UserDuties.propTypes = {};

export default UserDuties;
