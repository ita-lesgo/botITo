import { HealthCheckController } from "@modules/misc/useCases/healthCheck/HealthCheckController";
import { BaseCommand } from "./Command";

export const commands: Array<{ new(): BaseCommand }> = [HealthCheckController]