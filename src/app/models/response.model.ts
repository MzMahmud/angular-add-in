export type AsyncResponse<T> =
  | { status: 'ERROR'; message: string }
  | { status: 'SUCCESS'; value: T };
