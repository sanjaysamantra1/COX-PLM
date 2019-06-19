
export interface GetConfiguratorProjectList {
  projectCode: string;
  projectType: string;
  projectStartDate: string;
  projectEndDate: string;
  projectCategoery: string;
  site:Array<string>;
  status:string;
}


export interface GetConfiguratorProjectListResponse {
  actionResult: string;
  actionStatus: string;
  getConfiguratorProjectList: GetConfiguratorProjectList[];
}