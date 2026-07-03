export interface ImageCompressionOptions {
  maxDimension?: number;
  quality?: number;
}

/**
 * Compresses an image file client-side using the native Canvas API.
 * Scales the image down so neither dimension exceeds `maxDimension`
 * (without upscaling smaller images) and re-encodes it as JPEG.
 * Non-image files are returned unchanged.
 */
export function compressImage(file: File, options?: ImageCompressionOptions): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return Promise.resolve(file);
  }

  const maxDimension = options?.maxDimension ?? 1600;
  const quality = options?.quality ?? 0.75;

  return new Promise<File>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
      const targetWidth = Math.round(image.width * scale);
      const targetHeight = Math.round(image.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('No se pudo obtener el contexto 2D del canvas para comprimir la imagen.'));
        return;
      }

      context.drawImage(image, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('No se pudo comprimir la imagen.'));
            return;
          }

          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const compressedFile = new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
          resolve(compressedFile);
        },
        'image/jpeg',
        quality
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('No se pudo cargar la imagen para comprimirla.'));
    };

    image.src = objectUrl;
  });
}
