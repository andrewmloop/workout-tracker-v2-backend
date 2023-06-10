import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../src/app.module';
import { SigninDTO } from '../src/auth/dto/signin.dto';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    connection = await moduleRef.get(getConnectionToken());
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10_000);

  afterAll(async () => {
    await connection.close();
    await app.close();
  }, 10_000);

  describe('POST /auth/signin', () => {
    const signInData: SigninDTO = {
      email: 'e2e@email.com',
      password: 'Password1$',
    };

    it('should return a 400 when missing an email', async () => {
      const data = { ...signInData };
      data.email = '';
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a password', async () => {
      const data = { ...signInData };
      data.password = '';
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(400);
    });

    it('should return a 401 when password is incorrect', async () => {
      const data = { ...signInData };
      data.email = 'Incorrect';
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(401);
    });

    it('should return a 200 when credentials are correct', async () => {
      const data = { ...signInData };
      return await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(200);
    });

    it('should return a 200 when logged in user hits private endpoint', async () => {
      const data = { ...signInData };
      const signinResponse = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(data)
        .expect(200);

      const token = signinResponse.body['accessToken'];

      return await request(app.getHttpServer())
        .get('/user')
        .set('Authorization', 'Bearer ' + token)
        .expect(200);
    });
  });
});
