import {CameraModule} from '../native/NativeModule';

export const useCamera = () => {
  const takePhoto = async () => {
    try {
      const uri = await CameraModule.openCamera();
      return uri;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  };

  return {takePhoto};
};
