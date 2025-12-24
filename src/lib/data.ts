import yemenData from "../../data/yemen-info.json";

export function getYemenInfo() {
  return {
    english_name: yemenData.english_name,
    arabic_name: yemenData.arabic_name,
    emoji: yemenData.emoji,
    capital_english: yemenData.capital_english,
    capital_arabic: yemenData.capital_arabic,
    area_in_kilometer_square: yemenData.area_in_kilometer_square,
    currency: yemenData.currency,
    currency_name_en: yemenData.currency_name_en,
    currency_name_ar: yemenData.currency_name_ar,
    currency_symbol: yemenData.currency_symbol,
    region: yemenData.region,
    subregion: yemenData.subregion,
    phone_code: yemenData.phone_code,
    tld: yemenData.tld,
    latitude: yemenData.latitude,
    longitude: yemenData.longitude,
    timezones: yemenData.timezones,
  };
}

export function getGovernorates() {
  return yemenData.governorates;
}

export function getGovernoratesWithSlug() {
  return yemenData.governorates.map((gov: any) => ({
    ...gov,
    slug: gov.name_en.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export function getDistricts() {
  return yemenData.governorates.flatMap((gov) => gov.districts);
}

export function getGovernorateById(id: number) {
  return yemenData.governorates.find((gov) => gov.id === id);
}

export function getDistrictById(id: number) {
  const allDistricts = getDistricts();
  return allDistricts.find((dist) => dist.id === id);
}
