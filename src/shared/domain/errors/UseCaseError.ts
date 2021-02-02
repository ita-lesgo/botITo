export class UseCaseError {
  public readonly message: string;

  public readonly description: string;

  constructor(message: string, description?: string) {
    this.message = message;
    if (description) this.description = description;
  }
}
