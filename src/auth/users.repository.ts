// TODO: Study about Repository pattern

import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository'); // This context make it easy to understand where our logs are coming from.

  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user: User = this.create({ username, password });
    // await this.save(user);
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 23505) {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      this.logger.error(error);
    }
  }
}
