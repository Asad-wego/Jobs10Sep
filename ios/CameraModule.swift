//
//  CameraModule.swift
//  Jobs10Sep
//
//  Created by asad on 13/9/24.
//

import Foundation
import UIKit
import Photos

@objc(CameraModule)
class CameraModule: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    var promise: RCTPromiseResolveBlock? = nil
    var rejecter: RCTPromiseRejectBlock? = nil
    
    @objc
    func openCamera(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        self.promise = resolve
        self.rejecter = reject
        
        DispatchQueue.main.async {
            guard let rootViewController = UIApplication.shared.delegate?.window??.rootViewController else {
                reject("NO_VIEW_CONTROLLER", "No root view controller available", nil)
                return
            }
            
            // Check camera availability
            if UIImagePickerController.isSourceTypeAvailable(.camera) {
                let picker = UIImagePickerController()
                picker.delegate = self
                picker.sourceType = .camera
                picker.allowsEditing = false
                rootViewController.present(picker, animated: true, completion: nil)
            } else {
                reject("NO_CAMERA", "Camera is not available", nil)
            }
        }
    }
    
    // Called when the user captures an image
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        picker.dismiss(animated: true, completion: nil)
        
        if let image = info[.originalImage] as? UIImage {
            // Save the image and return the file path
            saveImageToDocuments(image: image)
        } else {
            rejecter?("ERROR", "Could not capture image", nil)
        }
    }
    
    // Called when the user cancels the camera
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
        rejecter?("CANCELLED", "User cancelled the action", nil)
    }
    
    // Function to save image to the device and return the URI
    func saveImageToDocuments(image: UIImage) {
        let fileManager = FileManager.default
        let documentsURL = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first!
        let filename = "photo_\(Date().timeIntervalSince1970).jpg"
        let fileURL = documentsURL.appendingPathComponent(filename)
        
        if let imageData = image.jpegData(compressionQuality: 1.0) {
            do {
                try imageData.write(to: fileURL)
                promise?(fileURL.absoluteString) // Resolve promise with image file path
            } catch {
                rejecter?("SAVE_ERROR", "Failed to save image", error)
            }
        } else {
            rejecter?("CONVERT_ERROR", "Failed to convert image to data", nil)
        }
    }
}

