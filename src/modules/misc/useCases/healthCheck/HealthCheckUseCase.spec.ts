import { HealthCheckUseCase } from './HealthCheckUseCase';

let healthCheckUseCase: HealthCheckUseCase;

describe('Health check', () => {
  beforeEach(() => {
    healthCheckUseCase = new HealthCheckUseCase();
  });

  test('It should be able to return health check', () => {
    const { isSlow } = healthCheckUseCase.execute(200);

    expect(isSlow).toBe(false);
  });

  test('It should be able to see if ping is slow', () => {
    const { isSlow } = healthCheckUseCase.execute(1000);

    expect(isSlow).toBe(true);
  });
});
