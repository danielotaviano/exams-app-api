import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/modules/option/entity/option.entity';
import { OptionRepositoryInterface } from 'src/modules/option/interface/option.repository.interface';
import { Repository } from 'typeorm';
import { AbstractRepository } from './base/abstract';

export class OptionRepository
  extends AbstractRepository<Option>
  implements OptionRepositoryInterface {
  constructor(
    @InjectRepository(Option)
    private readonly OptionRepository: Repository<Option>,
  ) {
    super(OptionRepository);
  }
}
