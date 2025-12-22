import yemenData from '../../data/yemen-info.json';

export function getGovernorates() {
    return yemenData.governorates;
}

export function getDistricts() {
    return yemenData.governorates.flatMap(gov => gov.districts);
}
