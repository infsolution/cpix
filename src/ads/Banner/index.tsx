import React, { useRef } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";
import { styles } from "./styles";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9803509684526637/8278035139";
type BannerStyleProp = {
  custom: object;
};
export function Banner({ custom }: BannerStyleProp) {
  const bannerRef = useRef<BannerAd>(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return (
    <View style={[styles.bottomBanner, custom]}>
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.BANNER} />
    </View>
  );
}
