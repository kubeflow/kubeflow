import { PinpointClient } from "./PinpointClient";
import { CreateAppCommandInput, CreateAppCommandOutput } from "./commands/CreateAppCommand";
import { CreateCampaignCommandInput, CreateCampaignCommandOutput } from "./commands/CreateCampaignCommand";
import { CreateEmailTemplateCommandInput, CreateEmailTemplateCommandOutput } from "./commands/CreateEmailTemplateCommand";
import { CreateExportJobCommandInput, CreateExportJobCommandOutput } from "./commands/CreateExportJobCommand";
import { CreateImportJobCommandInput, CreateImportJobCommandOutput } from "./commands/CreateImportJobCommand";
import { CreateJourneyCommandInput, CreateJourneyCommandOutput } from "./commands/CreateJourneyCommand";
import { CreatePushTemplateCommandInput, CreatePushTemplateCommandOutput } from "./commands/CreatePushTemplateCommand";
import { CreateRecommenderConfigurationCommandInput, CreateRecommenderConfigurationCommandOutput } from "./commands/CreateRecommenderConfigurationCommand";
import { CreateSegmentCommandInput, CreateSegmentCommandOutput } from "./commands/CreateSegmentCommand";
import { CreateSmsTemplateCommandInput, CreateSmsTemplateCommandOutput } from "./commands/CreateSmsTemplateCommand";
import { CreateVoiceTemplateCommandInput, CreateVoiceTemplateCommandOutput } from "./commands/CreateVoiceTemplateCommand";
import { DeleteAdmChannelCommandInput, DeleteAdmChannelCommandOutput } from "./commands/DeleteAdmChannelCommand";
import { DeleteApnsChannelCommandInput, DeleteApnsChannelCommandOutput } from "./commands/DeleteApnsChannelCommand";
import { DeleteApnsSandboxChannelCommandInput, DeleteApnsSandboxChannelCommandOutput } from "./commands/DeleteApnsSandboxChannelCommand";
import { DeleteApnsVoipChannelCommandInput, DeleteApnsVoipChannelCommandOutput } from "./commands/DeleteApnsVoipChannelCommand";
import { DeleteApnsVoipSandboxChannelCommandInput, DeleteApnsVoipSandboxChannelCommandOutput } from "./commands/DeleteApnsVoipSandboxChannelCommand";
import { DeleteAppCommandInput, DeleteAppCommandOutput } from "./commands/DeleteAppCommand";
import { DeleteBaiduChannelCommandInput, DeleteBaiduChannelCommandOutput } from "./commands/DeleteBaiduChannelCommand";
import { DeleteCampaignCommandInput, DeleteCampaignCommandOutput } from "./commands/DeleteCampaignCommand";
import { DeleteEmailChannelCommandInput, DeleteEmailChannelCommandOutput } from "./commands/DeleteEmailChannelCommand";
import { DeleteEmailTemplateCommandInput, DeleteEmailTemplateCommandOutput } from "./commands/DeleteEmailTemplateCommand";
import { DeleteEndpointCommandInput, DeleteEndpointCommandOutput } from "./commands/DeleteEndpointCommand";
import { DeleteEventStreamCommandInput, DeleteEventStreamCommandOutput } from "./commands/DeleteEventStreamCommand";
import { DeleteGcmChannelCommandInput, DeleteGcmChannelCommandOutput } from "./commands/DeleteGcmChannelCommand";
import { DeleteJourneyCommandInput, DeleteJourneyCommandOutput } from "./commands/DeleteJourneyCommand";
import { DeletePushTemplateCommandInput, DeletePushTemplateCommandOutput } from "./commands/DeletePushTemplateCommand";
import { DeleteRecommenderConfigurationCommandInput, DeleteRecommenderConfigurationCommandOutput } from "./commands/DeleteRecommenderConfigurationCommand";
import { DeleteSegmentCommandInput, DeleteSegmentCommandOutput } from "./commands/DeleteSegmentCommand";
import { DeleteSmsChannelCommandInput, DeleteSmsChannelCommandOutput } from "./commands/DeleteSmsChannelCommand";
import { DeleteSmsTemplateCommandInput, DeleteSmsTemplateCommandOutput } from "./commands/DeleteSmsTemplateCommand";
import { DeleteUserEndpointsCommandInput, DeleteUserEndpointsCommandOutput } from "./commands/DeleteUserEndpointsCommand";
import { DeleteVoiceChannelCommandInput, DeleteVoiceChannelCommandOutput } from "./commands/DeleteVoiceChannelCommand";
import { DeleteVoiceTemplateCommandInput, DeleteVoiceTemplateCommandOutput } from "./commands/DeleteVoiceTemplateCommand";
import { GetAdmChannelCommandInput, GetAdmChannelCommandOutput } from "./commands/GetAdmChannelCommand";
import { GetApnsChannelCommandInput, GetApnsChannelCommandOutput } from "./commands/GetApnsChannelCommand";
import { GetApnsSandboxChannelCommandInput, GetApnsSandboxChannelCommandOutput } from "./commands/GetApnsSandboxChannelCommand";
import { GetApnsVoipChannelCommandInput, GetApnsVoipChannelCommandOutput } from "./commands/GetApnsVoipChannelCommand";
import { GetApnsVoipSandboxChannelCommandInput, GetApnsVoipSandboxChannelCommandOutput } from "./commands/GetApnsVoipSandboxChannelCommand";
import { GetAppCommandInput, GetAppCommandOutput } from "./commands/GetAppCommand";
import { GetApplicationDateRangeKpiCommandInput, GetApplicationDateRangeKpiCommandOutput } from "./commands/GetApplicationDateRangeKpiCommand";
import { GetApplicationSettingsCommandInput, GetApplicationSettingsCommandOutput } from "./commands/GetApplicationSettingsCommand";
import { GetAppsCommandInput, GetAppsCommandOutput } from "./commands/GetAppsCommand";
import { GetBaiduChannelCommandInput, GetBaiduChannelCommandOutput } from "./commands/GetBaiduChannelCommand";
import { GetCampaignActivitiesCommandInput, GetCampaignActivitiesCommandOutput } from "./commands/GetCampaignActivitiesCommand";
import { GetCampaignCommandInput, GetCampaignCommandOutput } from "./commands/GetCampaignCommand";
import { GetCampaignDateRangeKpiCommandInput, GetCampaignDateRangeKpiCommandOutput } from "./commands/GetCampaignDateRangeKpiCommand";
import { GetCampaignVersionCommandInput, GetCampaignVersionCommandOutput } from "./commands/GetCampaignVersionCommand";
import { GetCampaignVersionsCommandInput, GetCampaignVersionsCommandOutput } from "./commands/GetCampaignVersionsCommand";
import { GetCampaignsCommandInput, GetCampaignsCommandOutput } from "./commands/GetCampaignsCommand";
import { GetChannelsCommandInput, GetChannelsCommandOutput } from "./commands/GetChannelsCommand";
import { GetEmailChannelCommandInput, GetEmailChannelCommandOutput } from "./commands/GetEmailChannelCommand";
import { GetEmailTemplateCommandInput, GetEmailTemplateCommandOutput } from "./commands/GetEmailTemplateCommand";
import { GetEndpointCommandInput, GetEndpointCommandOutput } from "./commands/GetEndpointCommand";
import { GetEventStreamCommandInput, GetEventStreamCommandOutput } from "./commands/GetEventStreamCommand";
import { GetExportJobCommandInput, GetExportJobCommandOutput } from "./commands/GetExportJobCommand";
import { GetExportJobsCommandInput, GetExportJobsCommandOutput } from "./commands/GetExportJobsCommand";
import { GetGcmChannelCommandInput, GetGcmChannelCommandOutput } from "./commands/GetGcmChannelCommand";
import { GetImportJobCommandInput, GetImportJobCommandOutput } from "./commands/GetImportJobCommand";
import { GetImportJobsCommandInput, GetImportJobsCommandOutput } from "./commands/GetImportJobsCommand";
import { GetJourneyCommandInput, GetJourneyCommandOutput } from "./commands/GetJourneyCommand";
import { GetJourneyDateRangeKpiCommandInput, GetJourneyDateRangeKpiCommandOutput } from "./commands/GetJourneyDateRangeKpiCommand";
import { GetJourneyExecutionActivityMetricsCommandInput, GetJourneyExecutionActivityMetricsCommandOutput } from "./commands/GetJourneyExecutionActivityMetricsCommand";
import { GetJourneyExecutionMetricsCommandInput, GetJourneyExecutionMetricsCommandOutput } from "./commands/GetJourneyExecutionMetricsCommand";
import { GetPushTemplateCommandInput, GetPushTemplateCommandOutput } from "./commands/GetPushTemplateCommand";
import { GetRecommenderConfigurationCommandInput, GetRecommenderConfigurationCommandOutput } from "./commands/GetRecommenderConfigurationCommand";
import { GetRecommenderConfigurationsCommandInput, GetRecommenderConfigurationsCommandOutput } from "./commands/GetRecommenderConfigurationsCommand";
import { GetSegmentCommandInput, GetSegmentCommandOutput } from "./commands/GetSegmentCommand";
import { GetSegmentExportJobsCommandInput, GetSegmentExportJobsCommandOutput } from "./commands/GetSegmentExportJobsCommand";
import { GetSegmentImportJobsCommandInput, GetSegmentImportJobsCommandOutput } from "./commands/GetSegmentImportJobsCommand";
import { GetSegmentVersionCommandInput, GetSegmentVersionCommandOutput } from "./commands/GetSegmentVersionCommand";
import { GetSegmentVersionsCommandInput, GetSegmentVersionsCommandOutput } from "./commands/GetSegmentVersionsCommand";
import { GetSegmentsCommandInput, GetSegmentsCommandOutput } from "./commands/GetSegmentsCommand";
import { GetSmsChannelCommandInput, GetSmsChannelCommandOutput } from "./commands/GetSmsChannelCommand";
import { GetSmsTemplateCommandInput, GetSmsTemplateCommandOutput } from "./commands/GetSmsTemplateCommand";
import { GetUserEndpointsCommandInput, GetUserEndpointsCommandOutput } from "./commands/GetUserEndpointsCommand";
import { GetVoiceChannelCommandInput, GetVoiceChannelCommandOutput } from "./commands/GetVoiceChannelCommand";
import { GetVoiceTemplateCommandInput, GetVoiceTemplateCommandOutput } from "./commands/GetVoiceTemplateCommand";
import { ListJourneysCommandInput, ListJourneysCommandOutput } from "./commands/ListJourneysCommand";
import { ListTagsForResourceCommandInput, ListTagsForResourceCommandOutput } from "./commands/ListTagsForResourceCommand";
import { ListTemplateVersionsCommandInput, ListTemplateVersionsCommandOutput } from "./commands/ListTemplateVersionsCommand";
import { ListTemplatesCommandInput, ListTemplatesCommandOutput } from "./commands/ListTemplatesCommand";
import { PhoneNumberValidateCommandInput, PhoneNumberValidateCommandOutput } from "./commands/PhoneNumberValidateCommand";
import { PutEventStreamCommandInput, PutEventStreamCommandOutput } from "./commands/PutEventStreamCommand";
import { PutEventsCommandInput, PutEventsCommandOutput } from "./commands/PutEventsCommand";
import { RemoveAttributesCommandInput, RemoveAttributesCommandOutput } from "./commands/RemoveAttributesCommand";
import { SendMessagesCommandInput, SendMessagesCommandOutput } from "./commands/SendMessagesCommand";
import { SendUsersMessagesCommandInput, SendUsersMessagesCommandOutput } from "./commands/SendUsersMessagesCommand";
import { TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import { UntagResourceCommandInput, UntagResourceCommandOutput } from "./commands/UntagResourceCommand";
import { UpdateAdmChannelCommandInput, UpdateAdmChannelCommandOutput } from "./commands/UpdateAdmChannelCommand";
import { UpdateApnsChannelCommandInput, UpdateApnsChannelCommandOutput } from "./commands/UpdateApnsChannelCommand";
import { UpdateApnsSandboxChannelCommandInput, UpdateApnsSandboxChannelCommandOutput } from "./commands/UpdateApnsSandboxChannelCommand";
import { UpdateApnsVoipChannelCommandInput, UpdateApnsVoipChannelCommandOutput } from "./commands/UpdateApnsVoipChannelCommand";
import { UpdateApnsVoipSandboxChannelCommandInput, UpdateApnsVoipSandboxChannelCommandOutput } from "./commands/UpdateApnsVoipSandboxChannelCommand";
import { UpdateApplicationSettingsCommandInput, UpdateApplicationSettingsCommandOutput } from "./commands/UpdateApplicationSettingsCommand";
import { UpdateBaiduChannelCommandInput, UpdateBaiduChannelCommandOutput } from "./commands/UpdateBaiduChannelCommand";
import { UpdateCampaignCommandInput, UpdateCampaignCommandOutput } from "./commands/UpdateCampaignCommand";
import { UpdateEmailChannelCommandInput, UpdateEmailChannelCommandOutput } from "./commands/UpdateEmailChannelCommand";
import { UpdateEmailTemplateCommandInput, UpdateEmailTemplateCommandOutput } from "./commands/UpdateEmailTemplateCommand";
import { UpdateEndpointCommandInput, UpdateEndpointCommandOutput } from "./commands/UpdateEndpointCommand";
import { UpdateEndpointsBatchCommandInput, UpdateEndpointsBatchCommandOutput } from "./commands/UpdateEndpointsBatchCommand";
import { UpdateGcmChannelCommandInput, UpdateGcmChannelCommandOutput } from "./commands/UpdateGcmChannelCommand";
import { UpdateJourneyCommandInput, UpdateJourneyCommandOutput } from "./commands/UpdateJourneyCommand";
import { UpdateJourneyStateCommandInput, UpdateJourneyStateCommandOutput } from "./commands/UpdateJourneyStateCommand";
import { UpdatePushTemplateCommandInput, UpdatePushTemplateCommandOutput } from "./commands/UpdatePushTemplateCommand";
import { UpdateRecommenderConfigurationCommandInput, UpdateRecommenderConfigurationCommandOutput } from "./commands/UpdateRecommenderConfigurationCommand";
import { UpdateSegmentCommandInput, UpdateSegmentCommandOutput } from "./commands/UpdateSegmentCommand";
import { UpdateSmsChannelCommandInput, UpdateSmsChannelCommandOutput } from "./commands/UpdateSmsChannelCommand";
import { UpdateSmsTemplateCommandInput, UpdateSmsTemplateCommandOutput } from "./commands/UpdateSmsTemplateCommand";
import { UpdateTemplateActiveVersionCommandInput, UpdateTemplateActiveVersionCommandOutput } from "./commands/UpdateTemplateActiveVersionCommand";
import { UpdateVoiceChannelCommandInput, UpdateVoiceChannelCommandOutput } from "./commands/UpdateVoiceChannelCommand";
import { UpdateVoiceTemplateCommandInput, UpdateVoiceTemplateCommandOutput } from "./commands/UpdateVoiceTemplateCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
/**
 * <p>Doc Engage API - Amazon Pinpoint API</p>
 */
export declare class Pinpoint extends PinpointClient {
    /**
     * <p>Creates an application.</p>
     */
    createApp(args: CreateAppCommandInput, options?: __HttpHandlerOptions): Promise<CreateAppCommandOutput>;
    createApp(args: CreateAppCommandInput, cb: (err: any, data?: CreateAppCommandOutput) => void): void;
    createApp(args: CreateAppCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateAppCommandOutput) => void): void;
    /**
     * <p>Creates a new campaign for an application or updates the settings of an existing campaign for an application.</p>
     */
    createCampaign(args: CreateCampaignCommandInput, options?: __HttpHandlerOptions): Promise<CreateCampaignCommandOutput>;
    createCampaign(args: CreateCampaignCommandInput, cb: (err: any, data?: CreateCampaignCommandOutput) => void): void;
    createCampaign(args: CreateCampaignCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateCampaignCommandOutput) => void): void;
    /**
     * <p>Creates a message template for messages that are sent through the email channel.</p>
     */
    createEmailTemplate(args: CreateEmailTemplateCommandInput, options?: __HttpHandlerOptions): Promise<CreateEmailTemplateCommandOutput>;
    createEmailTemplate(args: CreateEmailTemplateCommandInput, cb: (err: any, data?: CreateEmailTemplateCommandOutput) => void): void;
    createEmailTemplate(args: CreateEmailTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateEmailTemplateCommandOutput) => void): void;
    /**
     * <p>Creates an export job for an application.</p>
     */
    createExportJob(args: CreateExportJobCommandInput, options?: __HttpHandlerOptions): Promise<CreateExportJobCommandOutput>;
    createExportJob(args: CreateExportJobCommandInput, cb: (err: any, data?: CreateExportJobCommandOutput) => void): void;
    createExportJob(args: CreateExportJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateExportJobCommandOutput) => void): void;
    /**
     * <p>Creates an import job for an application.</p>
     */
    createImportJob(args: CreateImportJobCommandInput, options?: __HttpHandlerOptions): Promise<CreateImportJobCommandOutput>;
    createImportJob(args: CreateImportJobCommandInput, cb: (err: any, data?: CreateImportJobCommandOutput) => void): void;
    createImportJob(args: CreateImportJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateImportJobCommandOutput) => void): void;
    /**
     * <p>Creates a journey for an application.</p>
     */
    createJourney(args: CreateJourneyCommandInput, options?: __HttpHandlerOptions): Promise<CreateJourneyCommandOutput>;
    createJourney(args: CreateJourneyCommandInput, cb: (err: any, data?: CreateJourneyCommandOutput) => void): void;
    createJourney(args: CreateJourneyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateJourneyCommandOutput) => void): void;
    /**
     * <p>Creates a message template for messages that are sent through a push notification channel.</p>
     */
    createPushTemplate(args: CreatePushTemplateCommandInput, options?: __HttpHandlerOptions): Promise<CreatePushTemplateCommandOutput>;
    createPushTemplate(args: CreatePushTemplateCommandInput, cb: (err: any, data?: CreatePushTemplateCommandOutput) => void): void;
    createPushTemplate(args: CreatePushTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreatePushTemplateCommandOutput) => void): void;
    /**
     * <p>Creates an Amazon Pinpoint configuration for a recommender model.</p>
     */
    createRecommenderConfiguration(args: CreateRecommenderConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<CreateRecommenderConfigurationCommandOutput>;
    createRecommenderConfiguration(args: CreateRecommenderConfigurationCommandInput, cb: (err: any, data?: CreateRecommenderConfigurationCommandOutput) => void): void;
    createRecommenderConfiguration(args: CreateRecommenderConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateRecommenderConfigurationCommandOutput) => void): void;
    /**
     * <p>Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.</p>
     */
    createSegment(args: CreateSegmentCommandInput, options?: __HttpHandlerOptions): Promise<CreateSegmentCommandOutput>;
    createSegment(args: CreateSegmentCommandInput, cb: (err: any, data?: CreateSegmentCommandOutput) => void): void;
    createSegment(args: CreateSegmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateSegmentCommandOutput) => void): void;
    /**
     * <p>Creates a message template for messages that are sent through the SMS channel.</p>
     */
    createSmsTemplate(args: CreateSmsTemplateCommandInput, options?: __HttpHandlerOptions): Promise<CreateSmsTemplateCommandOutput>;
    createSmsTemplate(args: CreateSmsTemplateCommandInput, cb: (err: any, data?: CreateSmsTemplateCommandOutput) => void): void;
    createSmsTemplate(args: CreateSmsTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateSmsTemplateCommandOutput) => void): void;
    /**
     * <p>Creates a message template for messages that are sent through the voice channel.</p>
     */
    createVoiceTemplate(args: CreateVoiceTemplateCommandInput, options?: __HttpHandlerOptions): Promise<CreateVoiceTemplateCommandOutput>;
    createVoiceTemplate(args: CreateVoiceTemplateCommandInput, cb: (err: any, data?: CreateVoiceTemplateCommandOutput) => void): void;
    createVoiceTemplate(args: CreateVoiceTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateVoiceTemplateCommandOutput) => void): void;
    /**
     * <p>Disables the ADM channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteAdmChannel(args: DeleteAdmChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteAdmChannelCommandOutput>;
    deleteAdmChannel(args: DeleteAdmChannelCommandInput, cb: (err: any, data?: DeleteAdmChannelCommandOutput) => void): void;
    deleteAdmChannel(args: DeleteAdmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteAdmChannelCommandOutput) => void): void;
    /**
     * <p>Disables the APNs channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteApnsChannel(args: DeleteApnsChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteApnsChannelCommandOutput>;
    deleteApnsChannel(args: DeleteApnsChannelCommandInput, cb: (err: any, data?: DeleteApnsChannelCommandOutput) => void): void;
    deleteApnsChannel(args: DeleteApnsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteApnsChannelCommandOutput) => void): void;
    /**
     * <p>Disables the APNs sandbox channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteApnsSandboxChannel(args: DeleteApnsSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteApnsSandboxChannelCommandOutput>;
    deleteApnsSandboxChannel(args: DeleteApnsSandboxChannelCommandInput, cb: (err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void): void;
    deleteApnsSandboxChannel(args: DeleteApnsSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Disables the APNs VoIP channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteApnsVoipChannel(args: DeleteApnsVoipChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteApnsVoipChannelCommandOutput>;
    deleteApnsVoipChannel(args: DeleteApnsVoipChannelCommandInput, cb: (err: any, data?: DeleteApnsVoipChannelCommandOutput) => void): void;
    deleteApnsVoipChannel(args: DeleteApnsVoipChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteApnsVoipChannelCommandOutput) => void): void;
    /**
     * <p>Disables the APNs VoIP sandbox channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteApnsVoipSandboxChannel(args: DeleteApnsVoipSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteApnsVoipSandboxChannelCommandOutput>;
    deleteApnsVoipSandboxChannel(args: DeleteApnsVoipSandboxChannelCommandInput, cb: (err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void): void;
    deleteApnsVoipSandboxChannel(args: DeleteApnsVoipSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Deletes an application.</p>
     */
    deleteApp(args: DeleteAppCommandInput, options?: __HttpHandlerOptions): Promise<DeleteAppCommandOutput>;
    deleteApp(args: DeleteAppCommandInput, cb: (err: any, data?: DeleteAppCommandOutput) => void): void;
    deleteApp(args: DeleteAppCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteAppCommandOutput) => void): void;
    /**
     * <p>Disables the Baidu channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteBaiduChannel(args: DeleteBaiduChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteBaiduChannelCommandOutput>;
    deleteBaiduChannel(args: DeleteBaiduChannelCommandInput, cb: (err: any, data?: DeleteBaiduChannelCommandOutput) => void): void;
    deleteBaiduChannel(args: DeleteBaiduChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteBaiduChannelCommandOutput) => void): void;
    /**
     * <p>Deletes a campaign from an application.</p>
     */
    deleteCampaign(args: DeleteCampaignCommandInput, options?: __HttpHandlerOptions): Promise<DeleteCampaignCommandOutput>;
    deleteCampaign(args: DeleteCampaignCommandInput, cb: (err: any, data?: DeleteCampaignCommandOutput) => void): void;
    deleteCampaign(args: DeleteCampaignCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteCampaignCommandOutput) => void): void;
    /**
     * <p>Disables the email channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteEmailChannel(args: DeleteEmailChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEmailChannelCommandOutput>;
    deleteEmailChannel(args: DeleteEmailChannelCommandInput, cb: (err: any, data?: DeleteEmailChannelCommandOutput) => void): void;
    deleteEmailChannel(args: DeleteEmailChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEmailChannelCommandOutput) => void): void;
    /**
     * <p>Deletes a message template for messages that were sent through the email channel.</p>
     */
    deleteEmailTemplate(args: DeleteEmailTemplateCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEmailTemplateCommandOutput>;
    deleteEmailTemplate(args: DeleteEmailTemplateCommandInput, cb: (err: any, data?: DeleteEmailTemplateCommandOutput) => void): void;
    deleteEmailTemplate(args: DeleteEmailTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEmailTemplateCommandOutput) => void): void;
    /**
     * <p>Deletes an endpoint from an application.</p>
     */
    deleteEndpoint(args: DeleteEndpointCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEndpointCommandOutput>;
    deleteEndpoint(args: DeleteEndpointCommandInput, cb: (err: any, data?: DeleteEndpointCommandOutput) => void): void;
    deleteEndpoint(args: DeleteEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEndpointCommandOutput) => void): void;
    /**
     * <p>Deletes the event stream for an application.</p>
     */
    deleteEventStream(args: DeleteEventStreamCommandInput, options?: __HttpHandlerOptions): Promise<DeleteEventStreamCommandOutput>;
    deleteEventStream(args: DeleteEventStreamCommandInput, cb: (err: any, data?: DeleteEventStreamCommandOutput) => void): void;
    deleteEventStream(args: DeleteEventStreamCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteEventStreamCommandOutput) => void): void;
    /**
     * <p>Disables the GCM channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteGcmChannel(args: DeleteGcmChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteGcmChannelCommandOutput>;
    deleteGcmChannel(args: DeleteGcmChannelCommandInput, cb: (err: any, data?: DeleteGcmChannelCommandOutput) => void): void;
    deleteGcmChannel(args: DeleteGcmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteGcmChannelCommandOutput) => void): void;
    /**
     * <p>Deletes a journey from an application.</p>
     */
    deleteJourney(args: DeleteJourneyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteJourneyCommandOutput>;
    deleteJourney(args: DeleteJourneyCommandInput, cb: (err: any, data?: DeleteJourneyCommandOutput) => void): void;
    deleteJourney(args: DeleteJourneyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteJourneyCommandOutput) => void): void;
    /**
     * <p>Deletes a message template for messages that were sent through a push notification channel.</p>
     */
    deletePushTemplate(args: DeletePushTemplateCommandInput, options?: __HttpHandlerOptions): Promise<DeletePushTemplateCommandOutput>;
    deletePushTemplate(args: DeletePushTemplateCommandInput, cb: (err: any, data?: DeletePushTemplateCommandOutput) => void): void;
    deletePushTemplate(args: DeletePushTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeletePushTemplateCommandOutput) => void): void;
    /**
     * <p>Deletes an Amazon Pinpoint configuration for a recommender model.</p>
     */
    deleteRecommenderConfiguration(args: DeleteRecommenderConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<DeleteRecommenderConfigurationCommandOutput>;
    deleteRecommenderConfiguration(args: DeleteRecommenderConfigurationCommandInput, cb: (err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void): void;
    deleteRecommenderConfiguration(args: DeleteRecommenderConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void): void;
    /**
     * <p>Deletes a segment from an application.</p>
     */
    deleteSegment(args: DeleteSegmentCommandInput, options?: __HttpHandlerOptions): Promise<DeleteSegmentCommandOutput>;
    deleteSegment(args: DeleteSegmentCommandInput, cb: (err: any, data?: DeleteSegmentCommandOutput) => void): void;
    deleteSegment(args: DeleteSegmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteSegmentCommandOutput) => void): void;
    /**
     * <p>Disables the SMS channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteSmsChannel(args: DeleteSmsChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteSmsChannelCommandOutput>;
    deleteSmsChannel(args: DeleteSmsChannelCommandInput, cb: (err: any, data?: DeleteSmsChannelCommandOutput) => void): void;
    deleteSmsChannel(args: DeleteSmsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteSmsChannelCommandOutput) => void): void;
    /**
     * <p>Deletes a message template for messages that were sent through the SMS channel.</p>
     */
    deleteSmsTemplate(args: DeleteSmsTemplateCommandInput, options?: __HttpHandlerOptions): Promise<DeleteSmsTemplateCommandOutput>;
    deleteSmsTemplate(args: DeleteSmsTemplateCommandInput, cb: (err: any, data?: DeleteSmsTemplateCommandOutput) => void): void;
    deleteSmsTemplate(args: DeleteSmsTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteSmsTemplateCommandOutput) => void): void;
    /**
     * <p>Deletes all the endpoints that are associated with a specific user ID.</p>
     */
    deleteUserEndpoints(args: DeleteUserEndpointsCommandInput, options?: __HttpHandlerOptions): Promise<DeleteUserEndpointsCommandOutput>;
    deleteUserEndpoints(args: DeleteUserEndpointsCommandInput, cb: (err: any, data?: DeleteUserEndpointsCommandOutput) => void): void;
    deleteUserEndpoints(args: DeleteUserEndpointsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteUserEndpointsCommandOutput) => void): void;
    /**
     * <p>Disables the voice channel for an application and deletes any existing settings for the channel.</p>
     */
    deleteVoiceChannel(args: DeleteVoiceChannelCommandInput, options?: __HttpHandlerOptions): Promise<DeleteVoiceChannelCommandOutput>;
    deleteVoiceChannel(args: DeleteVoiceChannelCommandInput, cb: (err: any, data?: DeleteVoiceChannelCommandOutput) => void): void;
    deleteVoiceChannel(args: DeleteVoiceChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteVoiceChannelCommandOutput) => void): void;
    /**
     * <p>Deletes a message template for messages that were sent through the voice channel.</p>
     */
    deleteVoiceTemplate(args: DeleteVoiceTemplateCommandInput, options?: __HttpHandlerOptions): Promise<DeleteVoiceTemplateCommandOutput>;
    deleteVoiceTemplate(args: DeleteVoiceTemplateCommandInput, cb: (err: any, data?: DeleteVoiceTemplateCommandOutput) => void): void;
    deleteVoiceTemplate(args: DeleteVoiceTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteVoiceTemplateCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the ADM channel for an application.</p>
     */
    getAdmChannel(args: GetAdmChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetAdmChannelCommandOutput>;
    getAdmChannel(args: GetAdmChannelCommandInput, cb: (err: any, data?: GetAdmChannelCommandOutput) => void): void;
    getAdmChannel(args: GetAdmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetAdmChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the APNs channel for an application.</p>
     */
    getApnsChannel(args: GetApnsChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetApnsChannelCommandOutput>;
    getApnsChannel(args: GetApnsChannelCommandInput, cb: (err: any, data?: GetApnsChannelCommandOutput) => void): void;
    getApnsChannel(args: GetApnsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApnsChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the APNs sandbox channel for an application.</p>
     */
    getApnsSandboxChannel(args: GetApnsSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetApnsSandboxChannelCommandOutput>;
    getApnsSandboxChannel(args: GetApnsSandboxChannelCommandInput, cb: (err: any, data?: GetApnsSandboxChannelCommandOutput) => void): void;
    getApnsSandboxChannel(args: GetApnsSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApnsSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the APNs VoIP channel for an application.</p>
     */
    getApnsVoipChannel(args: GetApnsVoipChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetApnsVoipChannelCommandOutput>;
    getApnsVoipChannel(args: GetApnsVoipChannelCommandInput, cb: (err: any, data?: GetApnsVoipChannelCommandOutput) => void): void;
    getApnsVoipChannel(args: GetApnsVoipChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApnsVoipChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the APNs VoIP sandbox channel for an application.</p>
     */
    getApnsVoipSandboxChannel(args: GetApnsVoipSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetApnsVoipSandboxChannelCommandOutput>;
    getApnsVoipSandboxChannel(args: GetApnsVoipSandboxChannelCommandInput, cb: (err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void): void;
    getApnsVoipSandboxChannel(args: GetApnsVoipSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about an application.</p>
     */
    getApp(args: GetAppCommandInput, options?: __HttpHandlerOptions): Promise<GetAppCommandOutput>;
    getApp(args: GetAppCommandInput, cb: (err: any, data?: GetAppCommandOutput) => void): void;
    getApp(args: GetAppCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetAppCommandOutput) => void): void;
    /**
     * <p>Retrieves (queries) pre-aggregated data for a standard metric that applies to an application.</p>
     */
    getApplicationDateRangeKpi(args: GetApplicationDateRangeKpiCommandInput, options?: __HttpHandlerOptions): Promise<GetApplicationDateRangeKpiCommandOutput>;
    getApplicationDateRangeKpi(args: GetApplicationDateRangeKpiCommandInput, cb: (err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void): void;
    getApplicationDateRangeKpi(args: GetApplicationDateRangeKpiCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the settings for an application.</p>
     */
    getApplicationSettings(args: GetApplicationSettingsCommandInput, options?: __HttpHandlerOptions): Promise<GetApplicationSettingsCommandOutput>;
    getApplicationSettings(args: GetApplicationSettingsCommandInput, cb: (err: any, data?: GetApplicationSettingsCommandOutput) => void): void;
    getApplicationSettings(args: GetApplicationSettingsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetApplicationSettingsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the applications that are associated with your Amazon Pinpoint account.</p>
     */
    getApps(args: GetAppsCommandInput, options?: __HttpHandlerOptions): Promise<GetAppsCommandOutput>;
    getApps(args: GetAppsCommandInput, cb: (err: any, data?: GetAppsCommandOutput) => void): void;
    getApps(args: GetAppsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetAppsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the Baidu channel for an application.</p>
     */
    getBaiduChannel(args: GetBaiduChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetBaiduChannelCommandOutput>;
    getBaiduChannel(args: GetBaiduChannelCommandInput, cb: (err: any, data?: GetBaiduChannelCommandOutput) => void): void;
    getBaiduChannel(args: GetBaiduChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetBaiduChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for a campaign.</p>
     */
    getCampaign(args: GetCampaignCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignCommandOutput>;
    getCampaign(args: GetCampaignCommandInput, cb: (err: any, data?: GetCampaignCommandOutput) => void): void;
    getCampaign(args: GetCampaignCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the activities for a campaign.</p>
     */
    getCampaignActivities(args: GetCampaignActivitiesCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignActivitiesCommandOutput>;
    getCampaignActivities(args: GetCampaignActivitiesCommandInput, cb: (err: any, data?: GetCampaignActivitiesCommandOutput) => void): void;
    getCampaignActivities(args: GetCampaignActivitiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignActivitiesCommandOutput) => void): void;
    /**
     * <p>Retrieves (queries) pre-aggregated data for a standard metric that applies to a campaign.</p>
     */
    getCampaignDateRangeKpi(args: GetCampaignDateRangeKpiCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignDateRangeKpiCommandOutput>;
    getCampaignDateRangeKpi(args: GetCampaignDateRangeKpiCommandInput, cb: (err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void): void;
    getCampaignDateRangeKpi(args: GetCampaignDateRangeKpiCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for all the campaigns that are associated with an application.</p>
     */
    getCampaigns(args: GetCampaignsCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignsCommandOutput>;
    getCampaigns(args: GetCampaignsCommandInput, cb: (err: any, data?: GetCampaignsCommandOutput) => void): void;
    getCampaigns(args: GetCampaignsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for a specific version of a campaign.</p>
     */
    getCampaignVersion(args: GetCampaignVersionCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignVersionCommandOutput>;
    getCampaignVersion(args: GetCampaignVersionCommandInput, cb: (err: any, data?: GetCampaignVersionCommandOutput) => void): void;
    getCampaignVersion(args: GetCampaignVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignVersionCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for all versions of a campaign.</p>
     */
    getCampaignVersions(args: GetCampaignVersionsCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignVersionsCommandOutput>;
    getCampaignVersions(args: GetCampaignVersionsCommandInput, cb: (err: any, data?: GetCampaignVersionsCommandOutput) => void): void;
    getCampaignVersions(args: GetCampaignVersionsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetCampaignVersionsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the history and status of each channel for an application.</p>
     */
    getChannels(args: GetChannelsCommandInput, options?: __HttpHandlerOptions): Promise<GetChannelsCommandOutput>;
    getChannels(args: GetChannelsCommandInput, cb: (err: any, data?: GetChannelsCommandOutput) => void): void;
    getChannels(args: GetChannelsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetChannelsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the email channel for an application.</p>
     */
    getEmailChannel(args: GetEmailChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetEmailChannelCommandOutput>;
    getEmailChannel(args: GetEmailChannelCommandInput, cb: (err: any, data?: GetEmailChannelCommandOutput) => void): void;
    getEmailChannel(args: GetEmailChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetEmailChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves the content and settings of a message template for messages that are sent through the email channel.</p>
     */
    getEmailTemplate(args: GetEmailTemplateCommandInput, options?: __HttpHandlerOptions): Promise<GetEmailTemplateCommandOutput>;
    getEmailTemplate(args: GetEmailTemplateCommandInput, cb: (err: any, data?: GetEmailTemplateCommandOutput) => void): void;
    getEmailTemplate(args: GetEmailTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetEmailTemplateCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the settings and attributes of a specific endpoint for an application.</p>
     */
    getEndpoint(args: GetEndpointCommandInput, options?: __HttpHandlerOptions): Promise<GetEndpointCommandOutput>;
    getEndpoint(args: GetEndpointCommandInput, cb: (err: any, data?: GetEndpointCommandOutput) => void): void;
    getEndpoint(args: GetEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetEndpointCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the event stream settings for an application.</p>
     */
    getEventStream(args: GetEventStreamCommandInput, options?: __HttpHandlerOptions): Promise<GetEventStreamCommandOutput>;
    getEventStream(args: GetEventStreamCommandInput, cb: (err: any, data?: GetEventStreamCommandOutput) => void): void;
    getEventStream(args: GetEventStreamCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetEventStreamCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of a specific export job for an application.</p>
     */
    getExportJob(args: GetExportJobCommandInput, options?: __HttpHandlerOptions): Promise<GetExportJobCommandOutput>;
    getExportJob(args: GetExportJobCommandInput, cb: (err: any, data?: GetExportJobCommandOutput) => void): void;
    getExportJob(args: GetExportJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetExportJobCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of all the export jobs for an application.</p>
     */
    getExportJobs(args: GetExportJobsCommandInput, options?: __HttpHandlerOptions): Promise<GetExportJobsCommandOutput>;
    getExportJobs(args: GetExportJobsCommandInput, cb: (err: any, data?: GetExportJobsCommandOutput) => void): void;
    getExportJobs(args: GetExportJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetExportJobsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the GCM channel for an application.</p>
     */
    getGcmChannel(args: GetGcmChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetGcmChannelCommandOutput>;
    getGcmChannel(args: GetGcmChannelCommandInput, cb: (err: any, data?: GetGcmChannelCommandOutput) => void): void;
    getGcmChannel(args: GetGcmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGcmChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of a specific import job for an application.</p>
     */
    getImportJob(args: GetImportJobCommandInput, options?: __HttpHandlerOptions): Promise<GetImportJobCommandOutput>;
    getImportJob(args: GetImportJobCommandInput, cb: (err: any, data?: GetImportJobCommandOutput) => void): void;
    getImportJob(args: GetImportJobCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetImportJobCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of all the import jobs for an application.</p>
     */
    getImportJobs(args: GetImportJobsCommandInput, options?: __HttpHandlerOptions): Promise<GetImportJobsCommandOutput>;
    getImportJobs(args: GetImportJobsCommandInput, cb: (err: any, data?: GetImportJobsCommandOutput) => void): void;
    getImportJobs(args: GetImportJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetImportJobsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for a journey.</p>
     */
    getJourney(args: GetJourneyCommandInput, options?: __HttpHandlerOptions): Promise<GetJourneyCommandOutput>;
    getJourney(args: GetJourneyCommandInput, cb: (err: any, data?: GetJourneyCommandOutput) => void): void;
    getJourney(args: GetJourneyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetJourneyCommandOutput) => void): void;
    /**
     * <p>Retrieves (queries) pre-aggregated data for a standard engagement metric that applies to a journey.</p>
     */
    getJourneyDateRangeKpi(args: GetJourneyDateRangeKpiCommandInput, options?: __HttpHandlerOptions): Promise<GetJourneyDateRangeKpiCommandOutput>;
    getJourneyDateRangeKpi(args: GetJourneyDateRangeKpiCommandInput, cb: (err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void): void;
    getJourneyDateRangeKpi(args: GetJourneyDateRangeKpiCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void): void;
    /**
     * <p>Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey activity.</p>
     */
    getJourneyExecutionActivityMetrics(args: GetJourneyExecutionActivityMetricsCommandInput, options?: __HttpHandlerOptions): Promise<GetJourneyExecutionActivityMetricsCommandOutput>;
    getJourneyExecutionActivityMetrics(args: GetJourneyExecutionActivityMetricsCommandInput, cb: (err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void): void;
    getJourneyExecutionActivityMetrics(args: GetJourneyExecutionActivityMetricsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void): void;
    /**
     * <p>Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey.</p>
     */
    getJourneyExecutionMetrics(args: GetJourneyExecutionMetricsCommandInput, options?: __HttpHandlerOptions): Promise<GetJourneyExecutionMetricsCommandOutput>;
    getJourneyExecutionMetrics(args: GetJourneyExecutionMetricsCommandInput, cb: (err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void): void;
    getJourneyExecutionMetrics(args: GetJourneyExecutionMetricsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void): void;
    /**
     * <p>Retrieves the content and settings of a message template for messages that are sent through a push notification channel.</p>
     */
    getPushTemplate(args: GetPushTemplateCommandInput, options?: __HttpHandlerOptions): Promise<GetPushTemplateCommandOutput>;
    getPushTemplate(args: GetPushTemplateCommandInput, cb: (err: any, data?: GetPushTemplateCommandOutput) => void): void;
    getPushTemplate(args: GetPushTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetPushTemplateCommandOutput) => void): void;
    /**
     * <p>Retrieves information about an Amazon Pinpoint configuration for a recommender model.</p>
     */
    getRecommenderConfiguration(args: GetRecommenderConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<GetRecommenderConfigurationCommandOutput>;
    getRecommenderConfiguration(args: GetRecommenderConfigurationCommandInput, cb: (err: any, data?: GetRecommenderConfigurationCommandOutput) => void): void;
    getRecommenderConfiguration(args: GetRecommenderConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRecommenderConfigurationCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the recommender model configurations that are associated with your Amazon Pinpoint account.</p>
     */
    getRecommenderConfigurations(args: GetRecommenderConfigurationsCommandInput, options?: __HttpHandlerOptions): Promise<GetRecommenderConfigurationsCommandOutput>;
    getRecommenderConfigurations(args: GetRecommenderConfigurationsCommandInput, cb: (err: any, data?: GetRecommenderConfigurationsCommandOutput) => void): void;
    getRecommenderConfigurations(args: GetRecommenderConfigurationsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRecommenderConfigurationsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the configuration, dimension, and other settings for a specific segment that's associated with an application.</p>
     */
    getSegment(args: GetSegmentCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentCommandOutput>;
    getSegment(args: GetSegmentCommandInput, cb: (err: any, data?: GetSegmentCommandOutput) => void): void;
    getSegment(args: GetSegmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the export jobs for a segment.</p>
     */
    getSegmentExportJobs(args: GetSegmentExportJobsCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentExportJobsCommandOutput>;
    getSegmentExportJobs(args: GetSegmentExportJobsCommandInput, cb: (err: any, data?: GetSegmentExportJobsCommandOutput) => void): void;
    getSegmentExportJobs(args: GetSegmentExportJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentExportJobsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the import jobs for a segment.</p>
     */
    getSegmentImportJobs(args: GetSegmentImportJobsCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentImportJobsCommandOutput>;
    getSegmentImportJobs(args: GetSegmentImportJobsCommandInput, cb: (err: any, data?: GetSegmentImportJobsCommandOutput) => void): void;
    getSegmentImportJobs(args: GetSegmentImportJobsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentImportJobsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the configuration, dimension, and other settings for all the segments that are associated with an application.</p>
     */
    getSegments(args: GetSegmentsCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentsCommandOutput>;
    getSegments(args: GetSegmentsCommandInput, cb: (err: any, data?: GetSegmentsCommandOutput) => void): void;
    getSegments(args: GetSegmentsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the configuration, dimension, and other settings for a specific version of a segment that's associated with an application.</p>
     */
    getSegmentVersion(args: GetSegmentVersionCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentVersionCommandOutput>;
    getSegmentVersion(args: GetSegmentVersionCommandInput, cb: (err: any, data?: GetSegmentVersionCommandOutput) => void): void;
    getSegmentVersion(args: GetSegmentVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentVersionCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the configuration, dimension, and other settings for all the versions of a specific segment that's associated with an application.</p>
     */
    getSegmentVersions(args: GetSegmentVersionsCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentVersionsCommandOutput>;
    getSegmentVersions(args: GetSegmentVersionsCommandInput, cb: (err: any, data?: GetSegmentVersionsCommandOutput) => void): void;
    getSegmentVersions(args: GetSegmentVersionsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSegmentVersionsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the SMS channel for an application.</p>
     */
    getSmsChannel(args: GetSmsChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetSmsChannelCommandOutput>;
    getSmsChannel(args: GetSmsChannelCommandInput, cb: (err: any, data?: GetSmsChannelCommandOutput) => void): void;
    getSmsChannel(args: GetSmsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSmsChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves the content and settings of a message template for messages that are sent through the SMS channel.</p>
     */
    getSmsTemplate(args: GetSmsTemplateCommandInput, options?: __HttpHandlerOptions): Promise<GetSmsTemplateCommandOutput>;
    getSmsTemplate(args: GetSmsTemplateCommandInput, cb: (err: any, data?: GetSmsTemplateCommandOutput) => void): void;
    getSmsTemplate(args: GetSmsTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSmsTemplateCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the endpoints that are associated with a specific user ID.</p>
     */
    getUserEndpoints(args: GetUserEndpointsCommandInput, options?: __HttpHandlerOptions): Promise<GetUserEndpointsCommandOutput>;
    getUserEndpoints(args: GetUserEndpointsCommandInput, cb: (err: any, data?: GetUserEndpointsCommandOutput) => void): void;
    getUserEndpoints(args: GetUserEndpointsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetUserEndpointsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status and settings of the voice channel for an application.</p>
     */
    getVoiceChannel(args: GetVoiceChannelCommandInput, options?: __HttpHandlerOptions): Promise<GetVoiceChannelCommandOutput>;
    getVoiceChannel(args: GetVoiceChannelCommandInput, cb: (err: any, data?: GetVoiceChannelCommandOutput) => void): void;
    getVoiceChannel(args: GetVoiceChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetVoiceChannelCommandOutput) => void): void;
    /**
     * <p>Retrieves the content and settings of a message template for messages that are sent through the voice channel.</p>
     */
    getVoiceTemplate(args: GetVoiceTemplateCommandInput, options?: __HttpHandlerOptions): Promise<GetVoiceTemplateCommandOutput>;
    getVoiceTemplate(args: GetVoiceTemplateCommandInput, cb: (err: any, data?: GetVoiceTemplateCommandOutput) => void): void;
    getVoiceTemplate(args: GetVoiceTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetVoiceTemplateCommandOutput) => void): void;
    /**
     * <p>Retrieves information about the status, configuration, and other settings for all the journeys that are associated with an application.</p>
     */
    listJourneys(args: ListJourneysCommandInput, options?: __HttpHandlerOptions): Promise<ListJourneysCommandOutput>;
    listJourneys(args: ListJourneysCommandInput, cb: (err: any, data?: ListJourneysCommandOutput) => void): void;
    listJourneys(args: ListJourneysCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListJourneysCommandOutput) => void): void;
    /**
     * <p>Retrieves all the tags (keys and values) that are associated with an application, campaign, message template, or segment.</p>
     */
    listTagsForResource(args: ListTagsForResourceCommandInput, options?: __HttpHandlerOptions): Promise<ListTagsForResourceCommandOutput>;
    listTagsForResource(args: ListTagsForResourceCommandInput, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    listTagsForResource(args: ListTagsForResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTagsForResourceCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the message templates that are associated with your Amazon Pinpoint account.</p>
     */
    listTemplates(args: ListTemplatesCommandInput, options?: __HttpHandlerOptions): Promise<ListTemplatesCommandOutput>;
    listTemplates(args: ListTemplatesCommandInput, cb: (err: any, data?: ListTemplatesCommandOutput) => void): void;
    listTemplates(args: ListTemplatesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTemplatesCommandOutput) => void): void;
    /**
     * <p>Retrieves information about all the versions of a specific message template.</p>
     */
    listTemplateVersions(args: ListTemplateVersionsCommandInput, options?: __HttpHandlerOptions): Promise<ListTemplateVersionsCommandOutput>;
    listTemplateVersions(args: ListTemplateVersionsCommandInput, cb: (err: any, data?: ListTemplateVersionsCommandOutput) => void): void;
    listTemplateVersions(args: ListTemplateVersionsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListTemplateVersionsCommandOutput) => void): void;
    /**
     * <p>Retrieves information about a phone number.</p>
     */
    phoneNumberValidate(args: PhoneNumberValidateCommandInput, options?: __HttpHandlerOptions): Promise<PhoneNumberValidateCommandOutput>;
    phoneNumberValidate(args: PhoneNumberValidateCommandInput, cb: (err: any, data?: PhoneNumberValidateCommandOutput) => void): void;
    phoneNumberValidate(args: PhoneNumberValidateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PhoneNumberValidateCommandOutput) => void): void;
    /**
     * <p>Creates a new event to record for endpoints, or creates or updates endpoint data that existing events are associated with.</p>
     */
    putEvents(args: PutEventsCommandInput, options?: __HttpHandlerOptions): Promise<PutEventsCommandOutput>;
    putEvents(args: PutEventsCommandInput, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
    putEvents(args: PutEventsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
    /**
     * <p>Creates a new event stream for an application or updates the settings of an existing event stream for an application.</p>
     */
    putEventStream(args: PutEventStreamCommandInput, options?: __HttpHandlerOptions): Promise<PutEventStreamCommandOutput>;
    putEventStream(args: PutEventStreamCommandInput, cb: (err: any, data?: PutEventStreamCommandOutput) => void): void;
    putEventStream(args: PutEventStreamCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PutEventStreamCommandOutput) => void): void;
    /**
     * <p>Removes one or more attributes, of the same attribute type, from all the endpoints that are associated with an application.</p>
     */
    removeAttributes(args: RemoveAttributesCommandInput, options?: __HttpHandlerOptions): Promise<RemoveAttributesCommandOutput>;
    removeAttributes(args: RemoveAttributesCommandInput, cb: (err: any, data?: RemoveAttributesCommandOutput) => void): void;
    removeAttributes(args: RemoveAttributesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RemoveAttributesCommandOutput) => void): void;
    /**
     * <p>Creates and sends a direct message.</p>
     */
    sendMessages(args: SendMessagesCommandInput, options?: __HttpHandlerOptions): Promise<SendMessagesCommandOutput>;
    sendMessages(args: SendMessagesCommandInput, cb: (err: any, data?: SendMessagesCommandOutput) => void): void;
    sendMessages(args: SendMessagesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SendMessagesCommandOutput) => void): void;
    /**
     * <p>Creates and sends a message to a list of users.</p>
     */
    sendUsersMessages(args: SendUsersMessagesCommandInput, options?: __HttpHandlerOptions): Promise<SendUsersMessagesCommandOutput>;
    sendUsersMessages(args: SendUsersMessagesCommandInput, cb: (err: any, data?: SendUsersMessagesCommandOutput) => void): void;
    sendUsersMessages(args: SendUsersMessagesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SendUsersMessagesCommandOutput) => void): void;
    /**
     * <p>Adds one or more tags (keys and values) to an application, campaign, message template, or segment.</p>
     */
    tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
    tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    tagResource(args: TagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
    /**
     * <p>Removes one or more tags (keys and values) from an application, campaign, message template, or segment.</p>
     */
    untagResource(args: UntagResourceCommandInput, options?: __HttpHandlerOptions): Promise<UntagResourceCommandOutput>;
    untagResource(args: UntagResourceCommandInput, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    untagResource(args: UntagResourceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UntagResourceCommandOutput) => void): void;
    /**
     * <p>Enables the ADM channel for an application or updates the status and settings of the ADM channel for an application.</p>
     */
    updateAdmChannel(args: UpdateAdmChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateAdmChannelCommandOutput>;
    updateAdmChannel(args: UpdateAdmChannelCommandInput, cb: (err: any, data?: UpdateAdmChannelCommandOutput) => void): void;
    updateAdmChannel(args: UpdateAdmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateAdmChannelCommandOutput) => void): void;
    /**
     * <p>Enables the APNs channel for an application or updates the status and settings of the APNs channel for an application.</p>
     */
    updateApnsChannel(args: UpdateApnsChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateApnsChannelCommandOutput>;
    updateApnsChannel(args: UpdateApnsChannelCommandInput, cb: (err: any, data?: UpdateApnsChannelCommandOutput) => void): void;
    updateApnsChannel(args: UpdateApnsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateApnsChannelCommandOutput) => void): void;
    /**
     * <p>Enables the APNs sandbox channel for an application or updates the status and settings of the APNs sandbox channel for an application.</p>
     */
    updateApnsSandboxChannel(args: UpdateApnsSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateApnsSandboxChannelCommandOutput>;
    updateApnsSandboxChannel(args: UpdateApnsSandboxChannelCommandInput, cb: (err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void): void;
    updateApnsSandboxChannel(args: UpdateApnsSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Enables the APNs VoIP channel for an application or updates the status and settings of the APNs VoIP channel for an application.</p>
     */
    updateApnsVoipChannel(args: UpdateApnsVoipChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateApnsVoipChannelCommandOutput>;
    updateApnsVoipChannel(args: UpdateApnsVoipChannelCommandInput, cb: (err: any, data?: UpdateApnsVoipChannelCommandOutput) => void): void;
    updateApnsVoipChannel(args: UpdateApnsVoipChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateApnsVoipChannelCommandOutput) => void): void;
    /**
     * <p>Enables the APNs VoIP sandbox channel for an application or updates the status and settings of the APNs VoIP sandbox channel for an application.</p>
     */
    updateApnsVoipSandboxChannel(args: UpdateApnsVoipSandboxChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateApnsVoipSandboxChannelCommandOutput>;
    updateApnsVoipSandboxChannel(args: UpdateApnsVoipSandboxChannelCommandInput, cb: (err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void): void;
    updateApnsVoipSandboxChannel(args: UpdateApnsVoipSandboxChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void): void;
    /**
     * <p>Updates the settings for an application.</p>
     */
    updateApplicationSettings(args: UpdateApplicationSettingsCommandInput, options?: __HttpHandlerOptions): Promise<UpdateApplicationSettingsCommandOutput>;
    updateApplicationSettings(args: UpdateApplicationSettingsCommandInput, cb: (err: any, data?: UpdateApplicationSettingsCommandOutput) => void): void;
    updateApplicationSettings(args: UpdateApplicationSettingsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateApplicationSettingsCommandOutput) => void): void;
    /**
     * <p>Enables the Baidu channel for an application or updates the status and settings of the Baidu channel for an application.</p>
     */
    updateBaiduChannel(args: UpdateBaiduChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateBaiduChannelCommandOutput>;
    updateBaiduChannel(args: UpdateBaiduChannelCommandInput, cb: (err: any, data?: UpdateBaiduChannelCommandOutput) => void): void;
    updateBaiduChannel(args: UpdateBaiduChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateBaiduChannelCommandOutput) => void): void;
    /**
     * <p>Updates the configuration and other settings for a campaign.</p>
     */
    updateCampaign(args: UpdateCampaignCommandInput, options?: __HttpHandlerOptions): Promise<UpdateCampaignCommandOutput>;
    updateCampaign(args: UpdateCampaignCommandInput, cb: (err: any, data?: UpdateCampaignCommandOutput) => void): void;
    updateCampaign(args: UpdateCampaignCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateCampaignCommandOutput) => void): void;
    /**
     * <p>Enables the email channel for an application or updates the status and settings of the email channel for an application.</p>
     */
    updateEmailChannel(args: UpdateEmailChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateEmailChannelCommandOutput>;
    updateEmailChannel(args: UpdateEmailChannelCommandInput, cb: (err: any, data?: UpdateEmailChannelCommandOutput) => void): void;
    updateEmailChannel(args: UpdateEmailChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateEmailChannelCommandOutput) => void): void;
    /**
     * <p>Updates an existing message template for messages that are sent through the email channel.</p>
     */
    updateEmailTemplate(args: UpdateEmailTemplateCommandInput, options?: __HttpHandlerOptions): Promise<UpdateEmailTemplateCommandOutput>;
    updateEmailTemplate(args: UpdateEmailTemplateCommandInput, cb: (err: any, data?: UpdateEmailTemplateCommandOutput) => void): void;
    updateEmailTemplate(args: UpdateEmailTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateEmailTemplateCommandOutput) => void): void;
    /**
     * <p>Creates a new endpoint for an application or updates the settings and attributes of an existing endpoint for an application. You can also use this operation to define custom attributes for an endpoint. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.</p>
     */
    updateEndpoint(args: UpdateEndpointCommandInput, options?: __HttpHandlerOptions): Promise<UpdateEndpointCommandOutput>;
    updateEndpoint(args: UpdateEndpointCommandInput, cb: (err: any, data?: UpdateEndpointCommandOutput) => void): void;
    updateEndpoint(args: UpdateEndpointCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateEndpointCommandOutput) => void): void;
    /**
     * <p>Creates a new batch of endpoints for an application or updates the settings and attributes of a batch of existing endpoints for an application. You can also use this operation to define custom attributes for a batch of endpoints. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.</p>
     */
    updateEndpointsBatch(args: UpdateEndpointsBatchCommandInput, options?: __HttpHandlerOptions): Promise<UpdateEndpointsBatchCommandOutput>;
    updateEndpointsBatch(args: UpdateEndpointsBatchCommandInput, cb: (err: any, data?: UpdateEndpointsBatchCommandOutput) => void): void;
    updateEndpointsBatch(args: UpdateEndpointsBatchCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateEndpointsBatchCommandOutput) => void): void;
    /**
     * <p>Enables the GCM channel for an application or updates the status and settings of the GCM channel for an application.</p>
     */
    updateGcmChannel(args: UpdateGcmChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateGcmChannelCommandOutput>;
    updateGcmChannel(args: UpdateGcmChannelCommandInput, cb: (err: any, data?: UpdateGcmChannelCommandOutput) => void): void;
    updateGcmChannel(args: UpdateGcmChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateGcmChannelCommandOutput) => void): void;
    /**
     * <p>Updates the configuration and other settings for a journey.</p>
     */
    updateJourney(args: UpdateJourneyCommandInput, options?: __HttpHandlerOptions): Promise<UpdateJourneyCommandOutput>;
    updateJourney(args: UpdateJourneyCommandInput, cb: (err: any, data?: UpdateJourneyCommandOutput) => void): void;
    updateJourney(args: UpdateJourneyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateJourneyCommandOutput) => void): void;
    /**
     * <p>Cancels (stops) an active journey.</p>
     */
    updateJourneyState(args: UpdateJourneyStateCommandInput, options?: __HttpHandlerOptions): Promise<UpdateJourneyStateCommandOutput>;
    updateJourneyState(args: UpdateJourneyStateCommandInput, cb: (err: any, data?: UpdateJourneyStateCommandOutput) => void): void;
    updateJourneyState(args: UpdateJourneyStateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateJourneyStateCommandOutput) => void): void;
    /**
     * <p>Updates an existing message template for messages that are sent through a push notification channel.</p>
     */
    updatePushTemplate(args: UpdatePushTemplateCommandInput, options?: __HttpHandlerOptions): Promise<UpdatePushTemplateCommandOutput>;
    updatePushTemplate(args: UpdatePushTemplateCommandInput, cb: (err: any, data?: UpdatePushTemplateCommandOutput) => void): void;
    updatePushTemplate(args: UpdatePushTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdatePushTemplateCommandOutput) => void): void;
    /**
     * <p>Updates an Amazon Pinpoint configuration for a recommender model.</p>
     */
    updateRecommenderConfiguration(args: UpdateRecommenderConfigurationCommandInput, options?: __HttpHandlerOptions): Promise<UpdateRecommenderConfigurationCommandOutput>;
    updateRecommenderConfiguration(args: UpdateRecommenderConfigurationCommandInput, cb: (err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void): void;
    updateRecommenderConfiguration(args: UpdateRecommenderConfigurationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void): void;
    /**
     * <p>Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.</p>
     */
    updateSegment(args: UpdateSegmentCommandInput, options?: __HttpHandlerOptions): Promise<UpdateSegmentCommandOutput>;
    updateSegment(args: UpdateSegmentCommandInput, cb: (err: any, data?: UpdateSegmentCommandOutput) => void): void;
    updateSegment(args: UpdateSegmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateSegmentCommandOutput) => void): void;
    /**
     * <p>Enables the SMS channel for an application or updates the status and settings of the SMS channel for an application.</p>
     */
    updateSmsChannel(args: UpdateSmsChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateSmsChannelCommandOutput>;
    updateSmsChannel(args: UpdateSmsChannelCommandInput, cb: (err: any, data?: UpdateSmsChannelCommandOutput) => void): void;
    updateSmsChannel(args: UpdateSmsChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateSmsChannelCommandOutput) => void): void;
    /**
     * <p>Updates an existing message template for messages that are sent through the SMS channel.</p>
     */
    updateSmsTemplate(args: UpdateSmsTemplateCommandInput, options?: __HttpHandlerOptions): Promise<UpdateSmsTemplateCommandOutput>;
    updateSmsTemplate(args: UpdateSmsTemplateCommandInput, cb: (err: any, data?: UpdateSmsTemplateCommandOutput) => void): void;
    updateSmsTemplate(args: UpdateSmsTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateSmsTemplateCommandOutput) => void): void;
    /**
     * <p>Changes the status of a specific version of a message template to <i>active</i>.</p>
     */
    updateTemplateActiveVersion(args: UpdateTemplateActiveVersionCommandInput, options?: __HttpHandlerOptions): Promise<UpdateTemplateActiveVersionCommandOutput>;
    updateTemplateActiveVersion(args: UpdateTemplateActiveVersionCommandInput, cb: (err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void): void;
    updateTemplateActiveVersion(args: UpdateTemplateActiveVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void): void;
    /**
     * <p>Enables the voice channel for an application or updates the status and settings of the voice channel for an application.</p>
     */
    updateVoiceChannel(args: UpdateVoiceChannelCommandInput, options?: __HttpHandlerOptions): Promise<UpdateVoiceChannelCommandOutput>;
    updateVoiceChannel(args: UpdateVoiceChannelCommandInput, cb: (err: any, data?: UpdateVoiceChannelCommandOutput) => void): void;
    updateVoiceChannel(args: UpdateVoiceChannelCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateVoiceChannelCommandOutput) => void): void;
    /**
     * <p>Updates an existing message template for messages that are sent through the voice channel.</p>
     */
    updateVoiceTemplate(args: UpdateVoiceTemplateCommandInput, options?: __HttpHandlerOptions): Promise<UpdateVoiceTemplateCommandOutput>;
    updateVoiceTemplate(args: UpdateVoiceTemplateCommandInput, cb: (err: any, data?: UpdateVoiceTemplateCommandOutput) => void): void;
    updateVoiceTemplate(args: UpdateVoiceTemplateCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateVoiceTemplateCommandOutput) => void): void;
}
