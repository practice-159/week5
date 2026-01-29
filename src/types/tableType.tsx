import type { Modal } from "bootstrap";

import type { productType } from "./productType";

export type tableType = {
  productList: productType[];
  INITIAL_TEMPLATE_DATA: productType;
  productModal: React.RefObject<Modal | null>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setTemplateData: React.Dispatch<React.SetStateAction<productType>>;
};
