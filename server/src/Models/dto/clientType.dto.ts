
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

import { Task } from '../task.model';
import mongoose from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Field } from '../field.model';



export class CreateClientTypeDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    tasks?:string[];

    @ApiProperty({ type: [CreateFieldsTCDto], required: true })
    @IsOptional()
    fields?: CreateFieldsTCDto[];;

   
}

export class UpdateClientTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ type: String, required: true })
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty({ type: Array<String>, required: true })
    @IsOptional()
    @IsString()
    tasks?:string[];
    @ApiProperty({ type: Array<FieldsTC>, required: true })
    @IsOptional()
    fields?: Field[];

    

    
}

