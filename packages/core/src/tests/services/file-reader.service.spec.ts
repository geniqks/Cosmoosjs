import { describe, expect, it } from 'bun:test';
import { FileReaderService } from 'src/services/file-reader.service';

describe('FileReader', () => {
  it('Should run default export from mock', async () => {
    const mockDefault = await FileReaderService.getDefaultExportFromFile(`${import.meta.dir}/file-reader-test.ts`);
    expect(mockDefault()).toEqual('This a test')
  });
});