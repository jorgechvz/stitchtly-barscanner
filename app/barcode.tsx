import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import useBLE from "@/hooks/useBLE";
import base64 from "react-native-base64";

export default function QRScannerScreen() {
  const { writeData } = useBLE();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scanLinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePosition, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLinePosition]);

  const sendDataToESP32 = (dataToSend: string) => {
    const base64Data = base64.encode(dataToSend);
    writeData(base64Data);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1c1c1c]">
        <Text className="text-white text-center mb-5 text-lg">
          Permission to use the camera is required
        </Text>
        <TouchableOpacity
          className="bg-[#333] py-3 px-6 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("Scanned Code", `Type: ${type}, Data: ${data}`);
    sendDataToESP32(data);
  };

  const scanLineTranslateY = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 300],
  });

  return (
    <View className="flex-1 bg-[#1c1c1c] items-center px-4">
      <Text className="text-white text-2xl mt-5 text-center">
        Scan QR Code of the device
      </Text>
      <View className="flex-1 w-full rounded-lg overflow-hidden mt-56 mb-56 items-center">
        <CameraView
          className="flex-1 w-11/12 rounded-lg"
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13"] }}
        />
        <Animated.View
          className="absolute w-[85%] h-0.5 bg-cyan-400"
          style={{ transform: [{ translateY: scanLineTranslateY }] }}
        />
      </View>
      <View className="flex-row justify-between w-[90%] mb-10">
        <TouchableOpacity
          className="bg-[#444] py-3 px-8 rounded-lg"
          onPress={() => setScanned(false)}
        >
          <Text className="text-white text-lg">Scan Again</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-gray-400 text-sm text-center mb-5">
        The QR Code will be automatically detected when you position it between
        the guide lines
      </Text>
    </View>
  );
}
