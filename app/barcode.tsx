import React, { useState, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import useBLE from "@/hooks/useBLE";
import base64 from "react-native-base64";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/~/components/ui/alert-dialog";
import CameraPermission from "@/components/permissions/CameraPermission";
import { buttonVariants } from "@/~/components/ui/button";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { Check } from "lucide-react-native";

export default function QRScannerScreen() {
  const insets = useSafeAreaInsets();
  const [actionType, setActionType] = useState<string>("decrease");
  const { writeData, disconnectFromDevice } = useBLE();
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const hideDialog = () => setDialogVisible(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scanLinePosition = useRef(new Animated.Value(0)).current;
  const [scannedData, setScannedData] = useState<string>("");
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

  if (!permission) return <View />;
  if (!permission.granted) {
    return <CameraPermission permissionFn={requestPermission} />;
  }

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setDialogVisible(true);
    setScanned(true);
    setScannedData(data);
  };

  const disconnectDevice = () => {
    disconnectFromDevice();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      })
    );
  };

  const onCancel = () => {
    setScanned(false);
    setDialogVisible(false);
  };
  const sendDataToESP32 = () => {
    const encodedAction = actionType === "increase" ? "INC" : "DEC";
    const base64Data = base64.encode(`${encodedAction}:${scannedData}`);
    setScanned(false);
    writeData(base64Data);
    hideDialog();
  };

  const scanLineTranslateY = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 275],
  });

  return (
    <View className="flex-1 bg-white">
      <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
        <AlertDialogContent className="h-[150px] flex flex-col justify-between border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-primary font-bold">
              Are you sure you want to send this data?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Bar Code: {scannedData}
          </AlertDialogDescription>
          <AlertDialogFooter className="flex flex-row gap-2 justify-end">
            <AlertDialogCancel
              onPress={onCancel}
              className={`${buttonVariants({
                variant: "secondary",
              })} px-6 rounded-xl`}
            >
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={sendDataToESP32}
              className={`${buttonVariants({
                variant: "default",
              })} px-6 rounded-xl`}
            >
              <Text className="text-white">Send</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <View className="flex-1 px-6">
        <Text className="font-semibold text-4xl mt-24 text-center">
          Bar Code Scanner
        </Text>
        <Text className="text-gray-900 text-center mt-4">
          Hold your device over a barcode to scan it
        </Text>
        <View className="flex-1 items-center justify-center mb-20">
          <View className="w-full aspect-square bg-gray-50 rounded-3xl p-6 ">
            <View className="flex-1 relative m-6">
              <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13"] }}
              />
              <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center ">
                <View className="w-[280px] h-[280px] rounded-lg">
                  <View className="absolute -top-3 -left-3 w-12 h-12 border-t-[6px] border-l-[6px] border-primary" />
                  <View className="absolute -top-3 -right-3 w-12 h-12 border-t-[6px] border-r-[6px] border-primary" />
                  <View className="absolute -bottom-3 -left-3 w-12 h-12 border-b-[6px] border-l-[6px] border-primary" />
                  <View className="absolute -bottom-3 -right-3 w-12 h-12 border-b-[6px] border-r-[6px] border-primary" />
                  <Animated.View
                    className="absolute w-full h-0.5 bg-primary"
                    style={{ transform: [{ translateY: scanLineTranslateY }] }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row justify-around mt-6 gap-x-6">
            <TouchableOpacity
              className={`flex-row items-center justify-center p-3 rounded-lg border w-[150px] ${
                actionType === "increase"
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => setActionType("increase")}
            >
              {actionType === "increase" && (
                <View className="mr-2">
                  <Check size={20} color="#FFF" />
                </View>
              )}
              <Text
                className={`font-semibold ${
                  actionType === "increase" ? "text-white" : "text-gray-600"
                }`}
              >
                Increase
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-row items-center justify-center p-3 rounded-lg border w-[150px] ${
                actionType === "decrease"
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => setActionType("decrease")}
            >
              {actionType === "decrease" && (
                <View className="mr-2">
                  <Check size={20} color="#FFF" />
                </View>
              )}
              <Text
                className={`font-semibold ${
                  actionType === "decrease" ? "text-white" : "text-gray-600"
                }`}
              >
                Decrease
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="w-2/3 self-center bg-primary py-4 rounded-full mb-8"
          onPress={disconnectDevice}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Disconnect Scanner
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
