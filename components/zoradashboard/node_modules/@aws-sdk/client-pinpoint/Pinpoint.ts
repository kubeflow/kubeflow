import { PinpointClient } from "./PinpointClient";
import { CreateAppCommand, CreateAppCommandInput, CreateAppCommandOutput } from "./commands/CreateAppCommand";
import {
  CreateCampaignCommand,
  CreateCampaignCommandInput,
  CreateCampaignCommandOutput,
} from "./commands/CreateCampaignCommand";
import {
  CreateEmailTemplateCommand,
  CreateEmailTemplateCommandInput,
  CreateEmailTemplateCommandOutput,
} from "./commands/CreateEmailTemplateCommand";
import {
  CreateExportJobCommand,
  CreateExportJobCommandInput,
  CreateExportJobCommandOutput,
} from "./commands/CreateExportJobCommand";
import {
  CreateImportJobCommand,
  CreateImportJobCommandInput,
  CreateImportJobCommandOutput,
} from "./commands/CreateImportJobCommand";
import {
  CreateJourneyCommand,
  CreateJourneyCommandInput,
  CreateJourneyCommandOutput,
} from "./commands/CreateJourneyCommand";
import {
  CreatePushTemplateCommand,
  CreatePushTemplateCommandInput,
  CreatePushTemplateCommandOutput,
} from "./commands/CreatePushTemplateCommand";
import {
  CreateRecommenderConfigurationCommand,
  CreateRecommenderConfigurationCommandInput,
  CreateRecommenderConfigurationCommandOutput,
} from "./commands/CreateRecommenderConfigurationCommand";
import {
  CreateSegmentCommand,
  CreateSegmentCommandInput,
  CreateSegmentCommandOutput,
} from "./commands/CreateSegmentCommand";
import {
  CreateSmsTemplateCommand,
  CreateSmsTemplateCommandInput,
  CreateSmsTemplateCommandOutput,
} from "./commands/CreateSmsTemplateCommand";
import {
  CreateVoiceTemplateCommand,
  CreateVoiceTemplateCommandInput,
  CreateVoiceTemplateCommandOutput,
} from "./commands/CreateVoiceTemplateCommand";
import {
  DeleteAdmChannelCommand,
  DeleteAdmChannelCommandInput,
  DeleteAdmChannelCommandOutput,
} from "./commands/DeleteAdmChannelCommand";
import {
  DeleteApnsChannelCommand,
  DeleteApnsChannelCommandInput,
  DeleteApnsChannelCommandOutput,
} from "./commands/DeleteApnsChannelCommand";
import {
  DeleteApnsSandboxChannelCommand,
  DeleteApnsSandboxChannelCommandInput,
  DeleteApnsSandboxChannelCommandOutput,
} from "./commands/DeleteApnsSandboxChannelCommand";
import {
  DeleteApnsVoipChannelCommand,
  DeleteApnsVoipChannelCommandInput,
  DeleteApnsVoipChannelCommandOutput,
} from "./commands/DeleteApnsVoipChannelCommand";
import {
  DeleteApnsVoipSandboxChannelCommand,
  DeleteApnsVoipSandboxChannelCommandInput,
  DeleteApnsVoipSandboxChannelCommandOutput,
} from "./commands/DeleteApnsVoipSandboxChannelCommand";
import { DeleteAppCommand, DeleteAppCommandInput, DeleteAppCommandOutput } from "./commands/DeleteAppCommand";
import {
  DeleteBaiduChannelCommand,
  DeleteBaiduChannelCommandInput,
  DeleteBaiduChannelCommandOutput,
} from "./commands/DeleteBaiduChannelCommand";
import {
  DeleteCampaignCommand,
  DeleteCampaignCommandInput,
  DeleteCampaignCommandOutput,
} from "./commands/DeleteCampaignCommand";
import {
  DeleteEmailChannelCommand,
  DeleteEmailChannelCommandInput,
  DeleteEmailChannelCommandOutput,
} from "./commands/DeleteEmailChannelCommand";
import {
  DeleteEmailTemplateCommand,
  DeleteEmailTemplateCommandInput,
  DeleteEmailTemplateCommandOutput,
} from "./commands/DeleteEmailTemplateCommand";
import {
  DeleteEndpointCommand,
  DeleteEndpointCommandInput,
  DeleteEndpointCommandOutput,
} from "./commands/DeleteEndpointCommand";
import {
  DeleteEventStreamCommand,
  DeleteEventStreamCommandInput,
  DeleteEventStreamCommandOutput,
} from "./commands/DeleteEventStreamCommand";
import {
  DeleteGcmChannelCommand,
  DeleteGcmChannelCommandInput,
  DeleteGcmChannelCommandOutput,
} from "./commands/DeleteGcmChannelCommand";
import {
  DeleteJourneyCommand,
  DeleteJourneyCommandInput,
  DeleteJourneyCommandOutput,
} from "./commands/DeleteJourneyCommand";
import {
  DeletePushTemplateCommand,
  DeletePushTemplateCommandInput,
  DeletePushTemplateCommandOutput,
} from "./commands/DeletePushTemplateCommand";
import {
  DeleteRecommenderConfigurationCommand,
  DeleteRecommenderConfigurationCommandInput,
  DeleteRecommenderConfigurationCommandOutput,
} from "./commands/DeleteRecommenderConfigurationCommand";
import {
  DeleteSegmentCommand,
  DeleteSegmentCommandInput,
  DeleteSegmentCommandOutput,
} from "./commands/DeleteSegmentCommand";
import {
  DeleteSmsChannelCommand,
  DeleteSmsChannelCommandInput,
  DeleteSmsChannelCommandOutput,
} from "./commands/DeleteSmsChannelCommand";
import {
  DeleteSmsTemplateCommand,
  DeleteSmsTemplateCommandInput,
  DeleteSmsTemplateCommandOutput,
} from "./commands/DeleteSmsTemplateCommand";
import {
  DeleteUserEndpointsCommand,
  DeleteUserEndpointsCommandInput,
  DeleteUserEndpointsCommandOutput,
} from "./commands/DeleteUserEndpointsCommand";
import {
  DeleteVoiceChannelCommand,
  DeleteVoiceChannelCommandInput,
  DeleteVoiceChannelCommandOutput,
} from "./commands/DeleteVoiceChannelCommand";
import {
  DeleteVoiceTemplateCommand,
  DeleteVoiceTemplateCommandInput,
  DeleteVoiceTemplateCommandOutput,
} from "./commands/DeleteVoiceTemplateCommand";
import {
  GetAdmChannelCommand,
  GetAdmChannelCommandInput,
  GetAdmChannelCommandOutput,
} from "./commands/GetAdmChannelCommand";
import {
  GetApnsChannelCommand,
  GetApnsChannelCommandInput,
  GetApnsChannelCommandOutput,
} from "./commands/GetApnsChannelCommand";
import {
  GetApnsSandboxChannelCommand,
  GetApnsSandboxChannelCommandInput,
  GetApnsSandboxChannelCommandOutput,
} from "./commands/GetApnsSandboxChannelCommand";
import {
  GetApnsVoipChannelCommand,
  GetApnsVoipChannelCommandInput,
  GetApnsVoipChannelCommandOutput,
} from "./commands/GetApnsVoipChannelCommand";
import {
  GetApnsVoipSandboxChannelCommand,
  GetApnsVoipSandboxChannelCommandInput,
  GetApnsVoipSandboxChannelCommandOutput,
} from "./commands/GetApnsVoipSandboxChannelCommand";
import { GetAppCommand, GetAppCommandInput, GetAppCommandOutput } from "./commands/GetAppCommand";
import {
  GetApplicationDateRangeKpiCommand,
  GetApplicationDateRangeKpiCommandInput,
  GetApplicationDateRangeKpiCommandOutput,
} from "./commands/GetApplicationDateRangeKpiCommand";
import {
  GetApplicationSettingsCommand,
  GetApplicationSettingsCommandInput,
  GetApplicationSettingsCommandOutput,
} from "./commands/GetApplicationSettingsCommand";
import { GetAppsCommand, GetAppsCommandInput, GetAppsCommandOutput } from "./commands/GetAppsCommand";
import {
  GetBaiduChannelCommand,
  GetBaiduChannelCommandInput,
  GetBaiduChannelCommandOutput,
} from "./commands/GetBaiduChannelCommand";
import {
  GetCampaignActivitiesCommand,
  GetCampaignActivitiesCommandInput,
  GetCampaignActivitiesCommandOutput,
} from "./commands/GetCampaignActivitiesCommand";
import { GetCampaignCommand, GetCampaignCommandInput, GetCampaignCommandOutput } from "./commands/GetCampaignCommand";
import {
  GetCampaignDateRangeKpiCommand,
  GetCampaignDateRangeKpiCommandInput,
  GetCampaignDateRangeKpiCommandOutput,
} from "./commands/GetCampaignDateRangeKpiCommand";
import {
  GetCampaignVersionCommand,
  GetCampaignVersionCommandInput,
  GetCampaignVersionCommandOutput,
} from "./commands/GetCampaignVersionCommand";
import {
  GetCampaignVersionsCommand,
  GetCampaignVersionsCommandInput,
  GetCampaignVersionsCommandOutput,
} from "./commands/GetCampaignVersionsCommand";
import {
  GetCampaignsCommand,
  GetCampaignsCommandInput,
  GetCampaignsCommandOutput,
} from "./commands/GetCampaignsCommand";
import { GetChannelsCommand, GetChannelsCommandInput, GetChannelsCommandOutput } from "./commands/GetChannelsCommand";
import {
  GetEmailChannelCommand,
  GetEmailChannelCommandInput,
  GetEmailChannelCommandOutput,
} from "./commands/GetEmailChannelCommand";
import {
  GetEmailTemplateCommand,
  GetEmailTemplateCommandInput,
  GetEmailTemplateCommandOutput,
} from "./commands/GetEmailTemplateCommand";
import { GetEndpointCommand, GetEndpointCommandInput, GetEndpointCommandOutput } from "./commands/GetEndpointCommand";
import {
  GetEventStreamCommand,
  GetEventStreamCommandInput,
  GetEventStreamCommandOutput,
} from "./commands/GetEventStreamCommand";
import {
  GetExportJobCommand,
  GetExportJobCommandInput,
  GetExportJobCommandOutput,
} from "./commands/GetExportJobCommand";
import {
  GetExportJobsCommand,
  GetExportJobsCommandInput,
  GetExportJobsCommandOutput,
} from "./commands/GetExportJobsCommand";
import {
  GetGcmChannelCommand,
  GetGcmChannelCommandInput,
  GetGcmChannelCommandOutput,
} from "./commands/GetGcmChannelCommand";
import {
  GetImportJobCommand,
  GetImportJobCommandInput,
  GetImportJobCommandOutput,
} from "./commands/GetImportJobCommand";
import {
  GetImportJobsCommand,
  GetImportJobsCommandInput,
  GetImportJobsCommandOutput,
} from "./commands/GetImportJobsCommand";
import { GetJourneyCommand, GetJourneyCommandInput, GetJourneyCommandOutput } from "./commands/GetJourneyCommand";
import {
  GetJourneyDateRangeKpiCommand,
  GetJourneyDateRangeKpiCommandInput,
  GetJourneyDateRangeKpiCommandOutput,
} from "./commands/GetJourneyDateRangeKpiCommand";
import {
  GetJourneyExecutionActivityMetricsCommand,
  GetJourneyExecutionActivityMetricsCommandInput,
  GetJourneyExecutionActivityMetricsCommandOutput,
} from "./commands/GetJourneyExecutionActivityMetricsCommand";
import {
  GetJourneyExecutionMetricsCommand,
  GetJourneyExecutionMetricsCommandInput,
  GetJourneyExecutionMetricsCommandOutput,
} from "./commands/GetJourneyExecutionMetricsCommand";
import {
  GetPushTemplateCommand,
  GetPushTemplateCommandInput,
  GetPushTemplateCommandOutput,
} from "./commands/GetPushTemplateCommand";
import {
  GetRecommenderConfigurationCommand,
  GetRecommenderConfigurationCommandInput,
  GetRecommenderConfigurationCommandOutput,
} from "./commands/GetRecommenderConfigurationCommand";
import {
  GetRecommenderConfigurationsCommand,
  GetRecommenderConfigurationsCommandInput,
  GetRecommenderConfigurationsCommandOutput,
} from "./commands/GetRecommenderConfigurationsCommand";
import { GetSegmentCommand, GetSegmentCommandInput, GetSegmentCommandOutput } from "./commands/GetSegmentCommand";
import {
  GetSegmentExportJobsCommand,
  GetSegmentExportJobsCommandInput,
  GetSegmentExportJobsCommandOutput,
} from "./commands/GetSegmentExportJobsCommand";
import {
  GetSegmentImportJobsCommand,
  GetSegmentImportJobsCommandInput,
  GetSegmentImportJobsCommandOutput,
} from "./commands/GetSegmentImportJobsCommand";
import {
  GetSegmentVersionCommand,
  GetSegmentVersionCommandInput,
  GetSegmentVersionCommandOutput,
} from "./commands/GetSegmentVersionCommand";
import {
  GetSegmentVersionsCommand,
  GetSegmentVersionsCommandInput,
  GetSegmentVersionsCommandOutput,
} from "./commands/GetSegmentVersionsCommand";
import { GetSegmentsCommand, GetSegmentsCommandInput, GetSegmentsCommandOutput } from "./commands/GetSegmentsCommand";
import {
  GetSmsChannelCommand,
  GetSmsChannelCommandInput,
  GetSmsChannelCommandOutput,
} from "./commands/GetSmsChannelCommand";
import {
  GetSmsTemplateCommand,
  GetSmsTemplateCommandInput,
  GetSmsTemplateCommandOutput,
} from "./commands/GetSmsTemplateCommand";
import {
  GetUserEndpointsCommand,
  GetUserEndpointsCommandInput,
  GetUserEndpointsCommandOutput,
} from "./commands/GetUserEndpointsCommand";
import {
  GetVoiceChannelCommand,
  GetVoiceChannelCommandInput,
  GetVoiceChannelCommandOutput,
} from "./commands/GetVoiceChannelCommand";
import {
  GetVoiceTemplateCommand,
  GetVoiceTemplateCommandInput,
  GetVoiceTemplateCommandOutput,
} from "./commands/GetVoiceTemplateCommand";
import {
  ListJourneysCommand,
  ListJourneysCommandInput,
  ListJourneysCommandOutput,
} from "./commands/ListJourneysCommand";
import {
  ListTagsForResourceCommand,
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import {
  ListTemplateVersionsCommand,
  ListTemplateVersionsCommandInput,
  ListTemplateVersionsCommandOutput,
} from "./commands/ListTemplateVersionsCommand";
import {
  ListTemplatesCommand,
  ListTemplatesCommandInput,
  ListTemplatesCommandOutput,
} from "./commands/ListTemplatesCommand";
import {
  PhoneNumberValidateCommand,
  PhoneNumberValidateCommandInput,
  PhoneNumberValidateCommandOutput,
} from "./commands/PhoneNumberValidateCommand";
import {
  PutEventStreamCommand,
  PutEventStreamCommandInput,
  PutEventStreamCommandOutput,
} from "./commands/PutEventStreamCommand";
import { PutEventsCommand, PutEventsCommandInput, PutEventsCommandOutput } from "./commands/PutEventsCommand";
import {
  RemoveAttributesCommand,
  RemoveAttributesCommandInput,
  RemoveAttributesCommandOutput,
} from "./commands/RemoveAttributesCommand";
import {
  SendMessagesCommand,
  SendMessagesCommandInput,
  SendMessagesCommandOutput,
} from "./commands/SendMessagesCommand";
import {
  SendUsersMessagesCommand,
  SendUsersMessagesCommandInput,
  SendUsersMessagesCommandOutput,
} from "./commands/SendUsersMessagesCommand";
import { TagResourceCommand, TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import {
  UntagResourceCommand,
  UntagResourceCommandInput,
  UntagResourceCommandOutput,
} from "./commands/UntagResourceCommand";
import {
  UpdateAdmChannelCommand,
  UpdateAdmChannelCommandInput,
  UpdateAdmChannelCommandOutput,
} from "./commands/UpdateAdmChannelCommand";
import {
  UpdateApnsChannelCommand,
  UpdateApnsChannelCommandInput,
  UpdateApnsChannelCommandOutput,
} from "./commands/UpdateApnsChannelCommand";
import {
  UpdateApnsSandboxChannelCommand,
  UpdateApnsSandboxChannelCommandInput,
  UpdateApnsSandboxChannelCommandOutput,
} from "./commands/UpdateApnsSandboxChannelCommand";
import {
  UpdateApnsVoipChannelCommand,
  UpdateApnsVoipChannelCommandInput,
  UpdateApnsVoipChannelCommandOutput,
} from "./commands/UpdateApnsVoipChannelCommand";
import {
  UpdateApnsVoipSandboxChannelCommand,
  UpdateApnsVoipSandboxChannelCommandInput,
  UpdateApnsVoipSandboxChannelCommandOutput,
} from "./commands/UpdateApnsVoipSandboxChannelCommand";
import {
  UpdateApplicationSettingsCommand,
  UpdateApplicationSettingsCommandInput,
  UpdateApplicationSettingsCommandOutput,
} from "./commands/UpdateApplicationSettingsCommand";
import {
  UpdateBaiduChannelCommand,
  UpdateBaiduChannelCommandInput,
  UpdateBaiduChannelCommandOutput,
} from "./commands/UpdateBaiduChannelCommand";
import {
  UpdateCampaignCommand,
  UpdateCampaignCommandInput,
  UpdateCampaignCommandOutput,
} from "./commands/UpdateCampaignCommand";
import {
  UpdateEmailChannelCommand,
  UpdateEmailChannelCommandInput,
  UpdateEmailChannelCommandOutput,
} from "./commands/UpdateEmailChannelCommand";
import {
  UpdateEmailTemplateCommand,
  UpdateEmailTemplateCommandInput,
  UpdateEmailTemplateCommandOutput,
} from "./commands/UpdateEmailTemplateCommand";
import {
  UpdateEndpointCommand,
  UpdateEndpointCommandInput,
  UpdateEndpointCommandOutput,
} from "./commands/UpdateEndpointCommand";
import {
  UpdateEndpointsBatchCommand,
  UpdateEndpointsBatchCommandInput,
  UpdateEndpointsBatchCommandOutput,
} from "./commands/UpdateEndpointsBatchCommand";
import {
  UpdateGcmChannelCommand,
  UpdateGcmChannelCommandInput,
  UpdateGcmChannelCommandOutput,
} from "./commands/UpdateGcmChannelCommand";
import {
  UpdateJourneyCommand,
  UpdateJourneyCommandInput,
  UpdateJourneyCommandOutput,
} from "./commands/UpdateJourneyCommand";
import {
  UpdateJourneyStateCommand,
  UpdateJourneyStateCommandInput,
  UpdateJourneyStateCommandOutput,
} from "./commands/UpdateJourneyStateCommand";
import {
  UpdatePushTemplateCommand,
  UpdatePushTemplateCommandInput,
  UpdatePushTemplateCommandOutput,
} from "./commands/UpdatePushTemplateCommand";
import {
  UpdateRecommenderConfigurationCommand,
  UpdateRecommenderConfigurationCommandInput,
  UpdateRecommenderConfigurationCommandOutput,
} from "./commands/UpdateRecommenderConfigurationCommand";
import {
  UpdateSegmentCommand,
  UpdateSegmentCommandInput,
  UpdateSegmentCommandOutput,
} from "./commands/UpdateSegmentCommand";
import {
  UpdateSmsChannelCommand,
  UpdateSmsChannelCommandInput,
  UpdateSmsChannelCommandOutput,
} from "./commands/UpdateSmsChannelCommand";
import {
  UpdateSmsTemplateCommand,
  UpdateSmsTemplateCommandInput,
  UpdateSmsTemplateCommandOutput,
} from "./commands/UpdateSmsTemplateCommand";
import {
  UpdateTemplateActiveVersionCommand,
  UpdateTemplateActiveVersionCommandInput,
  UpdateTemplateActiveVersionCommandOutput,
} from "./commands/UpdateTemplateActiveVersionCommand";
import {
  UpdateVoiceChannelCommand,
  UpdateVoiceChannelCommandInput,
  UpdateVoiceChannelCommandOutput,
} from "./commands/UpdateVoiceChannelCommand";
import {
  UpdateVoiceTemplateCommand,
  UpdateVoiceTemplateCommandInput,
  UpdateVoiceTemplateCommandOutput,
} from "./commands/UpdateVoiceTemplateCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

/**
 * <p>Doc Engage API - Amazon Pinpoint API</p>
 */
export class Pinpoint extends PinpointClient {
  /**
   * <p>Creates an application.</p>
   */
  public createApp(args: CreateAppCommandInput, options?: __HttpHandlerOptions): Promise<CreateAppCommandOutput>;
  public createApp(args: CreateAppCommandInput, cb: (err: any, data?: CreateAppCommandOutput) => void): void;
  public createApp(
    args: CreateAppCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateAppCommandOutput) => void
  ): void;
  public createApp(
    args: CreateAppCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateAppCommandOutput) => void),
    cb?: (err: any, data?: CreateAppCommandOutput) => void
  ): Promise<CreateAppCommandOutput> | void {
    const command = new CreateAppCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new campaign for an application or updates the settings of an existing campaign for an application.</p>
   */
  public createCampaign(
    args: CreateCampaignCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateCampaignCommandOutput>;
  public createCampaign(
    args: CreateCampaignCommandInput,
    cb: (err: any, data?: CreateCampaignCommandOutput) => void
  ): void;
  public createCampaign(
    args: CreateCampaignCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateCampaignCommandOutput) => void
  ): void;
  public createCampaign(
    args: CreateCampaignCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateCampaignCommandOutput) => void),
    cb?: (err: any, data?: CreateCampaignCommandOutput) => void
  ): Promise<CreateCampaignCommandOutput> | void {
    const command = new CreateCampaignCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a message template for messages that are sent through the email channel.</p>
   */
  public createEmailTemplate(
    args: CreateEmailTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateEmailTemplateCommandOutput>;
  public createEmailTemplate(
    args: CreateEmailTemplateCommandInput,
    cb: (err: any, data?: CreateEmailTemplateCommandOutput) => void
  ): void;
  public createEmailTemplate(
    args: CreateEmailTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateEmailTemplateCommandOutput) => void
  ): void;
  public createEmailTemplate(
    args: CreateEmailTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateEmailTemplateCommandOutput) => void),
    cb?: (err: any, data?: CreateEmailTemplateCommandOutput) => void
  ): Promise<CreateEmailTemplateCommandOutput> | void {
    const command = new CreateEmailTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates an export job for an application.</p>
   */
  public createExportJob(
    args: CreateExportJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateExportJobCommandOutput>;
  public createExportJob(
    args: CreateExportJobCommandInput,
    cb: (err: any, data?: CreateExportJobCommandOutput) => void
  ): void;
  public createExportJob(
    args: CreateExportJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateExportJobCommandOutput) => void
  ): void;
  public createExportJob(
    args: CreateExportJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateExportJobCommandOutput) => void),
    cb?: (err: any, data?: CreateExportJobCommandOutput) => void
  ): Promise<CreateExportJobCommandOutput> | void {
    const command = new CreateExportJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates an import job for an application.</p>
   */
  public createImportJob(
    args: CreateImportJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateImportJobCommandOutput>;
  public createImportJob(
    args: CreateImportJobCommandInput,
    cb: (err: any, data?: CreateImportJobCommandOutput) => void
  ): void;
  public createImportJob(
    args: CreateImportJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateImportJobCommandOutput) => void
  ): void;
  public createImportJob(
    args: CreateImportJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateImportJobCommandOutput) => void),
    cb?: (err: any, data?: CreateImportJobCommandOutput) => void
  ): Promise<CreateImportJobCommandOutput> | void {
    const command = new CreateImportJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a journey for an application.</p>
   */
  public createJourney(
    args: CreateJourneyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateJourneyCommandOutput>;
  public createJourney(
    args: CreateJourneyCommandInput,
    cb: (err: any, data?: CreateJourneyCommandOutput) => void
  ): void;
  public createJourney(
    args: CreateJourneyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateJourneyCommandOutput) => void
  ): void;
  public createJourney(
    args: CreateJourneyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateJourneyCommandOutput) => void),
    cb?: (err: any, data?: CreateJourneyCommandOutput) => void
  ): Promise<CreateJourneyCommandOutput> | void {
    const command = new CreateJourneyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a message template for messages that are sent through a push notification channel.</p>
   */
  public createPushTemplate(
    args: CreatePushTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreatePushTemplateCommandOutput>;
  public createPushTemplate(
    args: CreatePushTemplateCommandInput,
    cb: (err: any, data?: CreatePushTemplateCommandOutput) => void
  ): void;
  public createPushTemplate(
    args: CreatePushTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreatePushTemplateCommandOutput) => void
  ): void;
  public createPushTemplate(
    args: CreatePushTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreatePushTemplateCommandOutput) => void),
    cb?: (err: any, data?: CreatePushTemplateCommandOutput) => void
  ): Promise<CreatePushTemplateCommandOutput> | void {
    const command = new CreatePushTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates an Amazon Pinpoint configuration for a recommender model.</p>
   */
  public createRecommenderConfiguration(
    args: CreateRecommenderConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateRecommenderConfigurationCommandOutput>;
  public createRecommenderConfiguration(
    args: CreateRecommenderConfigurationCommandInput,
    cb: (err: any, data?: CreateRecommenderConfigurationCommandOutput) => void
  ): void;
  public createRecommenderConfiguration(
    args: CreateRecommenderConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateRecommenderConfigurationCommandOutput) => void
  ): void;
  public createRecommenderConfiguration(
    args: CreateRecommenderConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateRecommenderConfigurationCommandOutput) => void),
    cb?: (err: any, data?: CreateRecommenderConfigurationCommandOutput) => void
  ): Promise<CreateRecommenderConfigurationCommandOutput> | void {
    const command = new CreateRecommenderConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.</p>
   */
  public createSegment(
    args: CreateSegmentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateSegmentCommandOutput>;
  public createSegment(
    args: CreateSegmentCommandInput,
    cb: (err: any, data?: CreateSegmentCommandOutput) => void
  ): void;
  public createSegment(
    args: CreateSegmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateSegmentCommandOutput) => void
  ): void;
  public createSegment(
    args: CreateSegmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateSegmentCommandOutput) => void),
    cb?: (err: any, data?: CreateSegmentCommandOutput) => void
  ): Promise<CreateSegmentCommandOutput> | void {
    const command = new CreateSegmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a message template for messages that are sent through the SMS channel.</p>
   */
  public createSmsTemplate(
    args: CreateSmsTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateSmsTemplateCommandOutput>;
  public createSmsTemplate(
    args: CreateSmsTemplateCommandInput,
    cb: (err: any, data?: CreateSmsTemplateCommandOutput) => void
  ): void;
  public createSmsTemplate(
    args: CreateSmsTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateSmsTemplateCommandOutput) => void
  ): void;
  public createSmsTemplate(
    args: CreateSmsTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateSmsTemplateCommandOutput) => void),
    cb?: (err: any, data?: CreateSmsTemplateCommandOutput) => void
  ): Promise<CreateSmsTemplateCommandOutput> | void {
    const command = new CreateSmsTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a message template for messages that are sent through the voice channel.</p>
   */
  public createVoiceTemplate(
    args: CreateVoiceTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<CreateVoiceTemplateCommandOutput>;
  public createVoiceTemplate(
    args: CreateVoiceTemplateCommandInput,
    cb: (err: any, data?: CreateVoiceTemplateCommandOutput) => void
  ): void;
  public createVoiceTemplate(
    args: CreateVoiceTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateVoiceTemplateCommandOutput) => void
  ): void;
  public createVoiceTemplate(
    args: CreateVoiceTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateVoiceTemplateCommandOutput) => void),
    cb?: (err: any, data?: CreateVoiceTemplateCommandOutput) => void
  ): Promise<CreateVoiceTemplateCommandOutput> | void {
    const command = new CreateVoiceTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the ADM channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteAdmChannel(
    args: DeleteAdmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteAdmChannelCommandOutput>;
  public deleteAdmChannel(
    args: DeleteAdmChannelCommandInput,
    cb: (err: any, data?: DeleteAdmChannelCommandOutput) => void
  ): void;
  public deleteAdmChannel(
    args: DeleteAdmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteAdmChannelCommandOutput) => void
  ): void;
  public deleteAdmChannel(
    args: DeleteAdmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteAdmChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteAdmChannelCommandOutput) => void
  ): Promise<DeleteAdmChannelCommandOutput> | void {
    const command = new DeleteAdmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the APNs channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteApnsChannel(
    args: DeleteApnsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteApnsChannelCommandOutput>;
  public deleteApnsChannel(
    args: DeleteApnsChannelCommandInput,
    cb: (err: any, data?: DeleteApnsChannelCommandOutput) => void
  ): void;
  public deleteApnsChannel(
    args: DeleteApnsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteApnsChannelCommandOutput) => void
  ): void;
  public deleteApnsChannel(
    args: DeleteApnsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteApnsChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteApnsChannelCommandOutput) => void
  ): Promise<DeleteApnsChannelCommandOutput> | void {
    const command = new DeleteApnsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the APNs sandbox channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteApnsSandboxChannel(
    args: DeleteApnsSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteApnsSandboxChannelCommandOutput>;
  public deleteApnsSandboxChannel(
    args: DeleteApnsSandboxChannelCommandInput,
    cb: (err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void
  ): void;
  public deleteApnsSandboxChannel(
    args: DeleteApnsSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void
  ): void;
  public deleteApnsSandboxChannel(
    args: DeleteApnsSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteApnsSandboxChannelCommandOutput) => void
  ): Promise<DeleteApnsSandboxChannelCommandOutput> | void {
    const command = new DeleteApnsSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the APNs VoIP channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteApnsVoipChannel(
    args: DeleteApnsVoipChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteApnsVoipChannelCommandOutput>;
  public deleteApnsVoipChannel(
    args: DeleteApnsVoipChannelCommandInput,
    cb: (err: any, data?: DeleteApnsVoipChannelCommandOutput) => void
  ): void;
  public deleteApnsVoipChannel(
    args: DeleteApnsVoipChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteApnsVoipChannelCommandOutput) => void
  ): void;
  public deleteApnsVoipChannel(
    args: DeleteApnsVoipChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteApnsVoipChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteApnsVoipChannelCommandOutput) => void
  ): Promise<DeleteApnsVoipChannelCommandOutput> | void {
    const command = new DeleteApnsVoipChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the APNs VoIP sandbox channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteApnsVoipSandboxChannel(
    args: DeleteApnsVoipSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteApnsVoipSandboxChannelCommandOutput>;
  public deleteApnsVoipSandboxChannel(
    args: DeleteApnsVoipSandboxChannelCommandInput,
    cb: (err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public deleteApnsVoipSandboxChannel(
    args: DeleteApnsVoipSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public deleteApnsVoipSandboxChannel(
    args: DeleteApnsVoipSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteApnsVoipSandboxChannelCommandOutput) => void
  ): Promise<DeleteApnsVoipSandboxChannelCommandOutput> | void {
    const command = new DeleteApnsVoipSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an application.</p>
   */
  public deleteApp(args: DeleteAppCommandInput, options?: __HttpHandlerOptions): Promise<DeleteAppCommandOutput>;
  public deleteApp(args: DeleteAppCommandInput, cb: (err: any, data?: DeleteAppCommandOutput) => void): void;
  public deleteApp(
    args: DeleteAppCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteAppCommandOutput) => void
  ): void;
  public deleteApp(
    args: DeleteAppCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteAppCommandOutput) => void),
    cb?: (err: any, data?: DeleteAppCommandOutput) => void
  ): Promise<DeleteAppCommandOutput> | void {
    const command = new DeleteAppCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the Baidu channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteBaiduChannel(
    args: DeleteBaiduChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteBaiduChannelCommandOutput>;
  public deleteBaiduChannel(
    args: DeleteBaiduChannelCommandInput,
    cb: (err: any, data?: DeleteBaiduChannelCommandOutput) => void
  ): void;
  public deleteBaiduChannel(
    args: DeleteBaiduChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteBaiduChannelCommandOutput) => void
  ): void;
  public deleteBaiduChannel(
    args: DeleteBaiduChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteBaiduChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteBaiduChannelCommandOutput) => void
  ): Promise<DeleteBaiduChannelCommandOutput> | void {
    const command = new DeleteBaiduChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a campaign from an application.</p>
   */
  public deleteCampaign(
    args: DeleteCampaignCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteCampaignCommandOutput>;
  public deleteCampaign(
    args: DeleteCampaignCommandInput,
    cb: (err: any, data?: DeleteCampaignCommandOutput) => void
  ): void;
  public deleteCampaign(
    args: DeleteCampaignCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteCampaignCommandOutput) => void
  ): void;
  public deleteCampaign(
    args: DeleteCampaignCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteCampaignCommandOutput) => void),
    cb?: (err: any, data?: DeleteCampaignCommandOutput) => void
  ): Promise<DeleteCampaignCommandOutput> | void {
    const command = new DeleteCampaignCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the email channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteEmailChannel(
    args: DeleteEmailChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEmailChannelCommandOutput>;
  public deleteEmailChannel(
    args: DeleteEmailChannelCommandInput,
    cb: (err: any, data?: DeleteEmailChannelCommandOutput) => void
  ): void;
  public deleteEmailChannel(
    args: DeleteEmailChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEmailChannelCommandOutput) => void
  ): void;
  public deleteEmailChannel(
    args: DeleteEmailChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEmailChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteEmailChannelCommandOutput) => void
  ): Promise<DeleteEmailChannelCommandOutput> | void {
    const command = new DeleteEmailChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a message template for messages that were sent through the email channel.</p>
   */
  public deleteEmailTemplate(
    args: DeleteEmailTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEmailTemplateCommandOutput>;
  public deleteEmailTemplate(
    args: DeleteEmailTemplateCommandInput,
    cb: (err: any, data?: DeleteEmailTemplateCommandOutput) => void
  ): void;
  public deleteEmailTemplate(
    args: DeleteEmailTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEmailTemplateCommandOutput) => void
  ): void;
  public deleteEmailTemplate(
    args: DeleteEmailTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEmailTemplateCommandOutput) => void),
    cb?: (err: any, data?: DeleteEmailTemplateCommandOutput) => void
  ): Promise<DeleteEmailTemplateCommandOutput> | void {
    const command = new DeleteEmailTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an endpoint from an application.</p>
   */
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEndpointCommandOutput>;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): void;
  public deleteEndpoint(
    args: DeleteEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEndpointCommandOutput) => void),
    cb?: (err: any, data?: DeleteEndpointCommandOutput) => void
  ): Promise<DeleteEndpointCommandOutput> | void {
    const command = new DeleteEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes the event stream for an application.</p>
   */
  public deleteEventStream(
    args: DeleteEventStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteEventStreamCommandOutput>;
  public deleteEventStream(
    args: DeleteEventStreamCommandInput,
    cb: (err: any, data?: DeleteEventStreamCommandOutput) => void
  ): void;
  public deleteEventStream(
    args: DeleteEventStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteEventStreamCommandOutput) => void
  ): void;
  public deleteEventStream(
    args: DeleteEventStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteEventStreamCommandOutput) => void),
    cb?: (err: any, data?: DeleteEventStreamCommandOutput) => void
  ): Promise<DeleteEventStreamCommandOutput> | void {
    const command = new DeleteEventStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the GCM channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteGcmChannel(
    args: DeleteGcmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteGcmChannelCommandOutput>;
  public deleteGcmChannel(
    args: DeleteGcmChannelCommandInput,
    cb: (err: any, data?: DeleteGcmChannelCommandOutput) => void
  ): void;
  public deleteGcmChannel(
    args: DeleteGcmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteGcmChannelCommandOutput) => void
  ): void;
  public deleteGcmChannel(
    args: DeleteGcmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteGcmChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteGcmChannelCommandOutput) => void
  ): Promise<DeleteGcmChannelCommandOutput> | void {
    const command = new DeleteGcmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a journey from an application.</p>
   */
  public deleteJourney(
    args: DeleteJourneyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteJourneyCommandOutput>;
  public deleteJourney(
    args: DeleteJourneyCommandInput,
    cb: (err: any, data?: DeleteJourneyCommandOutput) => void
  ): void;
  public deleteJourney(
    args: DeleteJourneyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteJourneyCommandOutput) => void
  ): void;
  public deleteJourney(
    args: DeleteJourneyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteJourneyCommandOutput) => void),
    cb?: (err: any, data?: DeleteJourneyCommandOutput) => void
  ): Promise<DeleteJourneyCommandOutput> | void {
    const command = new DeleteJourneyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a message template for messages that were sent through a push notification channel.</p>
   */
  public deletePushTemplate(
    args: DeletePushTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeletePushTemplateCommandOutput>;
  public deletePushTemplate(
    args: DeletePushTemplateCommandInput,
    cb: (err: any, data?: DeletePushTemplateCommandOutput) => void
  ): void;
  public deletePushTemplate(
    args: DeletePushTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeletePushTemplateCommandOutput) => void
  ): void;
  public deletePushTemplate(
    args: DeletePushTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeletePushTemplateCommandOutput) => void),
    cb?: (err: any, data?: DeletePushTemplateCommandOutput) => void
  ): Promise<DeletePushTemplateCommandOutput> | void {
    const command = new DeletePushTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes an Amazon Pinpoint configuration for a recommender model.</p>
   */
  public deleteRecommenderConfiguration(
    args: DeleteRecommenderConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteRecommenderConfigurationCommandOutput>;
  public deleteRecommenderConfiguration(
    args: DeleteRecommenderConfigurationCommandInput,
    cb: (err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void
  ): void;
  public deleteRecommenderConfiguration(
    args: DeleteRecommenderConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void
  ): void;
  public deleteRecommenderConfiguration(
    args: DeleteRecommenderConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void),
    cb?: (err: any, data?: DeleteRecommenderConfigurationCommandOutput) => void
  ): Promise<DeleteRecommenderConfigurationCommandOutput> | void {
    const command = new DeleteRecommenderConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a segment from an application.</p>
   */
  public deleteSegment(
    args: DeleteSegmentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSegmentCommandOutput>;
  public deleteSegment(
    args: DeleteSegmentCommandInput,
    cb: (err: any, data?: DeleteSegmentCommandOutput) => void
  ): void;
  public deleteSegment(
    args: DeleteSegmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSegmentCommandOutput) => void
  ): void;
  public deleteSegment(
    args: DeleteSegmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteSegmentCommandOutput) => void),
    cb?: (err: any, data?: DeleteSegmentCommandOutput) => void
  ): Promise<DeleteSegmentCommandOutput> | void {
    const command = new DeleteSegmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the SMS channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteSmsChannel(
    args: DeleteSmsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSmsChannelCommandOutput>;
  public deleteSmsChannel(
    args: DeleteSmsChannelCommandInput,
    cb: (err: any, data?: DeleteSmsChannelCommandOutput) => void
  ): void;
  public deleteSmsChannel(
    args: DeleteSmsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSmsChannelCommandOutput) => void
  ): void;
  public deleteSmsChannel(
    args: DeleteSmsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteSmsChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteSmsChannelCommandOutput) => void
  ): Promise<DeleteSmsChannelCommandOutput> | void {
    const command = new DeleteSmsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a message template for messages that were sent through the SMS channel.</p>
   */
  public deleteSmsTemplate(
    args: DeleteSmsTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteSmsTemplateCommandOutput>;
  public deleteSmsTemplate(
    args: DeleteSmsTemplateCommandInput,
    cb: (err: any, data?: DeleteSmsTemplateCommandOutput) => void
  ): void;
  public deleteSmsTemplate(
    args: DeleteSmsTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteSmsTemplateCommandOutput) => void
  ): void;
  public deleteSmsTemplate(
    args: DeleteSmsTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteSmsTemplateCommandOutput) => void),
    cb?: (err: any, data?: DeleteSmsTemplateCommandOutput) => void
  ): Promise<DeleteSmsTemplateCommandOutput> | void {
    const command = new DeleteSmsTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes all the endpoints that are associated with a specific user ID.</p>
   */
  public deleteUserEndpoints(
    args: DeleteUserEndpointsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteUserEndpointsCommandOutput>;
  public deleteUserEndpoints(
    args: DeleteUserEndpointsCommandInput,
    cb: (err: any, data?: DeleteUserEndpointsCommandOutput) => void
  ): void;
  public deleteUserEndpoints(
    args: DeleteUserEndpointsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteUserEndpointsCommandOutput) => void
  ): void;
  public deleteUserEndpoints(
    args: DeleteUserEndpointsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteUserEndpointsCommandOutput) => void),
    cb?: (err: any, data?: DeleteUserEndpointsCommandOutput) => void
  ): Promise<DeleteUserEndpointsCommandOutput> | void {
    const command = new DeleteUserEndpointsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Disables the voice channel for an application and deletes any existing settings for the channel.</p>
   */
  public deleteVoiceChannel(
    args: DeleteVoiceChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteVoiceChannelCommandOutput>;
  public deleteVoiceChannel(
    args: DeleteVoiceChannelCommandInput,
    cb: (err: any, data?: DeleteVoiceChannelCommandOutput) => void
  ): void;
  public deleteVoiceChannel(
    args: DeleteVoiceChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteVoiceChannelCommandOutput) => void
  ): void;
  public deleteVoiceChannel(
    args: DeleteVoiceChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteVoiceChannelCommandOutput) => void),
    cb?: (err: any, data?: DeleteVoiceChannelCommandOutput) => void
  ): Promise<DeleteVoiceChannelCommandOutput> | void {
    const command = new DeleteVoiceChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Deletes a message template for messages that were sent through the voice channel.</p>
   */
  public deleteVoiceTemplate(
    args: DeleteVoiceTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<DeleteVoiceTemplateCommandOutput>;
  public deleteVoiceTemplate(
    args: DeleteVoiceTemplateCommandInput,
    cb: (err: any, data?: DeleteVoiceTemplateCommandOutput) => void
  ): void;
  public deleteVoiceTemplate(
    args: DeleteVoiceTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteVoiceTemplateCommandOutput) => void
  ): void;
  public deleteVoiceTemplate(
    args: DeleteVoiceTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteVoiceTemplateCommandOutput) => void),
    cb?: (err: any, data?: DeleteVoiceTemplateCommandOutput) => void
  ): Promise<DeleteVoiceTemplateCommandOutput> | void {
    const command = new DeleteVoiceTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the ADM channel for an application.</p>
   */
  public getAdmChannel(
    args: GetAdmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetAdmChannelCommandOutput>;
  public getAdmChannel(
    args: GetAdmChannelCommandInput,
    cb: (err: any, data?: GetAdmChannelCommandOutput) => void
  ): void;
  public getAdmChannel(
    args: GetAdmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetAdmChannelCommandOutput) => void
  ): void;
  public getAdmChannel(
    args: GetAdmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetAdmChannelCommandOutput) => void),
    cb?: (err: any, data?: GetAdmChannelCommandOutput) => void
  ): Promise<GetAdmChannelCommandOutput> | void {
    const command = new GetAdmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the APNs channel for an application.</p>
   */
  public getApnsChannel(
    args: GetApnsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApnsChannelCommandOutput>;
  public getApnsChannel(
    args: GetApnsChannelCommandInput,
    cb: (err: any, data?: GetApnsChannelCommandOutput) => void
  ): void;
  public getApnsChannel(
    args: GetApnsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApnsChannelCommandOutput) => void
  ): void;
  public getApnsChannel(
    args: GetApnsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApnsChannelCommandOutput) => void),
    cb?: (err: any, data?: GetApnsChannelCommandOutput) => void
  ): Promise<GetApnsChannelCommandOutput> | void {
    const command = new GetApnsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the APNs sandbox channel for an application.</p>
   */
  public getApnsSandboxChannel(
    args: GetApnsSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApnsSandboxChannelCommandOutput>;
  public getApnsSandboxChannel(
    args: GetApnsSandboxChannelCommandInput,
    cb: (err: any, data?: GetApnsSandboxChannelCommandOutput) => void
  ): void;
  public getApnsSandboxChannel(
    args: GetApnsSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApnsSandboxChannelCommandOutput) => void
  ): void;
  public getApnsSandboxChannel(
    args: GetApnsSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApnsSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: GetApnsSandboxChannelCommandOutput) => void
  ): Promise<GetApnsSandboxChannelCommandOutput> | void {
    const command = new GetApnsSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the APNs VoIP channel for an application.</p>
   */
  public getApnsVoipChannel(
    args: GetApnsVoipChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApnsVoipChannelCommandOutput>;
  public getApnsVoipChannel(
    args: GetApnsVoipChannelCommandInput,
    cb: (err: any, data?: GetApnsVoipChannelCommandOutput) => void
  ): void;
  public getApnsVoipChannel(
    args: GetApnsVoipChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApnsVoipChannelCommandOutput) => void
  ): void;
  public getApnsVoipChannel(
    args: GetApnsVoipChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApnsVoipChannelCommandOutput) => void),
    cb?: (err: any, data?: GetApnsVoipChannelCommandOutput) => void
  ): Promise<GetApnsVoipChannelCommandOutput> | void {
    const command = new GetApnsVoipChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the APNs VoIP sandbox channel for an application.</p>
   */
  public getApnsVoipSandboxChannel(
    args: GetApnsVoipSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApnsVoipSandboxChannelCommandOutput>;
  public getApnsVoipSandboxChannel(
    args: GetApnsVoipSandboxChannelCommandInput,
    cb: (err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public getApnsVoipSandboxChannel(
    args: GetApnsVoipSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public getApnsVoipSandboxChannel(
    args: GetApnsVoipSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: GetApnsVoipSandboxChannelCommandOutput) => void
  ): Promise<GetApnsVoipSandboxChannelCommandOutput> | void {
    const command = new GetApnsVoipSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about an application.</p>
   */
  public getApp(args: GetAppCommandInput, options?: __HttpHandlerOptions): Promise<GetAppCommandOutput>;
  public getApp(args: GetAppCommandInput, cb: (err: any, data?: GetAppCommandOutput) => void): void;
  public getApp(
    args: GetAppCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetAppCommandOutput) => void
  ): void;
  public getApp(
    args: GetAppCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetAppCommandOutput) => void),
    cb?: (err: any, data?: GetAppCommandOutput) => void
  ): Promise<GetAppCommandOutput> | void {
    const command = new GetAppCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves (queries) pre-aggregated data for a standard metric that applies to an application.</p>
   */
  public getApplicationDateRangeKpi(
    args: GetApplicationDateRangeKpiCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApplicationDateRangeKpiCommandOutput>;
  public getApplicationDateRangeKpi(
    args: GetApplicationDateRangeKpiCommandInput,
    cb: (err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void
  ): void;
  public getApplicationDateRangeKpi(
    args: GetApplicationDateRangeKpiCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void
  ): void;
  public getApplicationDateRangeKpi(
    args: GetApplicationDateRangeKpiCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void),
    cb?: (err: any, data?: GetApplicationDateRangeKpiCommandOutput) => void
  ): Promise<GetApplicationDateRangeKpiCommandOutput> | void {
    const command = new GetApplicationDateRangeKpiCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the settings for an application.</p>
   */
  public getApplicationSettings(
    args: GetApplicationSettingsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetApplicationSettingsCommandOutput>;
  public getApplicationSettings(
    args: GetApplicationSettingsCommandInput,
    cb: (err: any, data?: GetApplicationSettingsCommandOutput) => void
  ): void;
  public getApplicationSettings(
    args: GetApplicationSettingsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetApplicationSettingsCommandOutput) => void
  ): void;
  public getApplicationSettings(
    args: GetApplicationSettingsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetApplicationSettingsCommandOutput) => void),
    cb?: (err: any, data?: GetApplicationSettingsCommandOutput) => void
  ): Promise<GetApplicationSettingsCommandOutput> | void {
    const command = new GetApplicationSettingsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the applications that are associated with your Amazon Pinpoint account.</p>
   */
  public getApps(args: GetAppsCommandInput, options?: __HttpHandlerOptions): Promise<GetAppsCommandOutput>;
  public getApps(args: GetAppsCommandInput, cb: (err: any, data?: GetAppsCommandOutput) => void): void;
  public getApps(
    args: GetAppsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetAppsCommandOutput) => void
  ): void;
  public getApps(
    args: GetAppsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetAppsCommandOutput) => void),
    cb?: (err: any, data?: GetAppsCommandOutput) => void
  ): Promise<GetAppsCommandOutput> | void {
    const command = new GetAppsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the Baidu channel for an application.</p>
   */
  public getBaiduChannel(
    args: GetBaiduChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetBaiduChannelCommandOutput>;
  public getBaiduChannel(
    args: GetBaiduChannelCommandInput,
    cb: (err: any, data?: GetBaiduChannelCommandOutput) => void
  ): void;
  public getBaiduChannel(
    args: GetBaiduChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetBaiduChannelCommandOutput) => void
  ): void;
  public getBaiduChannel(
    args: GetBaiduChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetBaiduChannelCommandOutput) => void),
    cb?: (err: any, data?: GetBaiduChannelCommandOutput) => void
  ): Promise<GetBaiduChannelCommandOutput> | void {
    const command = new GetBaiduChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for a campaign.</p>
   */
  public getCampaign(args: GetCampaignCommandInput, options?: __HttpHandlerOptions): Promise<GetCampaignCommandOutput>;
  public getCampaign(args: GetCampaignCommandInput, cb: (err: any, data?: GetCampaignCommandOutput) => void): void;
  public getCampaign(
    args: GetCampaignCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignCommandOutput) => void
  ): void;
  public getCampaign(
    args: GetCampaignCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignCommandOutput) => void
  ): Promise<GetCampaignCommandOutput> | void {
    const command = new GetCampaignCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the activities for a campaign.</p>
   */
  public getCampaignActivities(
    args: GetCampaignActivitiesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCampaignActivitiesCommandOutput>;
  public getCampaignActivities(
    args: GetCampaignActivitiesCommandInput,
    cb: (err: any, data?: GetCampaignActivitiesCommandOutput) => void
  ): void;
  public getCampaignActivities(
    args: GetCampaignActivitiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignActivitiesCommandOutput) => void
  ): void;
  public getCampaignActivities(
    args: GetCampaignActivitiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignActivitiesCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignActivitiesCommandOutput) => void
  ): Promise<GetCampaignActivitiesCommandOutput> | void {
    const command = new GetCampaignActivitiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves (queries) pre-aggregated data for a standard metric that applies to a campaign.</p>
   */
  public getCampaignDateRangeKpi(
    args: GetCampaignDateRangeKpiCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCampaignDateRangeKpiCommandOutput>;
  public getCampaignDateRangeKpi(
    args: GetCampaignDateRangeKpiCommandInput,
    cb: (err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void
  ): void;
  public getCampaignDateRangeKpi(
    args: GetCampaignDateRangeKpiCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void
  ): void;
  public getCampaignDateRangeKpi(
    args: GetCampaignDateRangeKpiCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignDateRangeKpiCommandOutput) => void
  ): Promise<GetCampaignDateRangeKpiCommandOutput> | void {
    const command = new GetCampaignDateRangeKpiCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for all the campaigns that are associated with an application.</p>
   */
  public getCampaigns(
    args: GetCampaignsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCampaignsCommandOutput>;
  public getCampaigns(args: GetCampaignsCommandInput, cb: (err: any, data?: GetCampaignsCommandOutput) => void): void;
  public getCampaigns(
    args: GetCampaignsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignsCommandOutput) => void
  ): void;
  public getCampaigns(
    args: GetCampaignsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignsCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignsCommandOutput) => void
  ): Promise<GetCampaignsCommandOutput> | void {
    const command = new GetCampaignsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for a specific version of a campaign.</p>
   */
  public getCampaignVersion(
    args: GetCampaignVersionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCampaignVersionCommandOutput>;
  public getCampaignVersion(
    args: GetCampaignVersionCommandInput,
    cb: (err: any, data?: GetCampaignVersionCommandOutput) => void
  ): void;
  public getCampaignVersion(
    args: GetCampaignVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignVersionCommandOutput) => void
  ): void;
  public getCampaignVersion(
    args: GetCampaignVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignVersionCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignVersionCommandOutput) => void
  ): Promise<GetCampaignVersionCommandOutput> | void {
    const command = new GetCampaignVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for all versions of a campaign.</p>
   */
  public getCampaignVersions(
    args: GetCampaignVersionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetCampaignVersionsCommandOutput>;
  public getCampaignVersions(
    args: GetCampaignVersionsCommandInput,
    cb: (err: any, data?: GetCampaignVersionsCommandOutput) => void
  ): void;
  public getCampaignVersions(
    args: GetCampaignVersionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetCampaignVersionsCommandOutput) => void
  ): void;
  public getCampaignVersions(
    args: GetCampaignVersionsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetCampaignVersionsCommandOutput) => void),
    cb?: (err: any, data?: GetCampaignVersionsCommandOutput) => void
  ): Promise<GetCampaignVersionsCommandOutput> | void {
    const command = new GetCampaignVersionsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the history and status of each channel for an application.</p>
   */
  public getChannels(args: GetChannelsCommandInput, options?: __HttpHandlerOptions): Promise<GetChannelsCommandOutput>;
  public getChannels(args: GetChannelsCommandInput, cb: (err: any, data?: GetChannelsCommandOutput) => void): void;
  public getChannels(
    args: GetChannelsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetChannelsCommandOutput) => void
  ): void;
  public getChannels(
    args: GetChannelsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetChannelsCommandOutput) => void),
    cb?: (err: any, data?: GetChannelsCommandOutput) => void
  ): Promise<GetChannelsCommandOutput> | void {
    const command = new GetChannelsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the email channel for an application.</p>
   */
  public getEmailChannel(
    args: GetEmailChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetEmailChannelCommandOutput>;
  public getEmailChannel(
    args: GetEmailChannelCommandInput,
    cb: (err: any, data?: GetEmailChannelCommandOutput) => void
  ): void;
  public getEmailChannel(
    args: GetEmailChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetEmailChannelCommandOutput) => void
  ): void;
  public getEmailChannel(
    args: GetEmailChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetEmailChannelCommandOutput) => void),
    cb?: (err: any, data?: GetEmailChannelCommandOutput) => void
  ): Promise<GetEmailChannelCommandOutput> | void {
    const command = new GetEmailChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the content and settings of a message template for messages that are sent through the email channel.</p>
   */
  public getEmailTemplate(
    args: GetEmailTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetEmailTemplateCommandOutput>;
  public getEmailTemplate(
    args: GetEmailTemplateCommandInput,
    cb: (err: any, data?: GetEmailTemplateCommandOutput) => void
  ): void;
  public getEmailTemplate(
    args: GetEmailTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetEmailTemplateCommandOutput) => void
  ): void;
  public getEmailTemplate(
    args: GetEmailTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetEmailTemplateCommandOutput) => void),
    cb?: (err: any, data?: GetEmailTemplateCommandOutput) => void
  ): Promise<GetEmailTemplateCommandOutput> | void {
    const command = new GetEmailTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the settings and attributes of a specific endpoint for an application.</p>
   */
  public getEndpoint(args: GetEndpointCommandInput, options?: __HttpHandlerOptions): Promise<GetEndpointCommandOutput>;
  public getEndpoint(args: GetEndpointCommandInput, cb: (err: any, data?: GetEndpointCommandOutput) => void): void;
  public getEndpoint(
    args: GetEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetEndpointCommandOutput) => void
  ): void;
  public getEndpoint(
    args: GetEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetEndpointCommandOutput) => void),
    cb?: (err: any, data?: GetEndpointCommandOutput) => void
  ): Promise<GetEndpointCommandOutput> | void {
    const command = new GetEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the event stream settings for an application.</p>
   */
  public getEventStream(
    args: GetEventStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetEventStreamCommandOutput>;
  public getEventStream(
    args: GetEventStreamCommandInput,
    cb: (err: any, data?: GetEventStreamCommandOutput) => void
  ): void;
  public getEventStream(
    args: GetEventStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetEventStreamCommandOutput) => void
  ): void;
  public getEventStream(
    args: GetEventStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetEventStreamCommandOutput) => void),
    cb?: (err: any, data?: GetEventStreamCommandOutput) => void
  ): Promise<GetEventStreamCommandOutput> | void {
    const command = new GetEventStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of a specific export job for an application.</p>
   */
  public getExportJob(
    args: GetExportJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetExportJobCommandOutput>;
  public getExportJob(args: GetExportJobCommandInput, cb: (err: any, data?: GetExportJobCommandOutput) => void): void;
  public getExportJob(
    args: GetExportJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetExportJobCommandOutput) => void
  ): void;
  public getExportJob(
    args: GetExportJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetExportJobCommandOutput) => void),
    cb?: (err: any, data?: GetExportJobCommandOutput) => void
  ): Promise<GetExportJobCommandOutput> | void {
    const command = new GetExportJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of all the export jobs for an application.</p>
   */
  public getExportJobs(
    args: GetExportJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetExportJobsCommandOutput>;
  public getExportJobs(
    args: GetExportJobsCommandInput,
    cb: (err: any, data?: GetExportJobsCommandOutput) => void
  ): void;
  public getExportJobs(
    args: GetExportJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetExportJobsCommandOutput) => void
  ): void;
  public getExportJobs(
    args: GetExportJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetExportJobsCommandOutput) => void),
    cb?: (err: any, data?: GetExportJobsCommandOutput) => void
  ): Promise<GetExportJobsCommandOutput> | void {
    const command = new GetExportJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the GCM channel for an application.</p>
   */
  public getGcmChannel(
    args: GetGcmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetGcmChannelCommandOutput>;
  public getGcmChannel(
    args: GetGcmChannelCommandInput,
    cb: (err: any, data?: GetGcmChannelCommandOutput) => void
  ): void;
  public getGcmChannel(
    args: GetGcmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGcmChannelCommandOutput) => void
  ): void;
  public getGcmChannel(
    args: GetGcmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGcmChannelCommandOutput) => void),
    cb?: (err: any, data?: GetGcmChannelCommandOutput) => void
  ): Promise<GetGcmChannelCommandOutput> | void {
    const command = new GetGcmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of a specific import job for an application.</p>
   */
  public getImportJob(
    args: GetImportJobCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetImportJobCommandOutput>;
  public getImportJob(args: GetImportJobCommandInput, cb: (err: any, data?: GetImportJobCommandOutput) => void): void;
  public getImportJob(
    args: GetImportJobCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetImportJobCommandOutput) => void
  ): void;
  public getImportJob(
    args: GetImportJobCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetImportJobCommandOutput) => void),
    cb?: (err: any, data?: GetImportJobCommandOutput) => void
  ): Promise<GetImportJobCommandOutput> | void {
    const command = new GetImportJobCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of all the import jobs for an application.</p>
   */
  public getImportJobs(
    args: GetImportJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetImportJobsCommandOutput>;
  public getImportJobs(
    args: GetImportJobsCommandInput,
    cb: (err: any, data?: GetImportJobsCommandOutput) => void
  ): void;
  public getImportJobs(
    args: GetImportJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetImportJobsCommandOutput) => void
  ): void;
  public getImportJobs(
    args: GetImportJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetImportJobsCommandOutput) => void),
    cb?: (err: any, data?: GetImportJobsCommandOutput) => void
  ): Promise<GetImportJobsCommandOutput> | void {
    const command = new GetImportJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for a journey.</p>
   */
  public getJourney(args: GetJourneyCommandInput, options?: __HttpHandlerOptions): Promise<GetJourneyCommandOutput>;
  public getJourney(args: GetJourneyCommandInput, cb: (err: any, data?: GetJourneyCommandOutput) => void): void;
  public getJourney(
    args: GetJourneyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetJourneyCommandOutput) => void
  ): void;
  public getJourney(
    args: GetJourneyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetJourneyCommandOutput) => void),
    cb?: (err: any, data?: GetJourneyCommandOutput) => void
  ): Promise<GetJourneyCommandOutput> | void {
    const command = new GetJourneyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves (queries) pre-aggregated data for a standard engagement metric that applies to a journey.</p>
   */
  public getJourneyDateRangeKpi(
    args: GetJourneyDateRangeKpiCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetJourneyDateRangeKpiCommandOutput>;
  public getJourneyDateRangeKpi(
    args: GetJourneyDateRangeKpiCommandInput,
    cb: (err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void
  ): void;
  public getJourneyDateRangeKpi(
    args: GetJourneyDateRangeKpiCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void
  ): void;
  public getJourneyDateRangeKpi(
    args: GetJourneyDateRangeKpiCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void),
    cb?: (err: any, data?: GetJourneyDateRangeKpiCommandOutput) => void
  ): Promise<GetJourneyDateRangeKpiCommandOutput> | void {
    const command = new GetJourneyDateRangeKpiCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey activity.</p>
   */
  public getJourneyExecutionActivityMetrics(
    args: GetJourneyExecutionActivityMetricsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetJourneyExecutionActivityMetricsCommandOutput>;
  public getJourneyExecutionActivityMetrics(
    args: GetJourneyExecutionActivityMetricsCommandInput,
    cb: (err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void
  ): void;
  public getJourneyExecutionActivityMetrics(
    args: GetJourneyExecutionActivityMetricsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void
  ): void;
  public getJourneyExecutionActivityMetrics(
    args: GetJourneyExecutionActivityMetricsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void),
    cb?: (err: any, data?: GetJourneyExecutionActivityMetricsCommandOutput) => void
  ): Promise<GetJourneyExecutionActivityMetricsCommandOutput> | void {
    const command = new GetJourneyExecutionActivityMetricsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey.</p>
   */
  public getJourneyExecutionMetrics(
    args: GetJourneyExecutionMetricsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetJourneyExecutionMetricsCommandOutput>;
  public getJourneyExecutionMetrics(
    args: GetJourneyExecutionMetricsCommandInput,
    cb: (err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void
  ): void;
  public getJourneyExecutionMetrics(
    args: GetJourneyExecutionMetricsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void
  ): void;
  public getJourneyExecutionMetrics(
    args: GetJourneyExecutionMetricsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void),
    cb?: (err: any, data?: GetJourneyExecutionMetricsCommandOutput) => void
  ): Promise<GetJourneyExecutionMetricsCommandOutput> | void {
    const command = new GetJourneyExecutionMetricsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the content and settings of a message template for messages that are sent through a push notification channel.</p>
   */
  public getPushTemplate(
    args: GetPushTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetPushTemplateCommandOutput>;
  public getPushTemplate(
    args: GetPushTemplateCommandInput,
    cb: (err: any, data?: GetPushTemplateCommandOutput) => void
  ): void;
  public getPushTemplate(
    args: GetPushTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetPushTemplateCommandOutput) => void
  ): void;
  public getPushTemplate(
    args: GetPushTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetPushTemplateCommandOutput) => void),
    cb?: (err: any, data?: GetPushTemplateCommandOutput) => void
  ): Promise<GetPushTemplateCommandOutput> | void {
    const command = new GetPushTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about an Amazon Pinpoint configuration for a recommender model.</p>
   */
  public getRecommenderConfiguration(
    args: GetRecommenderConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetRecommenderConfigurationCommandOutput>;
  public getRecommenderConfiguration(
    args: GetRecommenderConfigurationCommandInput,
    cb: (err: any, data?: GetRecommenderConfigurationCommandOutput) => void
  ): void;
  public getRecommenderConfiguration(
    args: GetRecommenderConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRecommenderConfigurationCommandOutput) => void
  ): void;
  public getRecommenderConfiguration(
    args: GetRecommenderConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetRecommenderConfigurationCommandOutput) => void),
    cb?: (err: any, data?: GetRecommenderConfigurationCommandOutput) => void
  ): Promise<GetRecommenderConfigurationCommandOutput> | void {
    const command = new GetRecommenderConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the recommender model configurations that are associated with your Amazon Pinpoint account.</p>
   */
  public getRecommenderConfigurations(
    args: GetRecommenderConfigurationsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetRecommenderConfigurationsCommandOutput>;
  public getRecommenderConfigurations(
    args: GetRecommenderConfigurationsCommandInput,
    cb: (err: any, data?: GetRecommenderConfigurationsCommandOutput) => void
  ): void;
  public getRecommenderConfigurations(
    args: GetRecommenderConfigurationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRecommenderConfigurationsCommandOutput) => void
  ): void;
  public getRecommenderConfigurations(
    args: GetRecommenderConfigurationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetRecommenderConfigurationsCommandOutput) => void),
    cb?: (err: any, data?: GetRecommenderConfigurationsCommandOutput) => void
  ): Promise<GetRecommenderConfigurationsCommandOutput> | void {
    const command = new GetRecommenderConfigurationsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the configuration, dimension, and other settings for a specific segment that's associated with an application.</p>
   */
  public getSegment(args: GetSegmentCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentCommandOutput>;
  public getSegment(args: GetSegmentCommandInput, cb: (err: any, data?: GetSegmentCommandOutput) => void): void;
  public getSegment(
    args: GetSegmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentCommandOutput) => void
  ): void;
  public getSegment(
    args: GetSegmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentCommandOutput) => void
  ): Promise<GetSegmentCommandOutput> | void {
    const command = new GetSegmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the export jobs for a segment.</p>
   */
  public getSegmentExportJobs(
    args: GetSegmentExportJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSegmentExportJobsCommandOutput>;
  public getSegmentExportJobs(
    args: GetSegmentExportJobsCommandInput,
    cb: (err: any, data?: GetSegmentExportJobsCommandOutput) => void
  ): void;
  public getSegmentExportJobs(
    args: GetSegmentExportJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentExportJobsCommandOutput) => void
  ): void;
  public getSegmentExportJobs(
    args: GetSegmentExportJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentExportJobsCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentExportJobsCommandOutput) => void
  ): Promise<GetSegmentExportJobsCommandOutput> | void {
    const command = new GetSegmentExportJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the import jobs for a segment.</p>
   */
  public getSegmentImportJobs(
    args: GetSegmentImportJobsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSegmentImportJobsCommandOutput>;
  public getSegmentImportJobs(
    args: GetSegmentImportJobsCommandInput,
    cb: (err: any, data?: GetSegmentImportJobsCommandOutput) => void
  ): void;
  public getSegmentImportJobs(
    args: GetSegmentImportJobsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentImportJobsCommandOutput) => void
  ): void;
  public getSegmentImportJobs(
    args: GetSegmentImportJobsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentImportJobsCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentImportJobsCommandOutput) => void
  ): Promise<GetSegmentImportJobsCommandOutput> | void {
    const command = new GetSegmentImportJobsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the configuration, dimension, and other settings for all the segments that are associated with an application.</p>
   */
  public getSegments(args: GetSegmentsCommandInput, options?: __HttpHandlerOptions): Promise<GetSegmentsCommandOutput>;
  public getSegments(args: GetSegmentsCommandInput, cb: (err: any, data?: GetSegmentsCommandOutput) => void): void;
  public getSegments(
    args: GetSegmentsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentsCommandOutput) => void
  ): void;
  public getSegments(
    args: GetSegmentsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentsCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentsCommandOutput) => void
  ): Promise<GetSegmentsCommandOutput> | void {
    const command = new GetSegmentsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the configuration, dimension, and other settings for a specific version of a segment that's associated with an application.</p>
   */
  public getSegmentVersion(
    args: GetSegmentVersionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSegmentVersionCommandOutput>;
  public getSegmentVersion(
    args: GetSegmentVersionCommandInput,
    cb: (err: any, data?: GetSegmentVersionCommandOutput) => void
  ): void;
  public getSegmentVersion(
    args: GetSegmentVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentVersionCommandOutput) => void
  ): void;
  public getSegmentVersion(
    args: GetSegmentVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentVersionCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentVersionCommandOutput) => void
  ): Promise<GetSegmentVersionCommandOutput> | void {
    const command = new GetSegmentVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the configuration, dimension, and other settings for all the versions of a specific segment that's associated with an application.</p>
   */
  public getSegmentVersions(
    args: GetSegmentVersionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSegmentVersionsCommandOutput>;
  public getSegmentVersions(
    args: GetSegmentVersionsCommandInput,
    cb: (err: any, data?: GetSegmentVersionsCommandOutput) => void
  ): void;
  public getSegmentVersions(
    args: GetSegmentVersionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSegmentVersionsCommandOutput) => void
  ): void;
  public getSegmentVersions(
    args: GetSegmentVersionsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSegmentVersionsCommandOutput) => void),
    cb?: (err: any, data?: GetSegmentVersionsCommandOutput) => void
  ): Promise<GetSegmentVersionsCommandOutput> | void {
    const command = new GetSegmentVersionsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the SMS channel for an application.</p>
   */
  public getSmsChannel(
    args: GetSmsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSmsChannelCommandOutput>;
  public getSmsChannel(
    args: GetSmsChannelCommandInput,
    cb: (err: any, data?: GetSmsChannelCommandOutput) => void
  ): void;
  public getSmsChannel(
    args: GetSmsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSmsChannelCommandOutput) => void
  ): void;
  public getSmsChannel(
    args: GetSmsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSmsChannelCommandOutput) => void),
    cb?: (err: any, data?: GetSmsChannelCommandOutput) => void
  ): Promise<GetSmsChannelCommandOutput> | void {
    const command = new GetSmsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the content and settings of a message template for messages that are sent through the SMS channel.</p>
   */
  public getSmsTemplate(
    args: GetSmsTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetSmsTemplateCommandOutput>;
  public getSmsTemplate(
    args: GetSmsTemplateCommandInput,
    cb: (err: any, data?: GetSmsTemplateCommandOutput) => void
  ): void;
  public getSmsTemplate(
    args: GetSmsTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSmsTemplateCommandOutput) => void
  ): void;
  public getSmsTemplate(
    args: GetSmsTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSmsTemplateCommandOutput) => void),
    cb?: (err: any, data?: GetSmsTemplateCommandOutput) => void
  ): Promise<GetSmsTemplateCommandOutput> | void {
    const command = new GetSmsTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the endpoints that are associated with a specific user ID.</p>
   */
  public getUserEndpoints(
    args: GetUserEndpointsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetUserEndpointsCommandOutput>;
  public getUserEndpoints(
    args: GetUserEndpointsCommandInput,
    cb: (err: any, data?: GetUserEndpointsCommandOutput) => void
  ): void;
  public getUserEndpoints(
    args: GetUserEndpointsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetUserEndpointsCommandOutput) => void
  ): void;
  public getUserEndpoints(
    args: GetUserEndpointsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetUserEndpointsCommandOutput) => void),
    cb?: (err: any, data?: GetUserEndpointsCommandOutput) => void
  ): Promise<GetUserEndpointsCommandOutput> | void {
    const command = new GetUserEndpointsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status and settings of the voice channel for an application.</p>
   */
  public getVoiceChannel(
    args: GetVoiceChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetVoiceChannelCommandOutput>;
  public getVoiceChannel(
    args: GetVoiceChannelCommandInput,
    cb: (err: any, data?: GetVoiceChannelCommandOutput) => void
  ): void;
  public getVoiceChannel(
    args: GetVoiceChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetVoiceChannelCommandOutput) => void
  ): void;
  public getVoiceChannel(
    args: GetVoiceChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetVoiceChannelCommandOutput) => void),
    cb?: (err: any, data?: GetVoiceChannelCommandOutput) => void
  ): Promise<GetVoiceChannelCommandOutput> | void {
    const command = new GetVoiceChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves the content and settings of a message template for messages that are sent through the voice channel.</p>
   */
  public getVoiceTemplate(
    args: GetVoiceTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<GetVoiceTemplateCommandOutput>;
  public getVoiceTemplate(
    args: GetVoiceTemplateCommandInput,
    cb: (err: any, data?: GetVoiceTemplateCommandOutput) => void
  ): void;
  public getVoiceTemplate(
    args: GetVoiceTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetVoiceTemplateCommandOutput) => void
  ): void;
  public getVoiceTemplate(
    args: GetVoiceTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetVoiceTemplateCommandOutput) => void),
    cb?: (err: any, data?: GetVoiceTemplateCommandOutput) => void
  ): Promise<GetVoiceTemplateCommandOutput> | void {
    const command = new GetVoiceTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about the status, configuration, and other settings for all the journeys that are associated with an application.</p>
   */
  public listJourneys(
    args: ListJourneysCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListJourneysCommandOutput>;
  public listJourneys(args: ListJourneysCommandInput, cb: (err: any, data?: ListJourneysCommandOutput) => void): void;
  public listJourneys(
    args: ListJourneysCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListJourneysCommandOutput) => void
  ): void;
  public listJourneys(
    args: ListJourneysCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListJourneysCommandOutput) => void),
    cb?: (err: any, data?: ListJourneysCommandOutput) => void
  ): Promise<ListJourneysCommandOutput> | void {
    const command = new ListJourneysCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves all the tags (keys and values) that are associated with an application, campaign, message template, or segment.</p>
   */
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTagsForResourceCommandOutput>;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): void;
  public listTagsForResource(
    args: ListTagsForResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTagsForResourceCommandOutput) => void),
    cb?: (err: any, data?: ListTagsForResourceCommandOutput) => void
  ): Promise<ListTagsForResourceCommandOutput> | void {
    const command = new ListTagsForResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the message templates that are associated with your Amazon Pinpoint account.</p>
   */
  public listTemplates(
    args: ListTemplatesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTemplatesCommandOutput>;
  public listTemplates(
    args: ListTemplatesCommandInput,
    cb: (err: any, data?: ListTemplatesCommandOutput) => void
  ): void;
  public listTemplates(
    args: ListTemplatesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTemplatesCommandOutput) => void
  ): void;
  public listTemplates(
    args: ListTemplatesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTemplatesCommandOutput) => void),
    cb?: (err: any, data?: ListTemplatesCommandOutput) => void
  ): Promise<ListTemplatesCommandOutput> | void {
    const command = new ListTemplatesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about all the versions of a specific message template.</p>
   */
  public listTemplateVersions(
    args: ListTemplateVersionsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<ListTemplateVersionsCommandOutput>;
  public listTemplateVersions(
    args: ListTemplateVersionsCommandInput,
    cb: (err: any, data?: ListTemplateVersionsCommandOutput) => void
  ): void;
  public listTemplateVersions(
    args: ListTemplateVersionsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListTemplateVersionsCommandOutput) => void
  ): void;
  public listTemplateVersions(
    args: ListTemplateVersionsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListTemplateVersionsCommandOutput) => void),
    cb?: (err: any, data?: ListTemplateVersionsCommandOutput) => void
  ): Promise<ListTemplateVersionsCommandOutput> | void {
    const command = new ListTemplateVersionsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Retrieves information about a phone number.</p>
   */
  public phoneNumberValidate(
    args: PhoneNumberValidateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PhoneNumberValidateCommandOutput>;
  public phoneNumberValidate(
    args: PhoneNumberValidateCommandInput,
    cb: (err: any, data?: PhoneNumberValidateCommandOutput) => void
  ): void;
  public phoneNumberValidate(
    args: PhoneNumberValidateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PhoneNumberValidateCommandOutput) => void
  ): void;
  public phoneNumberValidate(
    args: PhoneNumberValidateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PhoneNumberValidateCommandOutput) => void),
    cb?: (err: any, data?: PhoneNumberValidateCommandOutput) => void
  ): Promise<PhoneNumberValidateCommandOutput> | void {
    const command = new PhoneNumberValidateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new event to record for endpoints, or creates or updates endpoint data that existing events are associated with.</p>
   */
  public putEvents(args: PutEventsCommandInput, options?: __HttpHandlerOptions): Promise<PutEventsCommandOutput>;
  public putEvents(args: PutEventsCommandInput, cb: (err: any, data?: PutEventsCommandOutput) => void): void;
  public putEvents(
    args: PutEventsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutEventsCommandOutput) => void
  ): void;
  public putEvents(
    args: PutEventsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutEventsCommandOutput) => void),
    cb?: (err: any, data?: PutEventsCommandOutput) => void
  ): Promise<PutEventsCommandOutput> | void {
    const command = new PutEventsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new event stream for an application or updates the settings of an existing event stream for an application.</p>
   */
  public putEventStream(
    args: PutEventStreamCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<PutEventStreamCommandOutput>;
  public putEventStream(
    args: PutEventStreamCommandInput,
    cb: (err: any, data?: PutEventStreamCommandOutput) => void
  ): void;
  public putEventStream(
    args: PutEventStreamCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PutEventStreamCommandOutput) => void
  ): void;
  public putEventStream(
    args: PutEventStreamCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PutEventStreamCommandOutput) => void),
    cb?: (err: any, data?: PutEventStreamCommandOutput) => void
  ): Promise<PutEventStreamCommandOutput> | void {
    const command = new PutEventStreamCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes one or more attributes, of the same attribute type, from all the endpoints that are associated with an application.</p>
   */
  public removeAttributes(
    args: RemoveAttributesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<RemoveAttributesCommandOutput>;
  public removeAttributes(
    args: RemoveAttributesCommandInput,
    cb: (err: any, data?: RemoveAttributesCommandOutput) => void
  ): void;
  public removeAttributes(
    args: RemoveAttributesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RemoveAttributesCommandOutput) => void
  ): void;
  public removeAttributes(
    args: RemoveAttributesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RemoveAttributesCommandOutput) => void),
    cb?: (err: any, data?: RemoveAttributesCommandOutput) => void
  ): Promise<RemoveAttributesCommandOutput> | void {
    const command = new RemoveAttributesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates and sends a direct message.</p>
   */
  public sendMessages(
    args: SendMessagesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SendMessagesCommandOutput>;
  public sendMessages(args: SendMessagesCommandInput, cb: (err: any, data?: SendMessagesCommandOutput) => void): void;
  public sendMessages(
    args: SendMessagesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SendMessagesCommandOutput) => void
  ): void;
  public sendMessages(
    args: SendMessagesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SendMessagesCommandOutput) => void),
    cb?: (err: any, data?: SendMessagesCommandOutput) => void
  ): Promise<SendMessagesCommandOutput> | void {
    const command = new SendMessagesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates and sends a message to a list of users.</p>
   */
  public sendUsersMessages(
    args: SendUsersMessagesCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<SendUsersMessagesCommandOutput>;
  public sendUsersMessages(
    args: SendUsersMessagesCommandInput,
    cb: (err: any, data?: SendUsersMessagesCommandOutput) => void
  ): void;
  public sendUsersMessages(
    args: SendUsersMessagesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SendUsersMessagesCommandOutput) => void
  ): void;
  public sendUsersMessages(
    args: SendUsersMessagesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SendUsersMessagesCommandOutput) => void),
    cb?: (err: any, data?: SendUsersMessagesCommandOutput) => void
  ): Promise<SendUsersMessagesCommandOutput> | void {
    const command = new SendUsersMessagesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Adds one or more tags (keys and values) to an application, campaign, message template, or segment.</p>
   */
  public tagResource(args: TagResourceCommandInput, options?: __HttpHandlerOptions): Promise<TagResourceCommandOutput>;
  public tagResource(args: TagResourceCommandInput, cb: (err: any, data?: TagResourceCommandOutput) => void): void;
  public tagResource(
    args: TagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TagResourceCommandOutput) => void
  ): void;
  public tagResource(
    args: TagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TagResourceCommandOutput) => void),
    cb?: (err: any, data?: TagResourceCommandOutput) => void
  ): Promise<TagResourceCommandOutput> | void {
    const command = new TagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Removes one or more tags (keys and values) from an application, campaign, message template, or segment.</p>
   */
  public untagResource(
    args: UntagResourceCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UntagResourceCommandOutput>;
  public untagResource(
    args: UntagResourceCommandInput,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UntagResourceCommandOutput) => void
  ): void;
  public untagResource(
    args: UntagResourceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UntagResourceCommandOutput) => void),
    cb?: (err: any, data?: UntagResourceCommandOutput) => void
  ): Promise<UntagResourceCommandOutput> | void {
    const command = new UntagResourceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the ADM channel for an application or updates the status and settings of the ADM channel for an application.</p>
   */
  public updateAdmChannel(
    args: UpdateAdmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateAdmChannelCommandOutput>;
  public updateAdmChannel(
    args: UpdateAdmChannelCommandInput,
    cb: (err: any, data?: UpdateAdmChannelCommandOutput) => void
  ): void;
  public updateAdmChannel(
    args: UpdateAdmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateAdmChannelCommandOutput) => void
  ): void;
  public updateAdmChannel(
    args: UpdateAdmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateAdmChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateAdmChannelCommandOutput) => void
  ): Promise<UpdateAdmChannelCommandOutput> | void {
    const command = new UpdateAdmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the APNs channel for an application or updates the status and settings of the APNs channel for an application.</p>
   */
  public updateApnsChannel(
    args: UpdateApnsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateApnsChannelCommandOutput>;
  public updateApnsChannel(
    args: UpdateApnsChannelCommandInput,
    cb: (err: any, data?: UpdateApnsChannelCommandOutput) => void
  ): void;
  public updateApnsChannel(
    args: UpdateApnsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateApnsChannelCommandOutput) => void
  ): void;
  public updateApnsChannel(
    args: UpdateApnsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateApnsChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateApnsChannelCommandOutput) => void
  ): Promise<UpdateApnsChannelCommandOutput> | void {
    const command = new UpdateApnsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the APNs sandbox channel for an application or updates the status and settings of the APNs sandbox channel for an application.</p>
   */
  public updateApnsSandboxChannel(
    args: UpdateApnsSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateApnsSandboxChannelCommandOutput>;
  public updateApnsSandboxChannel(
    args: UpdateApnsSandboxChannelCommandInput,
    cb: (err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void
  ): void;
  public updateApnsSandboxChannel(
    args: UpdateApnsSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void
  ): void;
  public updateApnsSandboxChannel(
    args: UpdateApnsSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateApnsSandboxChannelCommandOutput) => void
  ): Promise<UpdateApnsSandboxChannelCommandOutput> | void {
    const command = new UpdateApnsSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the APNs VoIP channel for an application or updates the status and settings of the APNs VoIP channel for an application.</p>
   */
  public updateApnsVoipChannel(
    args: UpdateApnsVoipChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateApnsVoipChannelCommandOutput>;
  public updateApnsVoipChannel(
    args: UpdateApnsVoipChannelCommandInput,
    cb: (err: any, data?: UpdateApnsVoipChannelCommandOutput) => void
  ): void;
  public updateApnsVoipChannel(
    args: UpdateApnsVoipChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateApnsVoipChannelCommandOutput) => void
  ): void;
  public updateApnsVoipChannel(
    args: UpdateApnsVoipChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateApnsVoipChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateApnsVoipChannelCommandOutput) => void
  ): Promise<UpdateApnsVoipChannelCommandOutput> | void {
    const command = new UpdateApnsVoipChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the APNs VoIP sandbox channel for an application or updates the status and settings of the APNs VoIP sandbox channel for an application.</p>
   */
  public updateApnsVoipSandboxChannel(
    args: UpdateApnsVoipSandboxChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateApnsVoipSandboxChannelCommandOutput>;
  public updateApnsVoipSandboxChannel(
    args: UpdateApnsVoipSandboxChannelCommandInput,
    cb: (err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public updateApnsVoipSandboxChannel(
    args: UpdateApnsVoipSandboxChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void
  ): void;
  public updateApnsVoipSandboxChannel(
    args: UpdateApnsVoipSandboxChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateApnsVoipSandboxChannelCommandOutput) => void
  ): Promise<UpdateApnsVoipSandboxChannelCommandOutput> | void {
    const command = new UpdateApnsVoipSandboxChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates the settings for an application.</p>
   */
  public updateApplicationSettings(
    args: UpdateApplicationSettingsCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateApplicationSettingsCommandOutput>;
  public updateApplicationSettings(
    args: UpdateApplicationSettingsCommandInput,
    cb: (err: any, data?: UpdateApplicationSettingsCommandOutput) => void
  ): void;
  public updateApplicationSettings(
    args: UpdateApplicationSettingsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateApplicationSettingsCommandOutput) => void
  ): void;
  public updateApplicationSettings(
    args: UpdateApplicationSettingsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateApplicationSettingsCommandOutput) => void),
    cb?: (err: any, data?: UpdateApplicationSettingsCommandOutput) => void
  ): Promise<UpdateApplicationSettingsCommandOutput> | void {
    const command = new UpdateApplicationSettingsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the Baidu channel for an application or updates the status and settings of the Baidu channel for an application.</p>
   */
  public updateBaiduChannel(
    args: UpdateBaiduChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateBaiduChannelCommandOutput>;
  public updateBaiduChannel(
    args: UpdateBaiduChannelCommandInput,
    cb: (err: any, data?: UpdateBaiduChannelCommandOutput) => void
  ): void;
  public updateBaiduChannel(
    args: UpdateBaiduChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateBaiduChannelCommandOutput) => void
  ): void;
  public updateBaiduChannel(
    args: UpdateBaiduChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateBaiduChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateBaiduChannelCommandOutput) => void
  ): Promise<UpdateBaiduChannelCommandOutput> | void {
    const command = new UpdateBaiduChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates the configuration and other settings for a campaign.</p>
   */
  public updateCampaign(
    args: UpdateCampaignCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateCampaignCommandOutput>;
  public updateCampaign(
    args: UpdateCampaignCommandInput,
    cb: (err: any, data?: UpdateCampaignCommandOutput) => void
  ): void;
  public updateCampaign(
    args: UpdateCampaignCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateCampaignCommandOutput) => void
  ): void;
  public updateCampaign(
    args: UpdateCampaignCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateCampaignCommandOutput) => void),
    cb?: (err: any, data?: UpdateCampaignCommandOutput) => void
  ): Promise<UpdateCampaignCommandOutput> | void {
    const command = new UpdateCampaignCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the email channel for an application or updates the status and settings of the email channel for an application.</p>
   */
  public updateEmailChannel(
    args: UpdateEmailChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateEmailChannelCommandOutput>;
  public updateEmailChannel(
    args: UpdateEmailChannelCommandInput,
    cb: (err: any, data?: UpdateEmailChannelCommandOutput) => void
  ): void;
  public updateEmailChannel(
    args: UpdateEmailChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateEmailChannelCommandOutput) => void
  ): void;
  public updateEmailChannel(
    args: UpdateEmailChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateEmailChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateEmailChannelCommandOutput) => void
  ): Promise<UpdateEmailChannelCommandOutput> | void {
    const command = new UpdateEmailChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an existing message template for messages that are sent through the email channel.</p>
   */
  public updateEmailTemplate(
    args: UpdateEmailTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateEmailTemplateCommandOutput>;
  public updateEmailTemplate(
    args: UpdateEmailTemplateCommandInput,
    cb: (err: any, data?: UpdateEmailTemplateCommandOutput) => void
  ): void;
  public updateEmailTemplate(
    args: UpdateEmailTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateEmailTemplateCommandOutput) => void
  ): void;
  public updateEmailTemplate(
    args: UpdateEmailTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateEmailTemplateCommandOutput) => void),
    cb?: (err: any, data?: UpdateEmailTemplateCommandOutput) => void
  ): Promise<UpdateEmailTemplateCommandOutput> | void {
    const command = new UpdateEmailTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new endpoint for an application or updates the settings and attributes of an existing endpoint for an application. You can also use this operation to define custom attributes for an endpoint. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.</p>
   */
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateEndpointCommandOutput>;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    cb: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): void;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): void;
  public updateEndpoint(
    args: UpdateEndpointCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateEndpointCommandOutput) => void),
    cb?: (err: any, data?: UpdateEndpointCommandOutput) => void
  ): Promise<UpdateEndpointCommandOutput> | void {
    const command = new UpdateEndpointCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new batch of endpoints for an application or updates the settings and attributes of a batch of existing endpoints for an application. You can also use this operation to define custom attributes for a batch of endpoints. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.</p>
   */
  public updateEndpointsBatch(
    args: UpdateEndpointsBatchCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateEndpointsBatchCommandOutput>;
  public updateEndpointsBatch(
    args: UpdateEndpointsBatchCommandInput,
    cb: (err: any, data?: UpdateEndpointsBatchCommandOutput) => void
  ): void;
  public updateEndpointsBatch(
    args: UpdateEndpointsBatchCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateEndpointsBatchCommandOutput) => void
  ): void;
  public updateEndpointsBatch(
    args: UpdateEndpointsBatchCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateEndpointsBatchCommandOutput) => void),
    cb?: (err: any, data?: UpdateEndpointsBatchCommandOutput) => void
  ): Promise<UpdateEndpointsBatchCommandOutput> | void {
    const command = new UpdateEndpointsBatchCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the GCM channel for an application or updates the status and settings of the GCM channel for an application.</p>
   */
  public updateGcmChannel(
    args: UpdateGcmChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateGcmChannelCommandOutput>;
  public updateGcmChannel(
    args: UpdateGcmChannelCommandInput,
    cb: (err: any, data?: UpdateGcmChannelCommandOutput) => void
  ): void;
  public updateGcmChannel(
    args: UpdateGcmChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateGcmChannelCommandOutput) => void
  ): void;
  public updateGcmChannel(
    args: UpdateGcmChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateGcmChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateGcmChannelCommandOutput) => void
  ): Promise<UpdateGcmChannelCommandOutput> | void {
    const command = new UpdateGcmChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates the configuration and other settings for a journey.</p>
   */
  public updateJourney(
    args: UpdateJourneyCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateJourneyCommandOutput>;
  public updateJourney(
    args: UpdateJourneyCommandInput,
    cb: (err: any, data?: UpdateJourneyCommandOutput) => void
  ): void;
  public updateJourney(
    args: UpdateJourneyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateJourneyCommandOutput) => void
  ): void;
  public updateJourney(
    args: UpdateJourneyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateJourneyCommandOutput) => void),
    cb?: (err: any, data?: UpdateJourneyCommandOutput) => void
  ): Promise<UpdateJourneyCommandOutput> | void {
    const command = new UpdateJourneyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Cancels (stops) an active journey.</p>
   */
  public updateJourneyState(
    args: UpdateJourneyStateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateJourneyStateCommandOutput>;
  public updateJourneyState(
    args: UpdateJourneyStateCommandInput,
    cb: (err: any, data?: UpdateJourneyStateCommandOutput) => void
  ): void;
  public updateJourneyState(
    args: UpdateJourneyStateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateJourneyStateCommandOutput) => void
  ): void;
  public updateJourneyState(
    args: UpdateJourneyStateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateJourneyStateCommandOutput) => void),
    cb?: (err: any, data?: UpdateJourneyStateCommandOutput) => void
  ): Promise<UpdateJourneyStateCommandOutput> | void {
    const command = new UpdateJourneyStateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an existing message template for messages that are sent through a push notification channel.</p>
   */
  public updatePushTemplate(
    args: UpdatePushTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdatePushTemplateCommandOutput>;
  public updatePushTemplate(
    args: UpdatePushTemplateCommandInput,
    cb: (err: any, data?: UpdatePushTemplateCommandOutput) => void
  ): void;
  public updatePushTemplate(
    args: UpdatePushTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdatePushTemplateCommandOutput) => void
  ): void;
  public updatePushTemplate(
    args: UpdatePushTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdatePushTemplateCommandOutput) => void),
    cb?: (err: any, data?: UpdatePushTemplateCommandOutput) => void
  ): Promise<UpdatePushTemplateCommandOutput> | void {
    const command = new UpdatePushTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an Amazon Pinpoint configuration for a recommender model.</p>
   */
  public updateRecommenderConfiguration(
    args: UpdateRecommenderConfigurationCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateRecommenderConfigurationCommandOutput>;
  public updateRecommenderConfiguration(
    args: UpdateRecommenderConfigurationCommandInput,
    cb: (err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void
  ): void;
  public updateRecommenderConfiguration(
    args: UpdateRecommenderConfigurationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void
  ): void;
  public updateRecommenderConfiguration(
    args: UpdateRecommenderConfigurationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void),
    cb?: (err: any, data?: UpdateRecommenderConfigurationCommandOutput) => void
  ): Promise<UpdateRecommenderConfigurationCommandOutput> | void {
    const command = new UpdateRecommenderConfigurationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.</p>
   */
  public updateSegment(
    args: UpdateSegmentCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateSegmentCommandOutput>;
  public updateSegment(
    args: UpdateSegmentCommandInput,
    cb: (err: any, data?: UpdateSegmentCommandOutput) => void
  ): void;
  public updateSegment(
    args: UpdateSegmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateSegmentCommandOutput) => void
  ): void;
  public updateSegment(
    args: UpdateSegmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateSegmentCommandOutput) => void),
    cb?: (err: any, data?: UpdateSegmentCommandOutput) => void
  ): Promise<UpdateSegmentCommandOutput> | void {
    const command = new UpdateSegmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the SMS channel for an application or updates the status and settings of the SMS channel for an application.</p>
   */
  public updateSmsChannel(
    args: UpdateSmsChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateSmsChannelCommandOutput>;
  public updateSmsChannel(
    args: UpdateSmsChannelCommandInput,
    cb: (err: any, data?: UpdateSmsChannelCommandOutput) => void
  ): void;
  public updateSmsChannel(
    args: UpdateSmsChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateSmsChannelCommandOutput) => void
  ): void;
  public updateSmsChannel(
    args: UpdateSmsChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateSmsChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateSmsChannelCommandOutput) => void
  ): Promise<UpdateSmsChannelCommandOutput> | void {
    const command = new UpdateSmsChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an existing message template for messages that are sent through the SMS channel.</p>
   */
  public updateSmsTemplate(
    args: UpdateSmsTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateSmsTemplateCommandOutput>;
  public updateSmsTemplate(
    args: UpdateSmsTemplateCommandInput,
    cb: (err: any, data?: UpdateSmsTemplateCommandOutput) => void
  ): void;
  public updateSmsTemplate(
    args: UpdateSmsTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateSmsTemplateCommandOutput) => void
  ): void;
  public updateSmsTemplate(
    args: UpdateSmsTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateSmsTemplateCommandOutput) => void),
    cb?: (err: any, data?: UpdateSmsTemplateCommandOutput) => void
  ): Promise<UpdateSmsTemplateCommandOutput> | void {
    const command = new UpdateSmsTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Changes the status of a specific version of a message template to <i>active</i>.</p>
   */
  public updateTemplateActiveVersion(
    args: UpdateTemplateActiveVersionCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateTemplateActiveVersionCommandOutput>;
  public updateTemplateActiveVersion(
    args: UpdateTemplateActiveVersionCommandInput,
    cb: (err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void
  ): void;
  public updateTemplateActiveVersion(
    args: UpdateTemplateActiveVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void
  ): void;
  public updateTemplateActiveVersion(
    args: UpdateTemplateActiveVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void),
    cb?: (err: any, data?: UpdateTemplateActiveVersionCommandOutput) => void
  ): Promise<UpdateTemplateActiveVersionCommandOutput> | void {
    const command = new UpdateTemplateActiveVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Enables the voice channel for an application or updates the status and settings of the voice channel for an application.</p>
   */
  public updateVoiceChannel(
    args: UpdateVoiceChannelCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateVoiceChannelCommandOutput>;
  public updateVoiceChannel(
    args: UpdateVoiceChannelCommandInput,
    cb: (err: any, data?: UpdateVoiceChannelCommandOutput) => void
  ): void;
  public updateVoiceChannel(
    args: UpdateVoiceChannelCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateVoiceChannelCommandOutput) => void
  ): void;
  public updateVoiceChannel(
    args: UpdateVoiceChannelCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateVoiceChannelCommandOutput) => void),
    cb?: (err: any, data?: UpdateVoiceChannelCommandOutput) => void
  ): Promise<UpdateVoiceChannelCommandOutput> | void {
    const command = new UpdateVoiceChannelCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * <p>Updates an existing message template for messages that are sent through the voice channel.</p>
   */
  public updateVoiceTemplate(
    args: UpdateVoiceTemplateCommandInput,
    options?: __HttpHandlerOptions
  ): Promise<UpdateVoiceTemplateCommandOutput>;
  public updateVoiceTemplate(
    args: UpdateVoiceTemplateCommandInput,
    cb: (err: any, data?: UpdateVoiceTemplateCommandOutput) => void
  ): void;
  public updateVoiceTemplate(
    args: UpdateVoiceTemplateCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateVoiceTemplateCommandOutput) => void
  ): void;
  public updateVoiceTemplate(
    args: UpdateVoiceTemplateCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateVoiceTemplateCommandOutput) => void),
    cb?: (err: any, data?: UpdateVoiceTemplateCommandOutput) => void
  ): Promise<UpdateVoiceTemplateCommandOutput> | void {
    const command = new UpdateVoiceTemplateCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb);
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object") throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
      this.send(command, optionsOrCb || {}, cb);
    } else {
      return this.send(command, optionsOrCb);
    }
  }
}
