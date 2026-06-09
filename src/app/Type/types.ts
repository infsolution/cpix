export type ItemPix = {
  id: string;
  name: string;
  bank: string;
  nameBank: string;
  keyPix: string;
  selected: boolean | null;
  image?: string;
  is_public?: boolean;
};

export type UserCreate = {
  name: string;
  user_name: string;
  email: string;
  universal_uuid: string;
  termChecked: boolean;
};

export type KeyResponse = {
  id: string;
  universal_uuid: string;
  name: string;
  keyPix: string;
  bank: string;
  nameBank: string;
  is_public: boolean;
  selected: boolean | null;
};

export type KeyCreate = {
  id?: string;
  universal_uuid: string;
  name: string;
  key: string;
  bank: string;
  is_public: boolean;
  own?: number;
};

export type TypeKey = {
  user_id: string;
  name: string;
  key: string;
  bank: string;
  nameBank: string;
  is_public: boolean;
  created_at: string;
};

export type KeyUpdate = {
  id: string;
  name: string;
  key: string;
  bank: string;
  is_public: boolean;
};

export type KeysToShare = {
  id: string;
  name: string;
  keyPix: string;
};

export type Bank = {
  id?: string | number;
  name: string;
  code: string;
  ispb?: string;
};

export type DbCount = {
  count: number;
};

export interface ItemSearch {
  id: string | number;
  keyPix?: string;
  name: string;
  user_name?: string;
  image?: string;
  nameBank?: string;
}

export interface SearchResponse {
  message: string;
  code: string;
  data: ItemSearch[];
}
