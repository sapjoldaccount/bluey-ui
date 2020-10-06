export class ShopItem {
  title: string;
  description: string;
  image: string;
  price: number;
  id: number;
  // tslint:disable-next-line: variable-name
  stripe_id?: string;
  sold: boolean;
  // tslint:disable-next-line: variable-name
  firebase_doc_id: string;
}
