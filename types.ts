export enum CorpusType {
  TMAVY = 'Tmavý',
  SVETLY = 'Světlý',
  MECHOVY = 'Mechový',
  RED_VELVET = 'Red Velvet',
  ORECHOVY = 'Ořechový',
  KOKOSOVY = 'Kokosový',
}

export enum FillingType {
  MALINA = 'Malina',
  BORUVKA = 'Borůvka',
  PISTACIE = 'Pistácie',
  ORISEK = 'Oříšek',
  VISEN = 'Višeň',
  JAHODA = 'Jahoda',
  COKOLADA = 'Čokoláda',
  MANGO_MARACUJA = 'Mango-maracuja',
}

export enum CakeShape {
  KULATY = 'Kulatý',
  OBDELNIK_A4 = 'Obdélník A4 (20x30cm)',
  OBDELNIK_A5 = 'Obdélník A5 (20x15cm)',
  SRDCE = 'Srdce',
}

export enum CakeSize {
  CM_15 = '15cm (6 porcí)',
  CM_18 = '18cm (10 porcí)',
  CM_24 = '24cm (12 porcí)',
  CM_26 = '26cm (15 porcí)',
  CUSTOM = 'Vlastní počet porcí',
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'Prodejna' | 'Výrobna';
}

export interface OrderState {
  step: number;
  corpus: CorpusType | null;
  filling: FillingType | null;
  shape: CakeShape | null;
  tiers: number;
  size: CakeSize | null;
  customPortions: string;
  locationId: string | null;
  pickupDate: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  note: string;
  image: File | null;
  aiDescription?: string;
}

export const LOCATIONS: PickupLocation[] = [
  {
    id: 'petrvald',
    name: 'Petřvald',
    address: 'Šenovská 1',
    phone: '778 157 857',
    type: 'Prodejna'
  },
  {
    id: 'karvina',
    name: 'Karviná',
    address: 'Tř. Těreškovové 2233/28',
    phone: '778 157 867',
    type: 'Prodejna'
  },
  {
    id: 'ostrava',
    name: 'Ostrava Zábřeh',
    address: 'Výškovická 116A',
    phone: '775 271 101',
    type: 'Prodejna'
  },
  {
    id: 'pist',
    name: 'Píšť',
    address: 'Opavská 218/101',
    phone: '602 323 788',
    type: 'Výrobna'
  }
];