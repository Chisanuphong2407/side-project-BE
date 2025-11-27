import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from './schema/unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Unit.name,
        schema: UnitSchema,
      },
    ]),
  ],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
