import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty({
        type: 'string',
        example: 'My Note Title',
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'This is the content of my note.',
    })
    content: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: '660401dd76b9d494dccfcdd5',
    })
    ownerId: string;
}
