import { injectable } from 'tsyringe';
import os from 'os';

import { IUseCase } from "@shared/domain/IUseCase";

interface IHealthCheckUseCaseResponse {
  cores: number;
  cpu: string;
  ping: string;
  ram: number;
  isSlow: boolean;
}

@injectable()
export class HealthCheckUseCase 
  implements IUseCase<number, IHealthCheckUseCaseResponse> {

  private cores: number;
  private cpu: string;
  private ram: number;


  constructor() {
    const cpus = os.cpus();

    this.cores = cpus.length;
    this.cpu = cpus[0].model;
    this.ram = Number((os.totalmem()/ Math.pow(1024, 3)).toFixed(2));
  }

  public execute(ping: number): IHealthCheckUseCaseResponse {

    return {
      cores: this.cores,
      cpu: this.cpu,
      ping: `${ping} milisegundos`,
      isSlow: ping > 500,
      ram: this.ram,
    }
  }
}