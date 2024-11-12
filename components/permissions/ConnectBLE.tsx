import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeviceModal from "@/components/device/DeviceConnectionModal";
import useBLE from "@/hooks/useBLE";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/~/components/ui/alert-dialog";
import { Button } from "@/~/components/ui/button";
import { Text as TextClass } from "@/~/components/ui/text";

interface ConnectBLEProps {
  isConnected: () => void;
}

const ConnectBLE = ({isConnected} : ConnectBLEProps) => {
  const navigation = useNavigation();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAlertDialogVisible, setIsAlertDialogVisible] =
    useState<boolean>(false);
  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  useEffect(() => {
    if (connectedDevice) {
      navigation.navigate("barcode" as never);
    }
  }, [connectedDevice, navigation]);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  if (!connectedDevice) {
    setIsAlertDialogVisible(true);
  }
  

  return (
    <>
      <AlertDialog open={isAlertDialogVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <TextClass>Cancel</TextClass>
            </AlertDialogCancel>
            <AlertDialogAction>
              <TextClass>Continue</TextClass>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SafeAreaView className="flex-1 bg-[#f2f2f2]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-black text-center mx-5">
            Please Connect to a ESP32 Device
          </Text>
        </View>
        <TouchableOpacity
          onPress={connectedDevice ? disconnectFromDevice : openModal}
          className="bg-primary justify-center items-center h-12 mx-5 mb-1 rounded-lg"
        >
          <Text className="text-lg font-bold text-white">
            {connectedDevice ? "Disconnect" : "Connect"}
          </Text>
        </TouchableOpacity>
        <DeviceModal
          closeModal={hideModal}
          visible={isModalVisible}
          connectToPeripheral={connectToDevice}
          devices={allDevices}
        />
      </SafeAreaView>
    </>
  );
};

export default ConnectBLE;
