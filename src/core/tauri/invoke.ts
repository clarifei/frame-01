import { invoke as tauriInvoke } from "@tauri-apps/api/core";

type InvokeArgs = Record<string, unknown>;

export type InvokeResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function formatError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  }
  return JSON.stringify(err);
}

export async function invoke<T>(
  cmd: string,
  args?: InvokeArgs
): Promise<InvokeResult<T>> {
  try {
    const data = await tauriInvoke<T>(cmd, args);
    return { success: true, data };
  } catch (err) {
    const error = formatError(err);
    if (import.meta.env.DEV) {
      console.error(`[Tauri] ${cmd}:`, error);
    }
    return { success: false, error };
  }
}

export async function invokeOrThrow<T>(
  cmd: string,
  args?: InvokeArgs
): Promise<T> {
  try {
    return await tauriInvoke<T>(cmd, args);
  } catch (err) {
    throw new Error(formatError(err));
  }
}

export async function invokeSilent<T>(
  cmd: string,
  args?: InvokeArgs
): Promise<T | null> {
  try {
    return await tauriInvoke<T>(cmd, args);
  } catch {
    return null;
  }
}
