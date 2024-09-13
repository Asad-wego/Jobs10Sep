/*
 * Created by Asad on 11 Sep 2024
 */

package com.jobs10sep;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@ReactModule(name = CameraModule.NAME)
public class CameraModule extends ReactContextBaseJavaModule {
    public static final String NAME = "CameraModule";
    private final ReactApplicationContext reactContext;
    private static final int CAMERA_REQUEST_CODE = 1;
    private static final int PERMISSION_REQUEST_CODE = 101;
    private Promise promise;
    private Uri photoUri;

    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        // Listener for the result of camera activity
        reactContext.addActivityEventListener(activityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void openCamera(Promise promise) {
        this.promise = promise;
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("ERROR", "Activity doesn't exist");
            return;
        }
        // Check if the camera and storage permissions are granted
        if (ContextCompat.checkSelfPermission(reactContext,
                Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(reactContext,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            // Request camera and storage permissions
            ActivityCompat.requestPermissions(currentActivity,
                    new String[] { Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE },
                    PERMISSION_REQUEST_CODE);
        } else {
            launchCamera();
        }
    }

    private void launchCamera() {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        // Save the image to a temporary file
        if (cameraIntent.resolveActivity(reactContext.getPackageManager()) != null) {
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                promise.reject("ERROR", "Failed to create image file.");
                return;
            }

            if (photoFile != null) {
                photoUri = FileProvider.getUriForFile(reactContext, reactContext.getPackageName() + ".fileprovider",
                        photoFile);
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
                getCurrentActivity().startActivityForResult(cameraIntent, CAMERA_REQUEST_CODE);
            }
        }
    }

    // Create a file for the captured image
    private File createImageFile() throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(imageFileName, ".jpg", storageDir);
    }

    // Handle the result from the camera activity
    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == CAMERA_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
                if (promise != null) {
                    promise.resolve(photoUri.toString()); // Return the image URI
                }
            } else if (resultCode == Activity.RESULT_CANCELED) {
                promise.reject("CANCELLED", "User cancelled the action.");
            }
        }
    };

    // Handle permission request result
    @ReactMethod
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
            @NonNull int[] grantResults) {
        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permissions granted, launch camera
                launchCamera();
            } else {
                // Permission denied, reject the promise
                if (promise != null) {
                    promise.reject("PERMISSION_DENIED", "Camera permission was denied.");
                }
            }
        }
    }
}
