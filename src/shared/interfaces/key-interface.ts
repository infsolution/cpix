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
