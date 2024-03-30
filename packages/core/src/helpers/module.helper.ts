export async function loadModule(importedModule: () => Promise<any>) {
  try {
    const module = await importedModule();
    return module.default;
  } catch (error: any) {
    throw new Error(`Error loading module ${importedModule}: ${error?.message}`);
  }
}
