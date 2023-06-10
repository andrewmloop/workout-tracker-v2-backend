import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../src/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { AuthGuard } from '../src/auth/auth.guard';

describe('User (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const invalidObjectId = 'InvalidID1234';
  const userData = {
    firstName: 'Test' as any,
    email: 'test@e2e.com' as any,
    password: 'Password1!' as any,
  };

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
    it('should return a 400 when missing a firstName', async () => {
      const data = { ...userData };
      data.firstName = null;
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when firstName has length of 0', async () => {
      const data = { ...userData };
      data.firstName = '';
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it("should return a 400 when firstName isn't a string", async () => {
      const data = { ...userData };
      data.firstName = 123;
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when firstName is too long', async () => {
      const data = { ...userData };
      data.firstName = 'abcdefghijklmnopqrstu'; // Length of 21
      return await request(app.getHttpServer())
        .post('/user')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing an email', async () => {
      const data = { ...userData };
      data.email = null;
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
      data.password = null;
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

    it('should return a 400 when password is missing a symbol', async () => {
      const data = { ...userData };
      data.password = 'Password12';
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
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .get('/user/' + invalidObjectId)
        .send()
        .expect(400);
    });
  });

  describe('PATCH /user/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .patch('/user/' + invalidObjectId)
        .send(userData)
        .expect(400);
    });
  });

  describe('DELETE /user/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .delete('/user/' + invalidObjectId)
        .send()
        .expect(400);
    });
  });
});
