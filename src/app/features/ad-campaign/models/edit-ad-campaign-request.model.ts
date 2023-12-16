export interface UpdateAdCampaignRequest {
    startDate: Date;
    endDate: Date;
    targetedViews: number;
    status: string;
    userId: string;
}