import { HealthCheckController } from "@modules/misc/useCases/HealthCheckController";
import { BaseCommand } from "./Command";

export const commands: Array<{ new(): BaseCommand }> = [HealthCheckController]