import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserTrackingEnum } from "../enum/user.tracking.enum";

export class CreateUserTrackingDto {

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsOptional()
    @IsString()
    outlet_name?: string;

    @IsOptional()
    @IsString()
    outlet_type?: string;

    @IsOptional()
    @IsOptional()
    @IsString()
    outlet_code?: string;

    @IsOptional()
    @IsString()
    outlet_license_no?: string;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
    
    @IsOptional()
    @IsString()
    map_address: string;

    @IsOptional()
    @IsString()
    user_modified_address?:string

    @IsString()
    @IsOptional()
    city?:string

    @IsOptional()
@IsString()
    selfi:string

    @IsString()
    @IsOptional()
    state?:string
    

    @IsString()
    @IsOptional()
    pincode?:string

  
    @IsOptional()
    @IsString()
    location_image?: string;
  
    @IsOptional()
    @IsString()
    contact_person_name?: string;
  
    @IsOptional()
    @IsString()
    contact_person_number?: string;
  
    @IsOptional()
    @IsDateString()
    date_time?: string; // ISO string format
  
    @IsOptional()
    @IsInt()
    lead_status?: number;
  
    @IsOptional()
    @IsDateString()
    followup_date?: string;
  

    // // @IsNotEmpty()
    // @IsOptional()
    // @IsEnum(UserTrackingEnum)
    // user_tracking_type: UserTrackingEnum;

    @IsOptional()
    @IsString()
    notes?: string;
  
    @IsOptional()
    @IsInt()
    visit_type?: number;
  
    @IsOptional()
    @IsString()
    // @IsNumber({ maxDecimalPlaces: 2 })
    kms_covered?: String;
  
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    dist_from_comp?: number;
  
    @IsOptional()
    @IsString()
    device_id?: string;


}