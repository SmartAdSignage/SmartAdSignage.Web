export interface AddAdCampaignRequest {
    startDate: Date;
    endDate: Date;
    targetedViews: number;
    status: string;
    userId: string;
}