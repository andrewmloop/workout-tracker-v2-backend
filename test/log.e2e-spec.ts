import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';
import { CreateRoutineDto } from '../src/routine/dto/create-routine.dto';

describe('Log (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    connection = module.get<Connection>(getConnectionToken());
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10_000);

  afterAll(async () => {
    await connection.close();
    await app.close();
  }, 10_000);

  describe('POST /log', () => {
    const logData: CreateRoutineDto = {
      name: 'Test',
      description: 'A test routine',
      exercises: [],
    };

    it('should return a 400 when name is missing', async () => {
      const data = { ...routineData };
      data.name = '';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });
  });

  describe('GET /routine', () => {
    it('should return a 200 with all routines', async () => {
      return await request(app.getHttpServer())
        .get('/routine')
        .send()
        .expect(200);
    });
  });

  describe('GET /routine/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .get('/routine/' + invalidId)
        .send()
        .expect(400);
    });
  });

  describe('PATCH /routine/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .patch('/routine/' + invalidId)
        .send()
        .expect(400);
    });
  });

  describe('DELETE /routine/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .delete('/routine/' + invalidId)
        .send()
        .expect(400);
    });
  });
});
