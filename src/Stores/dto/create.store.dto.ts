import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsDecimal, IsLatitude, IsLongitude } from 'class-validator';

export class CreateRetailerDto {

  @IsString()
  retailer?: string;

  @IsOptional()
  @IsString()
  
  outlet_code?: string;

  @IsOptional()
  @IsString()
  area?: string;


  @IsString()
  site_status?: string;

  @IsOptional()
  @IsString()
  comp_type?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  parent_retailer?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  cluster?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  country_code?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  qr_logo?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  is_timer?: number;

  @IsOptional()
  @IsNumber()
  secret_key?: number;

  @IsOptional()
  @IsBoolean()
  auto_email_report?: boolean;

  @IsOptional()
  @IsBoolean()
  auto_sms_report?: boolean;

  @IsOptional()
  @IsBoolean()
  auto_whatsapp_report?: boolean;

  @IsOptional()
  @IsString()
  email_recepients?: string;

  @IsOptional()
  @IsString()
  mobile_distirbution_list?: string;

  @IsOptional()
  @IsString()
  whatsapp_recipients?: string;

  @IsOptional()
  @IsBoolean()
  final_report_sms?: boolean;

  @IsOptional()
  @IsBoolean()
  final_report_whatsapp?: boolean;

  @IsOptional()
  @IsBoolean()
  final_report_email?: boolean;

  @IsOptional()
  @IsBoolean()
  yes_image_reqd?: boolean;

  @IsOptional()
  @IsBoolean()
  no_image_reqd?: boolean;

  @IsOptional()
  @IsBoolean()
  create_actions_auto_for_nc?: boolean;

  @IsOptional()
  @IsNumber()
  size_in_sft?: number;

  @IsOptional()
  @IsNumber()
  no_of_employees?: number;

  @IsOptional()
  @IsNumber()
  monthly_rent?: number;

  @IsOptional()
  @IsString()
  scaling_type?: string;

  @IsOptional()
  @IsString()
  controller_id?: string;

  @IsOptional()
  @IsString()
  wifi_user_name?: string;

  @IsOptional()
  @IsString()
  wifi_password?: string;

  @IsOptional()
  @IsNumber()
  display_size_sqft?: number;

  @IsOptional()
  @IsNumber()
  avg_sku?: number;

  @IsOptional()
  @IsString()
  action_approver_users?: string;

  @IsOptional()
  @IsString()
  site_manager?: string;

  @IsOptional()
  @IsDate()
  creation_date?: Date;

  @IsOptional()
  @IsDate()
  site_open_date?: Date;

  @IsOptional()
  @IsString()
  city_type?: string;

  @IsOptional()
  @IsString()
  region_location?: string;

  @IsOptional()
  @IsString()
  work_permit_qr_img?: string;
}
