import { invoke as tauriInvoke } from "@tauri-apps/api/core";

type InvokeArgs = Record<string, unknown>;

export const invokeSilent = async <T>(
  cmd: string,
  args?: InvokeArgs
): Promise<T | null> => {
  try {
    return await tauriInvoke<T>(cmd, args);
  } catch {
    return null;
  }
};
