export interface Configurator {
}

export interface Project {
    actionResult: string;
    actionStatus: string;
    projectCode: string;
    projectType: string;
    projectStatus: string;
    projectStartDt: string;
    projectEndDt: string;
    description: string;
    market: Market[];
    status: string;
    assignedTo: string;
    projectTypeModel: string;
    sites: string;
    mapProjectTypes: string;
    mapMarketList: string;
    intakeFormResp: string;
}

export interface Market {
    projSiteMapId: string;
    projectCode: string;
    siteId: number;
    siteCodeName: string;
    enableFlag: boolean;
}
