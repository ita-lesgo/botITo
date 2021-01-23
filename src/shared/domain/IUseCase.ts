export interface IUseCase<IRequest, IResponse> {
  execute(args?: IRequest): Promise<IResponse> | IResponse;
}
