import { Card } from '../../components/base';
import { CardThemeFlexRowWrap } from '../../components/base/Card';
import styleHome from '../Home/style.module.css';
import { useUserDuties } from '../../hooks/local';
import { Datatable } from '../../components/module';

const UserDuties = () => {
  const { dutiesAreas, selectedArea, setSelectedArea, tableListuserDutiesAreasFilter } = useUserDuties();
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
            <option value="">Pilih Area</option>
            {dutiesAreas.map((value, index) => (
              <option key={index} value={value.area_id}>
                {value.area_name}
              </option>
            ))}
          </select>
        </div>
        <Datatable classNameContainer="border shadow-md" pagination={false} table={tableListuserDutiesAreasFilter} />
      </Card>
    </>
  );
};

UserDuties.propTypes = {};

export default UserDuties;
