// TODO: Study about Repository pattern

import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository'); // This context make it easy to understand where our logs are coming from.

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSault();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.create({ username, password: hashedPassword });
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
    }
  }
}
