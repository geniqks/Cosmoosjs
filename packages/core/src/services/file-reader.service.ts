
export class FileReaderService {
  /**
   * Will return the default export from the specified path
   */
  public static async getDefaultExportFromFile(filePath: string) {
     try {
      const module = await import(filePath);
      return module.default;
    } catch (error: any) {
      throw new Error(`Error importing file from ${filePath}: ${error?.message}`);
    }
  }
} 