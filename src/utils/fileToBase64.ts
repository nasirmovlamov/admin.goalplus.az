export function convertToBase64(file: File) {
  return new Promise<string | ArrayBuffer | null | ArrayBufferView>(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  );
}
