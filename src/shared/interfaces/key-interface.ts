import { ItemPix } from "@/app/Type/types";

export interface IKeyResponse {
  message: string;
  code: string;
  data: ItemPix[];
}

export interface CreateKey {
  key: string;
  bank_id: string;
  is_public: boolean;
  own: boolean;
}

export interface UpdateKey {
  id: string;
  key: string;
  bank_id: string;
  is_public: boolean;
}

export interface IKey {
  id: string;
  name: string;
  key: string;
  bank: string;
  nameBank: string;
  is_public: boolean;
  own: boolean;
}

export interface IEditKeyResponse {
  message: string;
  code: string;
  data: IKey;
}

export interface IEditKeyResponse {
  message: string;
  code: string;
  data: IKey;
}

export interface KeysFriend {
  id: string;
  name: string;
  keyPix: string;
  image?: string;
  bank: string;
  nameBank: string;
  selected: boolean;
}

export interface KeysFriendResponse {
  message: string;
  code: string;
  data: KeysFriend[];
}
