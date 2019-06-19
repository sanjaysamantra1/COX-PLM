export interface GetDiscountProjectList {
  projectCode: string;
  projectType: string;
  projectStartDate: string;
  projectEndDate: string;
  projectCategoery: string;
  site: Array<string>;
  status: string;
}

export interface GetDiscountProjectListResponse {
  actionResult: string;
  actionStatus: string;
  getConfiguratorProjectList: GetDiscountProjectList[];
}