//
//  CameraModule.m
//  Jobs10Sep
//
//  Created by asad on 13/9/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CameraModule, NSObject)

RCT_EXTERN_METHOD(openCamera:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end



