import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import DeviceModal from "@/components/device/DeviceConnectionModal";
import useBLE from "@/hooks/useBLE";
import LottieView from "lottie-react-native";
import { Button } from "@/~/components/ui/button";

const Device: React.FC = () => {
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
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-semibold text-primary text-center mx-6 mb-20">
          Connect to your device
        </Text>
        <LottieView
          style={{ width: 500, height: 500 }}
          source={require("../assets/animations/ble-animation.json")}
          autoPlay
          loop
        />
      </View>
      <Button
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        className="justify-center items-center h-12 mx-5 mb-20 rounded-lg"
      >
        <Text className="text-lg font-bold text-white">
          {connectedDevice ? "Disconnect" : "Search Devices"}
        </Text>
      </Button>
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
