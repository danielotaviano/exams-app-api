import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entity/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
})
export class OptionModule {}
