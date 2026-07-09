export interface DispatchTracking {
  dispatchIdPk: number;
  dcIdFk: number;
  storeIdFk: number;
  dispatchStatusIdFk: number;

  dispatchDate: string;
  dispatchStatusName?: string;

  createdDate: string;
  createdBy: string;

  modifiedDate: string | null;
  modifiedBy: string | null;

  dcIdFkNavigation: any;
  dispatchStatusIdFkNavigation: any;
  storeIdFkNavigation: any;
}
export interface AddDispatch {

  dispatchIdPk: number;
  dcIdFk: number;
  storeIdFk: number;
  dispatchStatusIdFk: number;
  dispatchDate: string;
  createdBy: string;

}