import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class createYearDto{
    @ApiProperty({ 

    })
    @IsNotEmpty()
    @IsNumber()
    yearNUm: string;
}