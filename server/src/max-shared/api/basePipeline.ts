type PipelineContract = any;
type CallbackPipes = ((PipelineContract: PipelineContract) => Promise<PipelineContract>)[];
export type Stage<T, U> = {input: T, output: U, block?: boolean};
// type PipelineContract<T> = T;
// type CallbackPipes<T> = ((PipelineContract: PipelineContract<T>) => Promise<PipelineContract<T>>)[];
// const testPipes: CallbackPipes = [async ({inputChannel, outputChannel}: PipelineContract) => ({inputChannel, outputChannel}), ]
export const runPipeline = async <T extends Object, U>(PipelineContract: T, CallbackPipes: CallbackPipes) => {
  let result = PipelineContract;
  for (let i = 0; i < CallbackPipes.length; i++){
    result = await CallbackPipes[i](result);
    if (result.hasOwnProperty("block")){
      if ((result as unknown as {block: boolean}).block) return result as unknown as U;
    }
  }
  return result as unknown as U;
};
