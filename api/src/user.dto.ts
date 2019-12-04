import {IsDateString, IsEmail, IsNotEmpty, Length} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    mail: string;

    @Length(8)
    password: string;

    @IsDateString()
    dateOfBirth: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    gender: Gender;
}

type Gender = 'Female' | 'Male';
