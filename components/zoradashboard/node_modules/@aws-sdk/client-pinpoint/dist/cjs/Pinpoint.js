"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pinpoint = void 0;
const PinpointClient_1 = require("./PinpointClient");
const CreateAppCommand_1 = require("./commands/CreateAppCommand");
const CreateCampaignCommand_1 = require("./commands/CreateCampaignCommand");
const CreateEmailTemplateCommand_1 = require("./commands/CreateEmailTemplateCommand");
const CreateExportJobCommand_1 = require("./commands/CreateExportJobCommand");
const CreateImportJobCommand_1 = require("./commands/CreateImportJobCommand");
const CreateJourneyCommand_1 = require("./commands/CreateJourneyCommand");
const CreatePushTemplateCommand_1 = require("./commands/CreatePushTemplateCommand");
const CreateRecommenderConfigurationCommand_1 = require("./commands/CreateRecommenderConfigurationCommand");
const CreateSegmentCommand_1 = require("./commands/CreateSegmentCommand");
const CreateSmsTemplateCommand_1 = require("./commands/CreateSmsTemplateCommand");
const CreateVoiceTemplateCommand_1 = require("./commands/CreateVoiceTemplateCommand");
const DeleteAdmChannelCommand_1 = require("./commands/DeleteAdmChannelCommand");
const DeleteApnsChannelCommand_1 = require("./commands/DeleteApnsChannelCommand");
const DeleteApnsSandboxChannelCommand_1 = require("./commands/DeleteApnsSandboxChannelCommand");
const DeleteApnsVoipChannelCommand_1 = require("./commands/DeleteApnsVoipChannelCommand");
const DeleteApnsVoipSandboxChannelCommand_1 = require("./commands/DeleteApnsVoipSandboxChannelCommand");
const DeleteAppCommand_1 = require("./commands/DeleteAppCommand");
const DeleteBaiduChannelCommand_1 = require("./commands/DeleteBaiduChannelCommand");
const DeleteCampaignCommand_1 = require("./commands/DeleteCampaignCommand");
const DeleteEmailChannelCommand_1 = require("./commands/DeleteEmailChannelCommand");
const DeleteEmailTemplateCommand_1 = require("./commands/DeleteEmailTemplateCommand");
const DeleteEndpointCommand_1 = require("./commands/DeleteEndpointCommand");
const DeleteEventStreamCommand_1 = require("./commands/DeleteEventStreamCommand");
const DeleteGcmChannelCommand_1 = require("./commands/DeleteGcmChannelCommand");
const DeleteJourneyCommand_1 = require("./commands/DeleteJourneyCommand");
const DeletePushTemplateCommand_1 = require("./commands/DeletePushTemplateCommand");
const DeleteRecommenderConfigurationCommand_1 = require("./commands/DeleteRecommenderConfigurationCommand");
const DeleteSegmentCommand_1 = require("./commands/DeleteSegmentCommand");
const DeleteSmsChannelCommand_1 = require("./commands/DeleteSmsChannelCommand");
const DeleteSmsTemplateCommand_1 = require("./commands/DeleteSmsTemplateCommand");
const DeleteUserEndpointsCommand_1 = require("./commands/DeleteUserEndpointsCommand");
const DeleteVoiceChannelCommand_1 = require("./commands/DeleteVoiceChannelCommand");
const DeleteVoiceTemplateCommand_1 = require("./commands/DeleteVoiceTemplateCommand");
const GetAdmChannelCommand_1 = require("./commands/GetAdmChannelCommand");
const GetApnsChannelCommand_1 = require("./commands/GetApnsChannelCommand");
const GetApnsSandboxChannelCommand_1 = require("./commands/GetApnsSandboxChannelCommand");
const GetApnsVoipChannelCommand_1 = require("./commands/GetApnsVoipChannelCommand");
const GetApnsVoipSandboxChannelCommand_1 = require("./commands/GetApnsVoipSandboxChannelCommand");
const GetAppCommand_1 = require("./commands/GetAppCommand");
const GetApplicationDateRangeKpiCommand_1 = require("./commands/GetApplicationDateRangeKpiCommand");
const GetApplicationSettingsCommand_1 = require("./commands/GetApplicationSettingsCommand");
const GetAppsCommand_1 = require("./commands/GetAppsCommand");
const GetBaiduChannelCommand_1 = require("./commands/GetBaiduChannelCommand");
const GetCampaignActivitiesCommand_1 = require("./commands/GetCampaignActivitiesCommand");
const GetCampaignCommand_1 = require("./commands/GetCampaignCommand");
const GetCampaignDateRangeKpiCommand_1 = require("./commands/GetCampaignDateRangeKpiCommand");
const GetCampaignVersionCommand_1 = require("./commands/GetCampaignVersionCommand");
const GetCampaignVersionsCommand_1 = require("./commands/GetCampaignVersionsCommand");
const GetCampaignsCommand_1 = require("./commands/GetCampaignsCommand");
const GetChannelsCommand_1 = require("./commands/GetChannelsCommand");
const GetEmailChannelCommand_1 = require("./commands/GetEmailChannelCommand");
const GetEmailTemplateCommand_1 = require("./commands/GetEmailTemplateCommand");
const GetEndpointCommand_1 = require("./commands/GetEndpointCommand");
const GetEventStreamCommand_1 = require("./commands/GetEventStreamCommand");
const GetExportJobCommand_1 = require("./commands/GetExportJobCommand");
const GetExportJobsCommand_1 = require("./commands/GetExportJobsCommand");
const GetGcmChannelCommand_1 = require("./commands/GetGcmChannelCommand");
const GetImportJobCommand_1 = require("./commands/GetImportJobCommand");
const GetImportJobsCommand_1 = require("./commands/GetImportJobsCommand");
const GetJourneyCommand_1 = require("./commands/GetJourneyCommand");
const GetJourneyDateRangeKpiCommand_1 = require("./commands/GetJourneyDateRangeKpiCommand");
const GetJourneyExecutionActivityMetricsCommand_1 = require("./commands/GetJourneyExecutionActivityMetricsCommand");
const GetJourneyExecutionMetricsCommand_1 = require("./commands/GetJourneyExecutionMetricsCommand");
const GetPushTemplateCommand_1 = require("./commands/GetPushTemplateCommand");
const GetRecommenderConfigurationCommand_1 = require("./commands/GetRecommenderConfigurationCommand");
const GetRecommenderConfigurationsCommand_1 = require("./commands/GetRecommenderConfigurationsCommand");
const GetSegmentCommand_1 = require("./commands/GetSegmentCommand");
const GetSegmentExportJobsCommand_1 = require("./commands/GetSegmentExportJobsCommand");
const GetSegmentImportJobsCommand_1 = require("./commands/GetSegmentImportJobsCommand");
const GetSegmentVersionCommand_1 = require("./commands/GetSegmentVersionCommand");
const GetSegmentVersionsCommand_1 = require("./commands/GetSegmentVersionsCommand");
const GetSegmentsCommand_1 = require("./commands/GetSegmentsCommand");
const GetSmsChannelCommand_1 = require("./commands/GetSmsChannelCommand");
const GetSmsTemplateCommand_1 = require("./commands/GetSmsTemplateCommand");
const GetUserEndpointsCommand_1 = require("./commands/GetUserEndpointsCommand");
const GetVoiceChannelCommand_1 = require("./commands/GetVoiceChannelCommand");
const GetVoiceTemplateCommand_1 = require("./commands/GetVoiceTemplateCommand");
const ListJourneysCommand_1 = require("./commands/ListJourneysCommand");
const ListTagsForResourceCommand_1 = require("./commands/ListTagsForResourceCommand");
const ListTemplateVersionsCommand_1 = require("./commands/ListTemplateVersionsCommand");
const ListTemplatesCommand_1 = require("./commands/ListTemplatesCommand");
const PhoneNumberValidateCommand_1 = require("./commands/PhoneNumberValidateCommand");
const PutEventStreamCommand_1 = require("./commands/PutEventStreamCommand");
const PutEventsCommand_1 = require("./commands/PutEventsCommand");
const RemoveAttributesCommand_1 = require("./commands/RemoveAttributesCommand");
const SendMessagesCommand_1 = require("./commands/SendMessagesCommand");
const SendUsersMessagesCommand_1 = require("./commands/SendUsersMessagesCommand");
const TagResourceCommand_1 = require("./commands/TagResourceCommand");
const UntagResourceCommand_1 = require("./commands/UntagResourceCommand");
const UpdateAdmChannelCommand_1 = require("./commands/UpdateAdmChannelCommand");
const UpdateApnsChannelCommand_1 = require("./commands/UpdateApnsChannelCommand");
const UpdateApnsSandboxChannelCommand_1 = require("./commands/UpdateApnsSandboxChannelCommand");
const UpdateApnsVoipChannelCommand_1 = require("./commands/UpdateApnsVoipChannelCommand");
const UpdateApnsVoipSandboxChannelCommand_1 = require("./commands/UpdateApnsVoipSandboxChannelCommand");
const UpdateApplicationSettingsCommand_1 = require("./commands/UpdateApplicationSettingsCommand");
const UpdateBaiduChannelCommand_1 = require("./commands/UpdateBaiduChannelCommand");
const UpdateCampaignCommand_1 = require("./commands/UpdateCampaignCommand");
const UpdateEmailChannelCommand_1 = require("./commands/UpdateEmailChannelCommand");
const UpdateEmailTemplateCommand_1 = require("./commands/UpdateEmailTemplateCommand");
const UpdateEndpointCommand_1 = require("./commands/UpdateEndpointCommand");
const UpdateEndpointsBatchCommand_1 = require("./commands/UpdateEndpointsBatchCommand");
const UpdateGcmChannelCommand_1 = require("./commands/UpdateGcmChannelCommand");
const UpdateJourneyCommand_1 = require("./commands/UpdateJourneyCommand");
const UpdateJourneyStateCommand_1 = require("./commands/UpdateJourneyStateCommand");
const UpdatePushTemplateCommand_1 = require("./commands/UpdatePushTemplateCommand");
const UpdateRecommenderConfigurationCommand_1 = require("./commands/UpdateRecommenderConfigurationCommand");
const UpdateSegmentCommand_1 = require("./commands/UpdateSegmentCommand");
const UpdateSmsChannelCommand_1 = require("./commands/UpdateSmsChannelCommand");
const UpdateSmsTemplateCommand_1 = require("./commands/UpdateSmsTemplateCommand");
const UpdateTemplateActiveVersionCommand_1 = require("./commands/UpdateTemplateActiveVersionCommand");
const UpdateVoiceChannelCommand_1 = require("./commands/UpdateVoiceChannelCommand");
const UpdateVoiceTemplateCommand_1 = require("./commands/UpdateVoiceTemplateCommand");
/**
 * <p>Doc Engage API - Amazon Pinpoint API</p>
 */
