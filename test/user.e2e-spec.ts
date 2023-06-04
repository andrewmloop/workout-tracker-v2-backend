import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { AuthGuard } from '../src/auth/auth.guard';

describe('User (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    connection = await moduleRef.get(getConnectionToken());
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10_000);

  afterAll(async () => {
    await connection.close();
    await app.close();
  }, 10_000);

  describe('POST /user', () => {
    const userData: CreateUserDto = {
      firstName: 'Test',
      email: 'test@e2e.com',
      password: 'Password1!',
    };

    it('should return a 400 when missing a firstName', async () => {
      const data = { ...userData };
      data.firstName = '';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it("should return a 400 when firstName isn't alphnumeric", async () => {
      const data = { ...userData };
      data.firstName = '1#$';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing an email', async () => {
      const data = { ...userData };
      data.email = '';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when email is invalid', async () => {
      const data = { ...userData };
      data.email = 'invalidEm@i.l';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a password', async () => {
      const data = { ...userData };
      data.password = '';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is too short', async () => {
      const data = { ...userData };
      data.password = 'Short1!';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is missing a number', async () => {
      const data = { ...userData };
      data.password = 'Password!!';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is missing a sumbol', async () => {
      const data = { ...userData };
      data.password = 'Password!!';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });
  });

  describe('GET /user', () => {
    it('should return a 200', async () => {
      return await request(app.getHttpServer()).get('/user').send().expect(200);
    });
  });

  describe('GET /user/:id', () => {
    const invalidObjectId = 'InvalidID1234';

    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .get('/user/' + invalidObjectId)
        .send()
        .expect(400);
    });
  });

  describe('PATCH /user/:id', () => {
    const invalidObjectId = 'InvalidID1234';
    const validObjectId = Types.ObjectId.createFromTime(1);
    const userData: UpdateUserDto = {
      firstName: 'Test',
      email: 'test@e2e.com',
      password: 'Password1!',
    };

    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .patch('/user/' + invalidObjectId)
        .send(userData)
        .expect(400);
    });

    it('should return a 400 when missing a firstName', async () => {
      const data = { ...userData };
      data.firstName = '';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it("should return a 400 when firstName isn't alphnumeric", async () => {
      const data = { ...userData };
      data.firstName = '1#$';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing an email', async () => {
      const data = { ...userData };
      data.email = '';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when email is invalid', async () => {
      const data = { ...userData };
      data.email = 'invalidEm@i.l';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a password', async () => {
      const data = { ...userData };
      data.password = '';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is too short', async () => {
      const data = { ...userData };
      data.password = 'Short1!';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is missing a number', async () => {
      const data = { ...userData };
      data.password = 'Password!!';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });

    it('should return a 400 when password is missing a sumbol', async () => {
      const data = { ...userData };
      data.password = 'Password!!';
      return await request(app.getHttpServer())
        .patch('/user/' + validObjectId)
        .send(data)
        .expect(400);
    });
  });

  describe('DELETE /user/:id', () => {
    const invalidObjectId = 'InvalidID1234';

    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .delete('/user/' + invalidObjectId)
        .send()
        .expect(400);
    });
  });
});
