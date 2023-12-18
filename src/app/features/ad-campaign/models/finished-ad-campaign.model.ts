export interface FinishedAdCampaign {
    id: number;
    startDate: Date;
    endDate: Date;
    targetedViews: number;
    overallViews: number;
    overallDisplays: number;
    advertisementsDisplayed: number;
    status: string;
}