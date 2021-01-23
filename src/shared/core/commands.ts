import { HealthCheckController } from "@modules/misc/useCases/HealthCheckController";
import { LevelCheckController } from "@modules/misc/useCases/LevelCheckController"
import { BaseCommand } from "./Command";

export const commands: Array<{ new(): BaseCommand }> = [HealthCheckController, LevelCheckController]