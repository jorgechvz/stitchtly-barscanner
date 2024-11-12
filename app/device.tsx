import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import base64 from "react-native-base64";
import DeviceModal from "@/components/device/DeviceConnectionModal";
import useBLE from "@/hooks/useBLE";
import LottieView from 'lottie-react-native';

const Device: React.FC = () => {
  const navigation = useNavigation();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    writeData,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const sendDataToESP32 = () => {
    const dataToSend = "Hola desde la app!";
    const base64Data = base64.encode(dataToSend);
    writeData(base64Data);
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  useEffect(() => {
    if (connectedDevice) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "barcode" }],
        })
      );
    }
  }, [connectedDevice, navigation]);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <View className="flex-1 bg-[#f2f2f2]">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-primary text-center mx-5">
          Connect to your device
        </Text>
        <LottieView style={{ width: 500, height: 500 }} source={require("../assets/animations/ble-animation.json")} autoPlay loop />
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
    </View>
  );
};

export default Device;
