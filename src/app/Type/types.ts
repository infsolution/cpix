export type ItemPix = {
  id: string;
  name: string;
  bank: string;
  keyPix: string;
  selected: boolean | null;
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
  user_id: string;
  name: string;
  keyPix: string;
  bank: string;
  is_public: boolean;
  selected: boolean | null;
};

export type KeyCreate = {
  id?: string;
  user_id: string;
  name: string;
  key: string;
  bank: string;
  is_public: boolean;
};

export type TypeKey = {
  user_id: string;
  name: string;
  key: string;
  bank: string;
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
  name: string;
  code: string;
  ispb: string;

};

export type DbCount = {
  count: number;
};
