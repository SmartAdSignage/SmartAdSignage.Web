export interface AdCampaign {
    //public int Id { get; set; }
//public DateTime? StartDate { get; set; }

//public DateTime? EndDate { get; set; }

//public int? TargetedViews { get; set; }

//public string? Status { get; set; }

//public UserResponse? User { get; set; }

//public ICollection<CampaignAdvertisementPropsResponse>? CampaignAdvertisements { get; set; }

//public ICollection<PanelPropsResponse>? Panels { get; set; } 
    id: number;
    startDate: Date;
    endDate: Date;
    status: string;
    targetedViews: number;
}