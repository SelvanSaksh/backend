import { PartialType } from "@nestjs/mapped-types";
import { CreateAuditAreaDto } from "./create.auditArea.dto";


export class UpdateAuditAreaDto extends PartialType(CreateAuditAreaDto){}