class Pinpoint extends PinpointClient_1.PinpointClient {
    createApp(args, optionsOrCb, cb) {
        const command = new CreateAppCommand_1.CreateAppCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createCampaign(args, optionsOrCb, cb) {
        const command = new CreateCampaignCommand_1.CreateCampaignCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createEmailTemplate(args, optionsOrCb, cb) {
        const command = new CreateEmailTemplateCommand_1.CreateEmailTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createExportJob(args, optionsOrCb, cb) {
        const command = new CreateExportJobCommand_1.CreateExportJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createImportJob(args, optionsOrCb, cb) {
        const command = new CreateImportJobCommand_1.CreateImportJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createJourney(args, optionsOrCb, cb) {
        const command = new CreateJourneyCommand_1.CreateJourneyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createPushTemplate(args, optionsOrCb, cb) {
        const command = new CreatePushTemplateCommand_1.CreatePushTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createRecommenderConfiguration(args, optionsOrCb, cb) {
        const command = new CreateRecommenderConfigurationCommand_1.CreateRecommenderConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createSegment(args, optionsOrCb, cb) {
        const command = new CreateSegmentCommand_1.CreateSegmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createSmsTemplate(args, optionsOrCb, cb) {
        const command = new CreateSmsTemplateCommand_1.CreateSmsTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createVoiceTemplate(args, optionsOrCb, cb) {
        const command = new CreateVoiceTemplateCommand_1.CreateVoiceTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteAdmChannel(args, optionsOrCb, cb) {
        const command = new DeleteAdmChannelCommand_1.DeleteAdmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteApnsChannel(args, optionsOrCb, cb) {
        const command = new DeleteApnsChannelCommand_1.DeleteApnsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteApnsSandboxChannel(args, optionsOrCb, cb) {
        const command = new DeleteApnsSandboxChannelCommand_1.DeleteApnsSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteApnsVoipChannel(args, optionsOrCb, cb) {
        const command = new DeleteApnsVoipChannelCommand_1.DeleteApnsVoipChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteApnsVoipSandboxChannel(args, optionsOrCb, cb) {
        const command = new DeleteApnsVoipSandboxChannelCommand_1.DeleteApnsVoipSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteApp(args, optionsOrCb, cb) {
        const command = new DeleteAppCommand_1.DeleteAppCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteBaiduChannel(args, optionsOrCb, cb) {
        const command = new DeleteBaiduChannelCommand_1.DeleteBaiduChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteCampaign(args, optionsOrCb, cb) {
        const command = new DeleteCampaignCommand_1.DeleteCampaignCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEmailChannel(args, optionsOrCb, cb) {
        const command = new DeleteEmailChannelCommand_1.DeleteEmailChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEmailTemplate(args, optionsOrCb, cb) {
        const command = new DeleteEmailTemplateCommand_1.DeleteEmailTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEndpoint(args, optionsOrCb, cb) {
        const command = new DeleteEndpointCommand_1.DeleteEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteEventStream(args, optionsOrCb, cb) {
        const command = new DeleteEventStreamCommand_1.DeleteEventStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteGcmChannel(args, optionsOrCb, cb) {
        const command = new DeleteGcmChannelCommand_1.DeleteGcmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteJourney(args, optionsOrCb, cb) {
        const command = new DeleteJourneyCommand_1.DeleteJourneyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deletePushTemplate(args, optionsOrCb, cb) {
        const command = new DeletePushTemplateCommand_1.DeletePushTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteRecommenderConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteRecommenderConfigurationCommand_1.DeleteRecommenderConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteSegment(args, optionsOrCb, cb) {
        const command = new DeleteSegmentCommand_1.DeleteSegmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteSmsChannel(args, optionsOrCb, cb) {
        const command = new DeleteSmsChannelCommand_1.DeleteSmsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteSmsTemplate(args, optionsOrCb, cb) {
        const command = new DeleteSmsTemplateCommand_1.DeleteSmsTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteUserEndpoints(args, optionsOrCb, cb) {
        const command = new DeleteUserEndpointsCommand_1.DeleteUserEndpointsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteVoiceChannel(args, optionsOrCb, cb) {
        const command = new DeleteVoiceChannelCommand_1.DeleteVoiceChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteVoiceTemplate(args, optionsOrCb, cb) {
        const command = new DeleteVoiceTemplateCommand_1.DeleteVoiceTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getAdmChannel(args, optionsOrCb, cb) {
        const command = new GetAdmChannelCommand_1.GetAdmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApnsChannel(args, optionsOrCb, cb) {
        const command = new GetApnsChannelCommand_1.GetApnsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApnsSandboxChannel(args, optionsOrCb, cb) {
        const command = new GetApnsSandboxChannelCommand_1.GetApnsSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApnsVoipChannel(args, optionsOrCb, cb) {
        const command = new GetApnsVoipChannelCommand_1.GetApnsVoipChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApnsVoipSandboxChannel(args, optionsOrCb, cb) {
        const command = new GetApnsVoipSandboxChannelCommand_1.GetApnsVoipSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApp(args, optionsOrCb, cb) {
        const command = new GetAppCommand_1.GetAppCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApplicationDateRangeKpi(args, optionsOrCb, cb) {
        const command = new GetApplicationDateRangeKpiCommand_1.GetApplicationDateRangeKpiCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApplicationSettings(args, optionsOrCb, cb) {
        const command = new GetApplicationSettingsCommand_1.GetApplicationSettingsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getApps(args, optionsOrCb, cb) {
        const command = new GetAppsCommand_1.GetAppsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getBaiduChannel(args, optionsOrCb, cb) {
        const command = new GetBaiduChannelCommand_1.GetBaiduChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaign(args, optionsOrCb, cb) {
        const command = new GetCampaignCommand_1.GetCampaignCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaignActivities(args, optionsOrCb, cb) {
        const command = new GetCampaignActivitiesCommand_1.GetCampaignActivitiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaignDateRangeKpi(args, optionsOrCb, cb) {
        const command = new GetCampaignDateRangeKpiCommand_1.GetCampaignDateRangeKpiCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaigns(args, optionsOrCb, cb) {
        const command = new GetCampaignsCommand_1.GetCampaignsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaignVersion(args, optionsOrCb, cb) {
        const command = new GetCampaignVersionCommand_1.GetCampaignVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getCampaignVersions(args, optionsOrCb, cb) {
        const command = new GetCampaignVersionsCommand_1.GetCampaignVersionsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getChannels(args, optionsOrCb, cb) {
        const command = new GetChannelsCommand_1.GetChannelsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getEmailChannel(args, optionsOrCb, cb) {
        const command = new GetEmailChannelCommand_1.GetEmailChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getEmailTemplate(args, optionsOrCb, cb) {
        const command = new GetEmailTemplateCommand_1.GetEmailTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getEndpoint(args, optionsOrCb, cb) {
        const command = new GetEndpointCommand_1.GetEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getEventStream(args, optionsOrCb, cb) {
        const command = new GetEventStreamCommand_1.GetEventStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getExportJob(args, optionsOrCb, cb) {
        const command = new GetExportJobCommand_1.GetExportJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getExportJobs(args, optionsOrCb, cb) {
        const command = new GetExportJobsCommand_1.GetExportJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGcmChannel(args, optionsOrCb, cb) {
        const command = new GetGcmChannelCommand_1.GetGcmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getImportJob(args, optionsOrCb, cb) {
        const command = new GetImportJobCommand_1.GetImportJobCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getImportJobs(args, optionsOrCb, cb) {
        const command = new GetImportJobsCommand_1.GetImportJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getJourney(args, optionsOrCb, cb) {
        const command = new GetJourneyCommand_1.GetJourneyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getJourneyDateRangeKpi(args, optionsOrCb, cb) {
        const command = new GetJourneyDateRangeKpiCommand_1.GetJourneyDateRangeKpiCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getJourneyExecutionActivityMetrics(args, optionsOrCb, cb) {
        const command = new GetJourneyExecutionActivityMetricsCommand_1.GetJourneyExecutionActivityMetricsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getJourneyExecutionMetrics(args, optionsOrCb, cb) {
        const command = new GetJourneyExecutionMetricsCommand_1.GetJourneyExecutionMetricsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getPushTemplate(args, optionsOrCb, cb) {
        const command = new GetPushTemplateCommand_1.GetPushTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRecommenderConfiguration(args, optionsOrCb, cb) {
        const command = new GetRecommenderConfigurationCommand_1.GetRecommenderConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRecommenderConfigurations(args, optionsOrCb, cb) {
        const command = new GetRecommenderConfigurationsCommand_1.GetRecommenderConfigurationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegment(args, optionsOrCb, cb) {
        const command = new GetSegmentCommand_1.GetSegmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegmentExportJobs(args, optionsOrCb, cb) {
        const command = new GetSegmentExportJobsCommand_1.GetSegmentExportJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegmentImportJobs(args, optionsOrCb, cb) {
        const command = new GetSegmentImportJobsCommand_1.GetSegmentImportJobsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegments(args, optionsOrCb, cb) {
        const command = new GetSegmentsCommand_1.GetSegmentsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegmentVersion(args, optionsOrCb, cb) {
        const command = new GetSegmentVersionCommand_1.GetSegmentVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSegmentVersions(args, optionsOrCb, cb) {
        const command = new GetSegmentVersionsCommand_1.GetSegmentVersionsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSmsChannel(args, optionsOrCb, cb) {
        const command = new GetSmsChannelCommand_1.GetSmsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getSmsTemplate(args, optionsOrCb, cb) {
        const command = new GetSmsTemplateCommand_1.GetSmsTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getUserEndpoints(args, optionsOrCb, cb) {
        const command = new GetUserEndpointsCommand_1.GetUserEndpointsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getVoiceChannel(args, optionsOrCb, cb) {
        const command = new GetVoiceChannelCommand_1.GetVoiceChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getVoiceTemplate(args, optionsOrCb, cb) {
        const command = new GetVoiceTemplateCommand_1.GetVoiceTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listJourneys(args, optionsOrCb, cb) {
        const command = new ListJourneysCommand_1.ListJourneysCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTagsForResource(args, optionsOrCb, cb) {
        const command = new ListTagsForResourceCommand_1.ListTagsForResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTemplates(args, optionsOrCb, cb) {
        const command = new ListTemplatesCommand_1.ListTemplatesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTemplateVersions(args, optionsOrCb, cb) {
        const command = new ListTemplateVersionsCommand_1.ListTemplateVersionsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    phoneNumberValidate(args, optionsOrCb, cb) {
        const command = new PhoneNumberValidateCommand_1.PhoneNumberValidateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putEvents(args, optionsOrCb, cb) {
        const command = new PutEventsCommand_1.PutEventsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putEventStream(args, optionsOrCb, cb) {
        const command = new PutEventStreamCommand_1.PutEventStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    removeAttributes(args, optionsOrCb, cb) {
        const command = new RemoveAttributesCommand_1.RemoveAttributesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    sendMessages(args, optionsOrCb, cb) {
        const command = new SendMessagesCommand_1.SendMessagesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    sendUsersMessages(args, optionsOrCb, cb) {
        const command = new SendUsersMessagesCommand_1.SendUsersMessagesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    tagResource(args, optionsOrCb, cb) {
        const command = new TagResourceCommand_1.TagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    untagResource(args, optionsOrCb, cb) {
        const command = new UntagResourceCommand_1.UntagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateAdmChannel(args, optionsOrCb, cb) {
        const command = new UpdateAdmChannelCommand_1.UpdateAdmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateApnsChannel(args, optionsOrCb, cb) {
        const command = new UpdateApnsChannelCommand_1.UpdateApnsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateApnsSandboxChannel(args, optionsOrCb, cb) {
        const command = new UpdateApnsSandboxChannelCommand_1.UpdateApnsSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateApnsVoipChannel(args, optionsOrCb, cb) {
        const command = new UpdateApnsVoipChannelCommand_1.UpdateApnsVoipChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateApnsVoipSandboxChannel(args, optionsOrCb, cb) {
        const command = new UpdateApnsVoipSandboxChannelCommand_1.UpdateApnsVoipSandboxChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateApplicationSettings(args, optionsOrCb, cb) {
        const command = new UpdateApplicationSettingsCommand_1.UpdateApplicationSettingsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateBaiduChannel(args, optionsOrCb, cb) {
        const command = new UpdateBaiduChannelCommand_1.UpdateBaiduChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateCampaign(args, optionsOrCb, cb) {
        const command = new UpdateCampaignCommand_1.UpdateCampaignCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateEmailChannel(args, optionsOrCb, cb) {
        const command = new UpdateEmailChannelCommand_1.UpdateEmailChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateEmailTemplate(args, optionsOrCb, cb) {
        const command = new UpdateEmailTemplateCommand_1.UpdateEmailTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateEndpoint(args, optionsOrCb, cb) {
        const command = new UpdateEndpointCommand_1.UpdateEndpointCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateEndpointsBatch(args, optionsOrCb, cb) {
        const command = new UpdateEndpointsBatchCommand_1.UpdateEndpointsBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateGcmChannel(args, optionsOrCb, cb) {
        const command = new UpdateGcmChannelCommand_1.UpdateGcmChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateJourney(args, optionsOrCb, cb) {
        const command = new UpdateJourneyCommand_1.UpdateJourneyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateJourneyState(args, optionsOrCb, cb) {
        const command = new UpdateJourneyStateCommand_1.UpdateJourneyStateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updatePushTemplate(args, optionsOrCb, cb) {
        const command = new UpdatePushTemplateCommand_1.UpdatePushTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateRecommenderConfiguration(args, optionsOrCb, cb) {
        const command = new UpdateRecommenderConfigurationCommand_1.UpdateRecommenderConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateSegment(args, optionsOrCb, cb) {
        const command = new UpdateSegmentCommand_1.UpdateSegmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateSmsChannel(args, optionsOrCb, cb) {
        const command = new UpdateSmsChannelCommand_1.UpdateSmsChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateSmsTemplate(args, optionsOrCb, cb) {
        const command = new UpdateSmsTemplateCommand_1.UpdateSmsTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateTemplateActiveVersion(args, optionsOrCb, cb) {
        const command = new UpdateTemplateActiveVersionCommand_1.UpdateTemplateActiveVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateVoiceChannel(args, optionsOrCb, cb) {
        const command = new UpdateVoiceChannelCommand_1.UpdateVoiceChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateVoiceTemplate(args, optionsOrCb, cb) {
        const command = new UpdateVoiceTemplateCommand_1.UpdateVoiceTemplateCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.Pinpoint = Pinpoint;
//# sourceMappingURL=Pinpoint.js.map