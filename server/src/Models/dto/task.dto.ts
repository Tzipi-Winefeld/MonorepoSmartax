import { IsNotEmpty, IsDateString, IsString, IsOptional, IsNumber, isNotEmpty } from 'class-validator';
import { Client } from "../client.model";
import { Tag } from '../tag.model';
import { User } from '../../Models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../priority.model';
import { Status } from '../status.model';
import { CheckList } from '../checkList.model';

export class CreateTaskDto {
    @IsNotEmpty()
    client: Client;

    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    // @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsDateString()
    deadline: Date;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsNotEmpty()
    @IsString()
    status: Status;

    @IsNotEmpty()
    assignedTo: User[];

    @IsNotEmpty()
    tags: Tag[];

    @IsNotEmpty()
    @IsString()
    priority: Priority;
    
    @IsOptional()
    checkList: CheckList[];
}

export class UpdateTaskDto {

    @ApiProperty({ description: 'The task ID' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    client?: Client;

    @IsOptional()
    @IsString()
    taskName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsDateString()
    deadline?: Date;

    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    assignedTo?: User[];

    @IsOptional()
    tags: Tag[];

    @IsOptional()
    priority?: Priority;

    @IsOptional()
    checkList?: CheckList[];

}
